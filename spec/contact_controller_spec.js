const ContactController = require("../controllers/ContactControllers");
const sequelize = require("../db/models/index").sequelize;

describe("ContactController", () => {


      it("should be defined", () => {
        expect(ContactController).toBeDefined();
      });

  beforeEach((done) => {
    this.book = new ContactController();

    sequelize.sync({force: true}).then((res) => {
      done();
    })
    .catch((err) => {
      done();
    });
  });

  describe("addContact()", () => {
    it("should add a single contact into the book", () => {
      this.book.addContact("Alice","001-101-1010","alice@example.com")
      .then((contact) => {
        expect(contact.name).toB("Alice");
        expect(contact.phone).toBe("001-101-1010");
        expect(contact.email).toBe("alice@rabbithole.com");
        done();
      })
      .catch((err) => {
        done();
      });
    });
  });

  describe("#getContacts()", () => {
    if("should return an empty array when no contacts are available", (done) => {
      this.book.getContacts()
      .then((contacts) => {
        expect(contacts.length).toBe(0);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should return an array of contacts when contacts are available", (done) => {
      this.book.addContact("alice", "001-101-1010", "alice@example.com")
      .then(() => {
        this.book.getContacts()
        .then((contacts) => {
          expect(contacts.length).toBe(1);
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
});
