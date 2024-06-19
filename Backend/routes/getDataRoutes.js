import express from "express";
import { getUserDataController, postDescription, postProfilePhoto, deleteAccount, getAllUserDataController} from "../controllers/getData.js";
import formidable from "express-formidable"
const getDataRouter = express.Router();

getDataRouter.get("/:username",getUserDataController);
getDataRouter.get("/:username/allUser",getAllUserDataController);
getDataRouter.post("/:username/updateDesc",postDescription);
getDataRouter.post("/:username/update/updateProfilePhoto",formidable(),postProfilePhoto);
getDataRouter.post("/:username/delete",deleteAccount);

export {getDataRouter}