import { response } from "express";
import axios from "axios";

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
export { getLiveRates };
