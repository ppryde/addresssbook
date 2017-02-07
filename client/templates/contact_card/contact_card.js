import Contacts from '/imports/collections/contacts';
import { Contact } from '/imports/classes/contact.js';
import Orgs from '/imports/collections/organisation';
import { Org } from '/imports/classes/org.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

Template.contact_card.onCreated(function(){
  this.isEdit = new ReactiveVar(false);
  let _this = this;

  Meteor.autorun(function(comp){
    let x = selectedEntity.get();
    Tracker.nonreactive(function () {
      _this.isEdit.set(newDocVar.get());
      if (newDocVar.get())
        newDocVar.set(false);
    });

  });
});

Template.contact_card.onRendered(function(){

});

Template.contact_card.helpers({
  selected: function(){
    let s = selectedEntity.get();
    if (this.type=="org"){
      let o = Orgs.findOne({_id:s});
      return o;
    } else if(this.type=="person"){
      let c = Contacts.findOne({_id:s});
      return c;
    }
  },
  isOrg: function(){
    return this.entity_type=="org";
  },
  isEdit: function() {
    return Template.instance().isEdit.get();
  },
  organisations: function(){
    return Orgs.find();
  }
});

Template.contact_card.events({
  'click #edit-entity':function(event, template){
    template.isEdit.set(true);
  },
  'click #delete-entity':function(event, template){
    this.deleteEntity();
  },
  'onkeyup .edit-box, keyup .edit-box': function(event, template){
    let modType = event.target.dataset.boxid;
    let val = (event.target.value||"").trim();
    this.updateLocalField(modType, val, false);
  },
  'blur .edit-box, onblur .edit-box': function(event, template){
    let modType = event.target.dataset.boxid;
    let val = (event.target.value||"").trim();
    this.updateLocalField(modType, val, true);
  },
  'click #save-btn':function(event, template){
    this.checkNames();
    try {
      this.updateDb();
      template.isEdit.set(false);
    } catch (e) {
      //Do Nothing to stay in edit mode
    }
  },
  'click #add-phone-btn': function(event, template){
    this.addPhone();
  },
  'click #add-email-btn': function(event, template){
    this.addEmail();
  },
  'change #selecticize-select':function(event, template){
    this.updateLocalField("organisation", event.target.value, true);
  }
});

Template.modifyPhones.helpers({
  safe_number: function(){
    return this.number;
  }
});

Template.modifyPhones.events({
  'click .del-phone-btn':function(event, template){
    let contact = Template.parentData();
    contact.deletePhone(this.id);
  },
  'blur .phone-edit-box, onblur .phone-edit-box': function(event, template){
    event.preventDefault();
    this.number = (event.target.value).trim();
    Template.parentData().setPhone(this);
  }
});

Template.modifyEmails.events({
  'click .del-email-btn':function(event, template){
    let contact = Template.parentData();
    contact.deleteEmail(this.id);
  },
  'blur .email-edit-box, onblur .email-edit-box': function(event, template){
    event.preventDefault();
    this.email = (event.target.value).trim();
    Template.parentData().setEmail(this);
  }
});

Template.orgName.helpers({
  name:function(){
    let o = Orgs.findOne(this.id);
    return o?o.name:null;
  }
});

Template.orgContactList.helpers({
  contacts: function(){
    return Contacts.find({organisation:this._id});
  }
});

Template.tableRowContact.helpers({
  isExpanded: function(event, template){
    return Template.instance().expanded.get();
  }
});

Template.tableRowContact.events({
  'click td': function(event, template){
    template.expanded.set(!template.expanded.get());
  }
});

Template.tableRowContact.onCreated(function(){
  this.expanded = new ReactiveVar(false);
});
