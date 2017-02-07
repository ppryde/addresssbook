import { Entity } from '/imports/classes/entity';
import { default as OrgSchema } from '/imports/schemas/organisation.js';
import Orgs from '/imports/collections/organisation';

export class Org extends Entity{
  constructor (doc) {
    super(doc);
    this.schema = OrgSchema;
    this.collection = Orgs;
    this.entity_type = "org";
    if (!doc){
      this.__proto__.create();
      return;
    }

  }

  create(){
    let newid = Orgs.insert({name:"", address:{line1: "", line2: "", line3: "", line4: ""}, phones: [], emails: []});
    _.extend(this, Orgs.findOne({_id:newid}));
  }

  checkNames() {
      if (!this.name){
        sweetAlert("Oops", "Organisations must have a name to save changes", "error");
        throw new Meteor.Error(1101, "Organisations must have a name to save changes");;
      }
  }
}
