import express from "express";

// const shippo = require("shippo")(process.env.SHIPPO_API_KEY);
const router = express.Router();

import { getLiveRates } from "../controllers/rateController.js";

router.route("/liverates").post(getLiveRates);

export default router;
