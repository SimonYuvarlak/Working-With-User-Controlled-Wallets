# Initiate Transaction

In this lesson you are going to send some tokens. Yaou have two options here.

- You can send tokens to the same wallet. In this case, you can understand the transaction was successfull by looking at the transaction log or by checking the change in the native currency which will be used for gas fees.

- Alternatively you can create a new wallet.

  - Go to the `User-Contolled-Wallet` project.
  - Get the necessary variables from each section:
    - `App Id`: Same as before
    - `User Id`: To create a seperate user, you can create a new one, to use the same user, keep this the same as before.
    - `User Session and Encryption Key`: Get new ones.
    - `Challange Id`: Create a new one by initializing user.
    - Create a new wallet.

  Don't forget that you need to update the `.env.local` file for each new variable you have retrieved.

Now that you have a sender and a receiver wallet, it is time for your first transaction.

## Javascript Code to Send 1 USDC Token

```javascript
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
```

Now, let's break down this code to understand it better.

```javascript
import dotenv from "dotenv";
import fetch from "node-fetch";
import { acquire_session_token } from "../helpers/acquire_session_token.js";
import { v4 as uuidv4 } from "uuid";
```

Here you are importing the necessary libraries and codes.

- `dotenv` and `fetch` are here with the same reason as in the previous examples: to use `.env` file and to be able to make fetch calls to the api.

- `acquire_session_token` this is the same function that you have used in the `user-controlled` wallet project. Now, this code returns an object having `userToken` and `encryption key`.

- `uuid`: to create the idempotency key with an unique identifier.

```javascript
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
```

- `url` is where you make the `POST` request.
- `headers` involves necessary information for the call including `API_KEY` and `userToken`.
- `body`: this is where information for your transaction lies:
  - `idempotency key`: This uniquely identifies this transaction.
  - `userId`: This is the id of the user making the transaction.
  - `destinationAddress`: This is the address of the wallet that will receive the funds.
  - `amounts`: Amount of token that will be transferred.
  - `feeLevel`: This indicates the amount of fee that can be used for this transaction.
  - `tokenId`: The id of the token that will be sent (in this case the id of the USDC token that you have retrieved in the previous lesson).
  - `walletId`: Id of the wallet that is sending the funds.

```javascript
fetch(url, options)
  .then((res) => res.json())
  .then((json) => {
    console.log("user token:", userToken);
    console.log("encryption key:", encryptionKey);
    console.log("idempotency key:", idempotencyKey);
    console.log(json);
  })
  .catch((err) => console.error("error:" + err));
```

- This part works as same as the previous examples. Differently, you are printing some information (user token, encryption key and idempotency key) before returning the json object.

- The reason that code logs these information is because you are going to need them in the next part.

This code return a challangeId inside a json object. You are going to use this challange id as you used before when you played the part of the end user and created a wallet by setting up a pin code and a recovery question. Since this is a user controlled wallet, you need the authorization from the end user. This is true for wallet creation and this is also true for transaction. For that, reason, please save this challange id for the next part.

## Completing the Challenge

Now that you have the `user token (session token)`, `encryption key` and `challange id`, you can again play the role of the end user and complete the challange for your transaction to be successful.

- Open the `user-controlled-wallet` project, where you have created the user controlled wallet.
- Click on the wallet icon in the homepage that will take you the wallet creation page.
- You have used this page before to create a wallet. This time, you are going to use this for completing a transation. The reason you can use the same structure is because of the challange. In the user controlled wallet, after you have done your part, you will require the authorization of the user. In Circle, you do this with a challange. That is why in both creating a user controlled wallet, and creating a transaction, at the end, you have acquired a challange id. You will use the same parameters as before: `APP ID`. `USER ID`, `USER(SESSION) TOKEN`, `ENCRYPTION KEY` and `CHALLANGE ID`. You have acquired these valued if you followed the previous steps.

- Now, put the values and click on the button to verify the challange.
- It will ask for your pin code and that is it. Now you have successfully send 1 USDC token to another wallet!

## Summary

Creating a transaction has two main parts:

- Part of the developer:

  - Developer acquires the session token, encryption key and challange id. With putting the necessary parameters makes the api call.

- Part of the user:
  - User completes this transaction by completing the challange by putting the pin code.
