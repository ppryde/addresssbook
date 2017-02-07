import Orgs from '/imports/collections/organisation';

Meteor.publish('organisations', function() {
    return Orgs.find()
});
