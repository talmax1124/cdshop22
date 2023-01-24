import { response } from "express";
import axios from "axios";

const getLiveRates = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    });
    return res.status(200).end();
  }
  try {
    const payload = JSON.stringify(req.body);
    const { data } = await axios.post(
      "https://api.goshippo.com/live-rates",
      payload,
      {
        headers: {
          Authorization: `ShippoToken shippo_live_672ec38cdd85280c67681f17dff61d7f6afb35ec`,
        },
      }
    );
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

/*

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

*/

export { getLiveRates };
