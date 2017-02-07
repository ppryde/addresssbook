import AddressSchema from '/imports/schemas/address.js'
import PhoneSchema from '/imports/schemas/phone.js'
import EmailSchema from '/imports/schemas/email.js'

const ContactSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  displayName: {
    type:String,
    max: 201,
    optional: true
  },
  fname: {
    type: String,
    label: "First Name",
    max: 100,
    optional: true
  },
  lname: {
    type: String,
    label: "Last Name",
    max: 100,
    optional: true
  },
  emails: {
    type: [EmailSchema],
    optional: true
  },
  phones: {
    type: [PhoneSchema],
    optional: true
  },
  address: {
    type: AddressSchema,
    optional: true
  },
  organisation: {
    type: String,
    optional: true
  }
});

ContactSchema.EmailSchema = EmailSchema;
ContactSchema.PhoneSchema = PhoneSchema;

export default ContactSchema;
