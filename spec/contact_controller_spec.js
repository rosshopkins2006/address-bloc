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
      this.book.addContact("Alice","001-101-1010")
      .then((contact) => {
        expect(contact.name).toB("Alice");
        expect(contact.phone).toBe("001-101-1010");
        done();
      })
      .catch((err) => {
        done();
      });
    });
  });
});
