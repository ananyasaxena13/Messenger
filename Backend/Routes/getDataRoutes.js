import express from "express";
import { getUserDataController, postDescription, postProfilePhoto } from "../controllers/getData.js";

const getDataRouter = express.Router();

getDataRouter.get("/:username",getUserDataController);
getDataRouter.post("/:username/updateDesc",postDescription);
getDataRouter.post("/:username/update/updateProfilePhoto",postProfilePhoto);

export {getDataRouter}