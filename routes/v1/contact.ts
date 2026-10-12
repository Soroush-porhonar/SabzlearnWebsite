import { Router } from "express";

import {
  answerTicket,
  createTicket,
  deleteTicket,
  getAllTicket,
} from "../../controllers/v1/contact.js";

export const contactRouter = Router();

contactRouter.route("/").post(createTicket);
contactRouter.route("/:ticketId").delete(deleteTicket);
contactRouter.route("/:ticketId").put(answerTicket);
contactRouter.route("/").get(getAllTicket);
