const { v4: uuid } = require("uuid");
const models = require("../models");
const contactFormController = {
  createContactForm: async (req, res) => {
    try {
      let userData = {};
      let propertyData = {};
      const user = req.user;
      // const contactTypeId = req.body.service_type_id;
      const contactTypeName = req.body.service_type;

      const existingServiceType = await models.ContactProvider.findOne({
        where: {
          // id: contactTypeId,
          name: contactTypeName,
        },
      });

      if (!existingServiceType) {
        return res.status(400).json({
          success: false,
          errors: ["Invalid  service_type."],
          content: [],
        });
      }

      if (!user) {
        userData.id = uuid();
        propertyData.id = uuid();

        propertyData.user_id = userData.id;
        await models.Property.create(propertyData);
        userData.primary_property_id = propertyData.id;
      }

      // userData.service_type_id = contactTypeId;
      userData.service_type = contactTypeName;

      const requiredFields = [
        "first_name",
        "last_name",
        "contact_number_country",
        "mobile_number_country",
        "mobile_number",
        "contact_number",
        "email",
        "service_type",
      ];

      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          errors: missingFields.map(
            (field) => `Missing required field: ${field}`
          ),
          content: [],
        });
      }

      const contactData = {
        ...req.body,
        user_id: user ? user.id : userData.id,
        property_id: user
          ? user.primary_property_id
          : userData.primary_property_id,
      };

      if (models.Contacts && models.Contacts.create) {
        const result = await models.Contacts.create(contactData);
        res.status(201).json({
          success: true,
          errors: [],
          message: "Contacts created successfully",
          content: result.dataValues,
        });
      } else {
        console.error(
          "Error: models.Contacts or models.Contacts.create is undefined."
        );
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.name === "SequelizeValidationError") {
        const validationErrors = error.errors.map((error) => error.message);

        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: validationErrors,
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  readContact: async (req, res) => {
    try {
      const { property_id, service_type, user_id, contact_id } = req.query;
      if (models.Contacts && models.Contacts.findAll) {
        let whereClause = {};

        if (property_id) {
          whereClause.property_id = property_id;
        }

        if (service_type) {
          whereClause.service_type = service_type;
        }

        if (user_id) {
          whereClause.user_id = user_id;
        }

        if (contact_id) {
          whereClause.id = contact_id;
        }

        const results = await models.Contacts.findAll({
          where: whereClause,
        });

        res.status(200).json({
          success: true,
          errors: [],
          message: "Contacts retrieved successfully",
          content: results,
        });
      } else {
        console.error(
          "Error: models.Contacts or models.Contacts.findAll is undefined."
        );
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  updateContact: async (req, res) => {
    try {
      const contactData = req.body;
      const id = req.query.id;

      if (models.Contacts && models.Contacts.update) {
        const [rowCount, updatedRows] = await models.Contacts.update(
          contactData,
          {
            where: { id: id },
            returning: true,
            individualHooks: true,
          }
        );

        if (updatedRows && updatedRows.length > 0) {
          res.status(200).json({
            success: true,
            errors: [],
            content: updatedRows[0],
          });
        } else {
          console.error("Error: No rows updated.");
          res.status(404).json({
            success: false,
            message: "Contacts not found or not updated",
          });
        }
      } else {
        console.error(
          "Error: models.Contacts or models.Contacts.update is undefined."
        );
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.name === "SequelizeValidationError") {
        const validationErrors = error.errors.map((error) => error.message);

        res.status(400).json({
          success: false,
          content: [],
          message: "Validation Error",
          errors: validationErrors,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    }
  },
};

module.exports = contactFormController;
