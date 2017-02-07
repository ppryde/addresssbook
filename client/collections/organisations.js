import Orgs from '/imports/collections/organisation'

OrgCollections = Orgs;

Meteor.subscribe('organisations', function() {
});
