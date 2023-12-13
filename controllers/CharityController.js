const Charity = require("../models/Charity");

// show the list of interviews with optional search by nom_interviewer
const index = (req, res, next) => {
  // Extract search parameter (nom_interviewer) from the request
  const { Charity_Name } = req.query;

  // Define a filter object based on nom_interviewer
  const filter = {};
  if (Charity_Name) {
    // Perform a case-insensitive search on nom_interviewer field
    filter.Charity_Name = { $regex: new RegExp(Charity_Name, 'i') };
  }

  // Use the filter object in the find query
  Charity.find(filter)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        message: "An error occurred!",
      });
    });
}

// show single User
const show = (req, res) => {
  const { id } = req.body;
  Charity.findById(id)
    .then((response) => {    
      
      res.status(200).send(
      JSON.stringify({
        //200 OK
        Charity_Name: response.Charity_Name,
        Mission_Statement: response.Mission_Statement,
        Contact_Information: response.Contact_Information,
        Payement_Infos: response.Payement_Infos,
      })
    );
    })
    
};

// add user in base
const Add = (req, res, next) => {
  let charity = new Charity({
    Charity_Name: req.body.Charity_Name,
    Mission_Statement: req.body.Mission_Statement,
    Contact_Information: req.body.Contact_Information,
    Payement_Infos: req.body.Payement_Infos,
    user: req.body.user,
  });
  charity
    .save()
    .then((response) => {
      res.json({
        message: "charity added successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

// update user
const update = (req, res, next) => {
  let charityId = req.body.charityId;
  let updateData = {
    Charity_Name: req.body.Charity_Name,
    Mission_Statement: req.body.Mission_Statement,
    Contact_Information: req.body.Contact_Information,
    Payement_Infos: req.body.Payement_Infos,
  };
  Charity.findByIdAndUpdate(charityId, { $set: updateData })
    .then(() => {
      res.json({
        message: "charity updated successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

// delete user
const destroy = (req, res, next) => {
  let charityId = req.body.charityId;
  Charity.findByIdAndRemove(charityId)
    .then(() => {
      res.json({
        message: "charity deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

module.exports = {
  index,
  show,
  Add,
  update,
  destroy,
};
