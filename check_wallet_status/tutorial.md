# Check Wallet Status

Congratulations on creating your first user controlled wallet. In this lesson, you will you will have the first look
at the wallet you created.

## How To Check Wallet Status

### .env File

In this part, you will use a .env file like the previous time.
For that, you will create a file named `.env` (not .env.local) at the root of your project.
Then you will add the necessary values there.

For starters, add `API_KEY` and `USER_ID` that you obtained in the last section.

In the code, you will see that the `dotenv` library has used to handle `.env` file.

Note that, this is a `NodeJS` code.

```javascript
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const url = `https://api.circle.com/v1/w3s/wallets?userId=${process.env.USER_ID}`;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(JSON.stringify(json, null, 2)))
  .catch((err) => console.error("error:" + err));
```

### Understanding The Code

```javascript
import dotenv from "dotenv";
import fetch from "node-fetch";
```

Here you are importing two libraries: `dotenv` and `node-fetch`.

- You will be using `dotenv` library to handle `.env` files.

- With the `node-fetch` library, you will be able to use `fetch` Api.

```javascript
dotenv.config();
```

- When you call dotenv.config(), it reads the .env file in your project root (or the path you specify), parses the contents, and adds them to the process.env object in Node.js.

- After this line is executed, you can access the variables in the .env file as properties of process.env.

```javascript
const url = `https://api.circle.com/v1/w3s/wallets?userId=${process.env.USER_ID}`;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};
```

- In this part, you are getting ready for you api call.

- With `url` we are indicating where we want to make this call. Notice that, for the userId, you will be using your own `USER_ID` from the `.env` file. So, before running this code, you should have the configured your .env file already.

- `options` is an object that contains configuration settings for the HTTP request you're about to make with fetch. Also, as you can see, you will be using the `API_KEY` from the `.env` file.

```javascript
fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(JSON.stringify(json, null, 2)))
  .catch((err) => console.error("error:" + err));
```

- This code makes an HTTP request, parses the response as JSON, pretty-prints the JSON to the console, and handles any errors that occur during this process.

## Understanding The API Response

After this call, you should have a response with the following structure:

```javascript
{
  "data": {
    "wallets": [
      {
        "id": "c829f4a8-455a-5140-b218-1d50003.....",
        "state": "LIVE",
        "walletSetId": "018d575c-c25e-7b26-8fe7-34ab144.....",
        "custodyType": "ENDUSER",
        "userId": "2ff66a37-cf14-4991-a0e5-a3283b0da1aa",
        "address": "0x9d036cd5030de17aa50b528393619189d78.....",
        "blockchain": "MATIC-MUMBAI",
        "accountType": "EOA",
        "updateDate": "2024-01-29T22:35:13Z",
        "createDate": "2024-01-29T22:35:13Z"
      }
    ]
  }
}
```

This is the wallet that you created in the previous section.

Now let's understand the following concepts:

### Address

The end-users wallet address is a unique identifier generated during wallet creation. It is used for sending, receiving, and storing digital assets on a blockchain network. It serves as the destination for cryptocurrency transactions, verifying ownership of the specific digital wallet.

### Blockchain

This attribute denotes the specific testnet blockchain (network) that the wallet is associated with.

### Create Date

This is a timestamp that marks the moment the wallet was created.

### Custody Type

The Custody Type determines who has the authority to use the private key, it could be either the end-user or the developer. For wallets where the user has control, the custody type is set to user-controlled, giving the user complete authority over their private keys.

### ID

This is a unique identifier given to the wallet.

### State

The state represents the present condition of the wallet, which can be either "live" or "frozen".

### WalletSetId

The WalletSetId is the identifier for a set of wallets. A wallet set is a group of wallets that are controlled by a single private cryptographic key. This provides a cohesive management experience, especially in relation to supported blockchains. Wallets from various chains can have the same address within a wallet set, this is particularly true for EVM chains.

### Quick Note

The following variables will be used, so go ahead and add them to your `.env` file:

- WalletId as `WALLET_ID`
- Address as `ADDRESS`
- Blockchain as `BLOCKCHAIN`

Now that you have a wallet that you can see its status, it is time to get some tokens.
_Since you are working on testnet, these will be testnet tokens._
