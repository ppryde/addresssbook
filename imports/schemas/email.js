const EmailSchema = new SimpleSchema({
  email: {
    type: String,
    label: "Email",
    optional: true,
    regEx: SimpleSchema.RegEx.Email
  },
  id: {
    type: String,
    optional: true
  },
  type: {
    type: String,
    optional: true
  }
});

export default EmailSchema;
