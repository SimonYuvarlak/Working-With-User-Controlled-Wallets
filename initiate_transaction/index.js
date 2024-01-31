import dotenv from "dotenv";
import fetch from "node-fetch";
import { acquire_session_token } from "../helpers/acquire_session_token.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const userCredentials = await acquire_session_token();
const userToken = userCredentials.userToken;
const encryptionKey = userCredentials.encryptionKey;
const idempotencyKey = uuidv4();

const url = "https://api.circle.com/v1/w3s/user/transactions/transfer";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
    "X-User-Token": userToken,
  },
  body: JSON.stringify({
    idempotencyKey: idempotencyKey,
    userId: `${process.env.USER_ID}`,
    destinationAddress: `${process.env.ADDRESS_R}`,
    refId: "",
    amounts: ["1"],
    feeLevel: "HIGH",
    tokenId: `${process.env.USDC_TOKEN_ID}`,
    walletId: `${process.env.WALLET_ID}`,
  }),
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => {
    console.log("user token:", userToken);
    console.log("encryption key:", encryptionKey);
    console.log("idempotency key:", idempotencyKey);
    console.log(json);
  })
  .catch((err) => console.error("error:" + err));
