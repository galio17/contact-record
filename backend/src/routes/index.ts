import { Router } from "express";
import { errorHandlerMiddleware } from "../middlewares";
import { contactsRouter } from "./contacts.routes";
import { sessionsRouter } from "./sessions.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("", sessionsRouter);
router.use("/users", usersRouter);
router.use("/contacts", contactsRouter);
router.use(errorHandlerMiddleware);

export default router;
