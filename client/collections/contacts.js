import Contacts from '/imports/collections/contacts'

ContactCollections = Contacts;

Meteor.subscribe('contacts', function() {
});
