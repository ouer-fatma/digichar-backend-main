const {Schema, model} = require('mongoose');

const CharitySchema = Schema(
  {
    Charity_Name: {
      type: String,
    },
    Mission_Statement: {
      type: String,
    },

    Contact_Information: {
      type: String,
    },

    Payement_Infos: {
      type: String,
    },
   user: {
    type: String,
    },
  },
  { timeStamps: true }
);

module.exports = model("Charity", CharitySchema);
