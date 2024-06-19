import User from "../models/userModel.js";
import fs from "fs";
export const getUserDataController = async (req, res) => {
  try {
    const username = req.params.username;
    const data = await User.find({ username });
    return res.status(201).json({ data: data });
  } catch (e) {
    console.log(e);
  }
};

export const getAllUserDataController = async (req, res) => {
  try {
    const username = req.params.username;
    const users = await User.find({ username: { $ne: username } }).select(
      "-password"
    );
    return res.json(users);
  } catch (e) {
    console.log(e);
  }
};

export const postDescription = async (req, res) => {
  try {
    const username = req.params.username;
    const { description } = req.body;

    await User.updateOne({ username: username }, { about: description });
    return res.status(201).json({ message: "Updated Successfully" });
  } catch (e) {
    console.log(e);
  }
};

export const postProfilePhoto = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    const { profilePhoto } = req.files;

    if (profilePhoto && profilePhoto.size > 1000000) {
      return res.status(400).json({ message: 'Profile Photo size exceeds 1 MB limit' });
    }

    if (profilePhoto) {
      const imageData = await fs.readFileSync(profilePhoto.path); // Asynchronously read file
      const base64Image = imageData.toString('base64'); // Convert to Base64 encoded string
      user.profilePhoto = base64Image; // Store Base64 encoded string
      await user.save();
    }
    return res.status(201).json({ message: 'Profile Photo Uploaded Successfully' });
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const username = req.params.username;
    await User.deleteOne({ username: username });
    return res.status(201).json({ message: "User Deleted Successfully" });
  } catch (e) {
    console.log(e);
  }
};
