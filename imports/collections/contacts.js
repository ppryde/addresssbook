import { Contact } from '/imports/classes/contact.js';


const Contacts = new Mongo.Collection('contacts', {
  transform: function (doc) { return new Contact(doc); }
});

export default Contacts;
