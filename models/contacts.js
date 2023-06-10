const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleErrors } = require("../helpers");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };

// const fs = require("fs/promises");
// const path = require("path");
// const { v4 } = require("uuid");

// const contactsPath = path.join(__dirname, "contacts.json");

// const updateContacts = async (contacts) => {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getContactById = async (id) => {
//   const contacts = await listContacts();
//   const contaktId = String(id);
//   const result = contacts.find((item) => item.id === contaktId);
//   return result || null;
// };

// const addContact = async ({ name, email, phone }) => {
//   const contacts = await listContacts();
//   const newContact = { id: v4(), name, email, phone };
//   contacts.push(newContact);
//   await updateContacts(contacts);
//   return newContact;
// };

// const removeContact = async (id) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await updateContacts(contacts);
//   return result;
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   // const contactId = String(id);
//   // const index = contacts.findIndex((contact) => contact.id === contactId);
//    const index = contacts.findIndex(
//      (contact) => String(contact.id) === String(contactId)
//    );
//   if (index === -1) {
//     return null;
//   }
//   const contactUpdate = { ...contacts[index], ...body };
//   await updateContacts(contacts);
//   return contactUpdate;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContact,
// };
