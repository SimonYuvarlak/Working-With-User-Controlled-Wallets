import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const url = `https://api.circle.com/v1/w3s/wallets/${process.env.WALLET_ID}/balances`;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.dir(json, { depth: null }))
  .catch((err) => console.error("error:" + err));
