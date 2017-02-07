import Contacts from '/imports/collections/contacts';
import { ReactiveVar } from 'meteor/reactive-var';
import { Contact } from '/imports/classes/contact';
import { Org } from '/imports/classes/org';
import Orgs from '/imports/collections/organisation';

Template.main_display.onCreated(function(){
  this.selectedTab = new ReactiveVar("people");
});

Template.main_display.helpers({
  contacts: function(){
    let filter = searchFilter.get();
    return (!filter||(filter==""))?Contacts.find({}):Contacts.find({displayName:{ $regex : new RegExp(filter, "i")}});
  },
  organisations: function(){
    let filter = searchFilter.get();
    return (!filter||(filter==""))?Orgs.find({}):Orgs.find({name:{$regex:new RegExp(filter, "i")}});
  },
  hasEmail: function(){
    if (this.emails && this.emails.length > 0)
      return true;
  },
  hasPhone: function(){
    if (this.phones && this.phones.length > 0)
      return true;
  },
  hasAddress: function(){
    if (this.address && (this.address.line1 || this.address.line2 || this.address.line3 || this.address.line4))
      return true;
  },
  isOrg: function(){
    return Template.instance().selectedTab.get()=="orgs";
  }
});

Template.main_display.events({
  "keyup #search_input, change #search_input, paste #search_input, input #search_input": function(event, template){
    if (event.target && event.target.value!=searchFilter.get())
        searchFilter.set(event.target.value);
  },
  "click .contact-entity": function(event, template){
      selectedEntity.set(this._id);
  },
  "click .list-tab": function(event, template){
    let type = event.currentTarget.dataset["type"];
    $('.list-tab').removeClass("active");
    $(template.find('.list-tab[data-type="'+type+'"]')).addClass("active");
    template.selectedTab.set(type);
  },
  'click #add-btn': function(event, template){
    let nu;
    if (template.selectedTab.get() == "orgs")
      nu = new Org();
    else if (template.selectedTab.get() == "people")
      nu = new Contact();
    if (nu){
      newDocVar.set(true);
      selectedEntity.set(nu._id);
    }
  }
});
