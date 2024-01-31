import dotenv from "dotenv";
import fetch from "node-fetch";

export const acquire_session_token = () => {
  dotenv.config();

  const url = "https://api.circle.com/v1/w3s/users/token";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({ userId: `${process.env.USER_ID}` }),
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      return {
        userToken: json.data.userToken,
        encryptionKey: json.data.encryptionKey,
      };
    })
    .catch((err) => console.error("error:" + err));
};
