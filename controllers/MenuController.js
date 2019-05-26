const inquirer = require('inquirer');
const ContactController = require("./ContactControllers")

module.exports = class MenuController {
  constructor(){
    this.mainMenuQuestions =[
      {
        type: "list",
        name: "mainMenuQuestions",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
          "Get date",
          "Exit"
        ]
      }
    ];
    this.book = new ContactController();
  }

  main(){
    console.log("Welcome to AddressBloc!");
    inquirer.prompt(this.mainMenuQuestions).then((response) => {
      switch(response.mainMenuQuestions){
        case "Add new contact":
          this.addContact();
          break;
        case "Exit":
          this.exit();
          break;
        case "Get date":
          this.getDate();
        default:
          console.log("Invalid input");
          this.main();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  clear(){
    console.log('\x1Bc');
  }

  addContact(){
    this.clear();
    inquirer.prompt(this.book.addContactQuestions).then((answers) => {
      this.book.addContact(answers.name, answers.phone).then((contact) => {
        console.log("Contact added successfully!");
        this.main();
      }).catch((err) => {
        console.log(err);
        this.main();
      });
    });
  }

  getDate(){
    this.clear();
    var date = new Date();
    var hours = date.getHours();
    var days = date.getDay();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = date + ' ' + hours + ':' + minutes + ' ' + ampm;
    console.log(strTime);
  }

  exit(){
    console.log("Thanks for using AddressBloc!");
    process.exit();
  }

  getContactCount(){
    return this.books.length;
  }

  remindMe(){
    var remind = "Learning is a life-long pursuit";
    return remind;
  }
}
