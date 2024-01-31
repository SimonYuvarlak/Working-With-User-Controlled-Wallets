import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const url = `https://api.circle.com/v1/w3s/wallets?userId=${process.env.USER_ID_R}`;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY_R}`,
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(JSON.stringify(json, null, 2)))
  .catch((err) => console.error("error:" + err));
