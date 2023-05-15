import express from "express";
import passport from "passport";
import * as authController from "../controllers/authController";
import { CustomRequest } from "../utils/expressInterfaces";

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleAuthCallback
);

router.get("/", authController.protect, (req, res) => {
  console.log("success");
  res.send(`logged in! ${req.user}`);
});

router.get("/getUser", authController.protect, authController.sendUser);

export default router;
