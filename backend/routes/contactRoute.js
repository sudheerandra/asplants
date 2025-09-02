import express from "express";
import {contact, sendContactForm } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/", contact)
contactRouter.post("/", sendContactForm);

export default contactRouter;
