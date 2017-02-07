import AddressSchema from '/imports/schemas/address.js'
import PhoneSchema from '/imports/schemas/phone.js'
import EmailSchema from '/imports/schemas/email.js'

const OrgSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: {
    type: String,
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
  }
});

OrgSchema.EmailSchema = EmailSchema;
OrgSchema.PhoneSchema = PhoneSchema;

export default OrgSchema;
