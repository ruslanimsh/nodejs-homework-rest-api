const express = require('express')

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const { RequestError } = require("../../helpers");
const { bodySchema } = require("../../schemas/contacts");

const router = express.Router()

router.get('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
   try {
     const contacts = await listContacts();
     res.status(200).json(contacts);
   } catch (error) {
     next(error);
   }
})

router.get("/:contactId", async (req, res, next) => {
  // res.json({ message: 'template message' })
   try {
     const contactId = req.params.contactId;
     const contactById = await getContactById(contactId);

     if (!contactById) {
       throw RequestError(404, "Not found");
     }

     res.status(200).json(contactById);
  
   } catch (error) {
     next(error);
   }
})

router.post('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
   try {
     const {error} = bodySchema.validate(req.body);
     

     if (error) {
       throw RequestError(404, "missing required name field");
     }

     const newContact = await addContact(req.body);

     res.status(201).json(newContact);
   } catch (error) {
     next(error);
   }
})

router.delete('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
   try {
     const contactId = req.params.contactId;
     const findContactById = await removeContact(contactId);

     if (!findContactById) {
       throw RequestError(404, "Not found");
     }

     res.json({ message: "Contact deleted" });
   } catch (error) {
     next(error);
   }
})

router.put('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    
    const { error } = bodySchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    
    const  contactId  = req.params.contactId
    const { name, email, phone } = req.body
    if (!name && !email && !phone) {
      res.status(400).json({ message: "missing fields" })
    }
    const contactUpdate = await updateContact(contactId, req.body)
   
    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }

    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
})

module.exports = router
