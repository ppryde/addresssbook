const PhoneSchema = new SimpleSchema({
  number: {
    type: String,
    label: "number",
    optional: true,
    regEx: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i
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

export default PhoneSchema;
