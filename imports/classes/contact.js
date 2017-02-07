import { Entity } from '/imports/classes/entity';
import { default as ContactSchema } from '/imports/schemas/contacts.js';
import Contacts from '/imports/collections/contacts.js';

export class Contact extends Entity {
  constructor (doc) {
    super(doc);
    this.schema = ContactSchema;
    this.collection = Contacts;
    this.entity_type = "person";
    if (!doc){
      this.createContact();
      return;
    }

  }

  createContact(){
    let newid = Contacts.insert({fname:"", lname:"", address:{line1: "", line2: "", line3: "", line4: ""}, phones: [], emails: []});
    _.extend(this, Contacts.findOne({_id:newid}));
  }

  checkNames() {
      if (!this.fname && !this.lname){
        sweetAlert("Oops", "Contacts must have either a first or last name", "error");
        throw new Meteor.Error(1101, "Contacts must have either a first or last name");;
      }
  }
}
