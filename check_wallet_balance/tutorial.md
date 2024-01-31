# Check Wallet Balance

To check the wallet balance we need to make an additional api call.

_Before the making the call make sure that you have already obtained your `WALLET_ID` and saved it in the `.env` file._

## NodeJS Code For Checking Wallet Balance

```javascript
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
```

This code is almost identical with the one that you have used in the previous lesson to get the wallet status.

- The different thing is the URL you are calling. Be aware that yoe passing `WALLET_ID` for this call.

## Understanding The Response

If everything goes well, you will a response like the following:

```javascript
{
  data: {
    tokenBalances: [
      {
        token: {
          id: "e4f549f9-a910-59b1-b5cd-8f972871f5db",
          blockchain: "MATIC-MUMBAI",
          name: "Polygon-Mumbai",
          symbol: "MATIC-MUMBAI",
          decimals: 18,
          isNative: true,
          updateDate: "2023-06-29T02:37:14Z",
          createDate: "2023-06-29T02:37:14Z",
        },
        amount: "0",
        updateDate: "2024-01-30T16:57:04Z",
      },
      {
        token: {
          id: "7adb2b7d-c9cd-5164-b2d4-b73b088274dc",
          blockchain: "MATIC-MUMBAI",
          tokenAddress: "0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97",
          standard: "ERC20",
          name: "USD Coin",
          symbol: "USDC",
          decimals: 6,
          isNative: false,
          updateDate: "2023-10-18T14:29:44Z",
          createDate: "2023-10-18T14:29:44Z",
        },
        amount: "10",
        updateDate: "2024-01-30T16:57:04Z",
      },
    ];
  }
}
```

- As you can see, under the `data`, there is an array named `tokenBalances`.

- This array hold the tokens that this wallet owns.

- There are two types of tokens this address holds since there are two elements this array has.

- The first one is:

```javascript
{
        token: {
          id: "e4f549f9-a910-59b1-b5cd-8f972871f5db",
          blockchain: "MATIC-MUMBAI",
          name: "Polygon-Mumbai",
          symbol: "MATIC-MUMBAI",
          decimals: 18,
          isNative: true,
          updateDate: "2023-06-29T02:37:14Z",
          createDate: "2023-06-29T02:37:14Z",
        },
        amount: "0",
        updateDate: "2024-01-30T16:57:04Z",
}
```

- This is the native token for `MATIC-MUMBAI`.

- In this tutorial, you will be working with testnet `USDC` stable coin, which you have acquired on the previous lesson.

Here is the token, which is the second item in the array:

```javascript
{
        token: {
          id: "7adb2b7d-c9cd-5164-b2d4-b73b088274dc",
          blockchain: "MATIC-MUMBAI",
          tokenAddress: "0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97",
          standard: "ERC20",
          name: "USD Coin",
          symbol: "USDC",
          decimals: 6,
          isNative: false,
          updateDate: "2023-10-18T14:29:44Z",
          createDate: "2023-10-18T14:29:44Z",
        },
        amount: "10",
        updateDate: "2024-01-30T16:57:04Z",
}
```

Let's look at this token a little bit deeper:

- `id`: this is the token id. It uniquely identifies the token.
- `blockchain`: this is the network that the token is in.
- `tokenAddress`: this is the address of the smart contract that governs the token.
- `standard`: this is the token standard. In this example, the token is using `ERC20` `Ethereum Fungible Token` Standard.
- `name`: this is the name of the token.
- `symbol`: this is the symbol of the token.
- `decimals`: For USDC and many other tokens, decimals is set to 6. This means that the token can be divided down to 0.000001 USDC. This is similar to how a dollar can be divided down to a cent.
- `isNative`: this indicates that this token is not the native token of this network. If you look at the previous token example above, you can see that this variable is true since it is the native token of the network.
- `amount`: this show how much of this token does this wallet hold. If this is 0 for you, then it means that you failed to acquire test token in the previous lesson. If this is the case, please go back to the previous lesson and acquire test USDC tokens.

Here you have it folks. You have successfully created and funded a user controlled wallet with test USDC token.

Before moving forward, add the id of the USDC token to .env file under the name `USDC_TOKEN_ID`

Now, it is time for your first transaction. But before that, there is one more step to complete and that is getting `native tokens`.
