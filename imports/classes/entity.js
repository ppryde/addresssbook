import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { default as ContactSchema } from '../schemas/contacts.js';
import Contacts from '/imports/collections/contacts';
import { default as OrgSchema } from '../schemas/organisation.js';
//import Contacts from '/imports/collections/contacts';
import AddressSchema from '/imports/schemas/address.js'
import PhoneSchema from '/imports/schemas/phone.js'
import EmailSchema from '/imports/schemas/email.js'

export class Entity {
  constructor (doc) {
    if (!doc){
        return;
    }
    _.extend(this, doc);
  }

  updateLocalField(field, value, forceDb){
    let modification = {};
    //Create a nested field for mongodb update
    _.setNested(modification, field, value, {ensure:true});
    //Clean the contact doc, strip out invalid fields etc
    this.schema.clean(modification, {removeEmptyStrings:false});
    //Check once cleaned we still have something
    if (Object.keys(modification).length<1)
        return;
    //Check contacts changes against our schema to validate inputs
    this.checkWithAlert(modification, this.schema);
    _.merge(this, modification);
    if (forceDb)
      this.updateDb();
  }

  updateDb(){
    //We lose schema after cleanse otherwise
    _schema = this.schema;
    this.phones = _.filter(this.phones, function(item) {
        return item.number;
    });
    this.emails = _.filter(this.emails, function(item) {
        return item.email;
    });
    this.displayName = (this.entity_type=="org")?this.name:this.fname+" "+this.lname;
    let stormTrooper = _.clone(this);
    _schema.clean(stormTrooper, {removeEmptyStrings:false, getAutoValues:true});
    this.__proto__.checkWithAlert(stormTrooper, _schema);
    this.collection.update(this._id, stormTrooper);
  }


  checkWithAlert(value, type){
    //check only throws error, we want to alert user then error
    try {
      check(value, type);
    } catch (e) {
      sweetAlert("Oops", e.message.replace("Match error: Match error: ", ""), "error");
      throw e;
    }
    return;
  }

  confirmDeletion(type, callback){
    sweetAlert({
      title: "Delete this "+type+"?",
      text: "You will not be able to recover this "+type+"!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: true
    }, callback);
  }

  addPhone() {
    if (!this.phones)
      this.phones=[];
    this.collection.update({_id:this._id}, { $addToSet: { phones: { id: Random.id(), number:"", type:""} } });
  }

  deletePhone(id) {
    let _this = this;
    var cb = function(isConfirm){
      if (isConfirm)
        _this.collection.update( {'_id': _this._id}, { $pull: { "phones" : { id: id } } }, false, true );
    }
    this.__proto__.confirmDeletion("number", cb);
  }

  setPhone(entry){
    this.__proto__.checkWithAlert(entry, PhoneSchema);
    _.extend(_.findWhere(this.phones, { id:entry.id }), entry);
  }

  addEmail() {
    if (!this.emails)
      this.emails=[];
    this.collection.update({_id:this._id}, { $addToSet: { emails: { id: Random.id(), email:"", type:""} } });
  }

  setEmail(entry){
    this.__proto__.checkWithAlert(entry, EmailSchema);
    _.extend(_.findWhere(this.emails, { id:entry.id }), entry);
  }

  deleteEmail(id) {
    let _this = this;
    var cb = function(isConfirm){
      if (isConfirm)
        _this.collection.update( {'_id': _this._id}, { $pull: { "emails" : { id: id } } }, false, true );
    }
    this.__proto__.confirmDeletion("email", cb);
  }

  printName(){ return this.name||this.name==""?this.name:this.fname+" "+this.lname; }

  deleteEntity() {
    let _this = this;
    var cb = function(isConfirm){
      if (isConfirm){
        _this.collection.remove({ _id:_this._id });
      }
    }
    this.__proto__.confirmDeletion(this.entity_type, cb);
  }
};
