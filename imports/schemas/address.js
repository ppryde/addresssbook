const AddressSchema = new SimpleSchema({
  line1: {
    type: String,
    optional: true
  },
  line2: {
    type: String,
    optional: true
  },
  line3: {
    type: String,
    optional: true
  },
  line4: {
    type: String,
    optional: true
  }
});

export default AddressSchema;
