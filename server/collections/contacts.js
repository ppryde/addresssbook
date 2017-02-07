import Contacts from '/imports/collections/contacts'

Meteor.publish('contacts', function() {
    return Contacts.find()
});
