


const models = require("../models");
const contactProviderController = {
	add: (req, res) => {
	  let { name, value } = req.body;
	//   console.log("name", name);
	//   console.log("value", value);
  
	  models.ContactProvider.create({ name, value })
		.then((contactProvider) => {
		  res.json({ success: true, content: contactProvider });
		})
		.catch((err) => {
		  console.error(err.errors);
		  res.status(500).json({ success: false, message: "Failed to add contact provider" });
		});
	},
	listAll: (req, res) => {
	  models.ContactProvider.findAll() 
		.then((contactProviders) => {
		  res.json({
			success: true,
			content: contactProviders,
		  });
		})
		.catch((err) => {
		  res.status(500).json({ success: false, message: "Error loading contact providers" });
		});
	},
  };
  


module.exports = contactProviderController;
