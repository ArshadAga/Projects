const express = require('express');
const router = express.Router();
const {getContacts, createContact,getContact, updateContact, deleteContact} = require('../Controller/contactController')

router.route("/").get(getContacts).post(createContact)  //because using the same route

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact) //Using the same route



module.exports = router; 