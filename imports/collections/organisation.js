import { Org } from '/imports/classes/org.js';


const Orgs = new Mongo.Collection('organisations', {
  transform: function (doc) { return new Org(doc); }
});

export default Orgs;
