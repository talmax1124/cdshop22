import { response } from "express";
import shippo from "shippo";
const Shippo = new shippo(process.env.SHIPPO_API_KEY);
import axios from "axios";

const getRates = async (req, res) => {
  Shippo.shipment.rates("1aff867f0e2b4262a15b49a53eeeb725").then((rates) => {
    console.log("rates", rates);
  });

  res.status(200).json({ message: "success" });
};

const createCarrierAccount = async (req, res) => {
  Shippo.carrieraccount.create(
    {
      carrier: req.body.carrier,
      account_id: req.body.account_id,
      parameters: { meter: req.body.meter },
      test: true,
      active: true,
    },
    function (err, account) {
      if (err) return res.status(400).json({ message: "error", data: err });
      res.status(200).json({ message: "success", data: account });
    }
  );
};

const listCarriers = async (req, res) => {
  Shippo.carrieraccount.list(
    {
      carrier: req.query.carrier,
    },
    function (err, response) {
      if (err) return res.status(400).json({ message: "error", data: err });
      console.log(response);
      res.status(200).json({ message: "success", data: response });
    }
  );
};

const getLiveRates = async (req, res) => {
  const payload = JSON.stringify(req.body);
  const response = await axios.post(
    "https://api.goshippo.com/live-rates",
    payload,
    {
      headers: {
        Authorization:
          "ShippoToken shippo_live_672ec38cdd85280c67681f17dff61d7f6afb35ec",
      },
    },
    {
      crossDomain: true,
    }
  );
  console.log(response);

  res.send(response.data);
};
export { getRates, createCarrierAccount, listCarriers, getLiveRates };
