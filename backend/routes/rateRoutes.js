import express from "express";

// const shippo = require("shippo")(process.env.SHIPPO_API_KEY);
const router = express.Router();

import {
  getRates,
  createCarrierAccount,
  listCarriers,
  getLiveRates,
} from "../controllers/rateController.js";

router.route("/").get(getRates);
router.route("/listcarriers").get(listCarriers);
router.route("/carrieraccount").post(createCarrierAccount);

router.route("/liverates").post(getLiveRates);

export default router;
