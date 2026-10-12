import { RequestHandler } from "express";
import { contactModel } from "../../models/contact.js";

export const createTicket: RequestHandler = async (req, res) => {
  const { body, name, phone, email } = req.body;
  const Ticket = await contactModel.create({
    name,
    phone,
    email,
    body,
    answered: false,
  });
  res.status(201).json({ message: "Ticket created successfullly" });
};

export const deleteTicket: RequestHandler = async (req, res) => {
  const ticketId = res.locals.ids.ticketId;
  const Ticket = await contactModel.findByIdAndDelete(ticketId);
  if (Ticket) {
    res.status(204).json({ message: "Ticket deleted successfullly" });
  } else {
    res.status(404).json({ error: "Ticket not found" });
  }
};
export const getAllTicket: RequestHandler = async (req, res) => {
  const Tickets = await contactModel.find();
  res.status(200).json(Tickets);
};
export const answerTicket: RequestHandler = async (req, res) => {
  const ticketId = res.locals.ids.ticketId;
  const Ticket = await contactModel.findByIdAndUpdate(ticketId, {
    answered: true,
  });
  if (Ticket) {
    res.status(200).json({ message: "Ticket updated successfullly" });
  } else {
    res.status(404).json({ error: "Ticket not found" });
  }
};
