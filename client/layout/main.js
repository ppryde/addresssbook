import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Contact } from '/imports/classes/contact';
import { Org } from '/imports/classes/org';
import Orgs from '/imports/collections/organisation';

import './main.html';
searchFilter = new ReactiveVar('');
selectedEntity = new ReactiveVar(null);
newDocVar = new ReactiveVar(false);
let deep_underscore = require('underscore.nested');
_.mixin(deep_underscore);
