import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";

import express from "express";

const app = express();

app.get("/:userSays", async (req, res) => {
    const userSays = req.params.userSays;
  res.send(await sayHello(userSays));
});

// const PORT = 3000;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor de la API escuchando en el puerto ${PORT}`);
});

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const sayHello = async (userSays) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
   
    messages: [{ role: "user", content: userSays}],
  });
  return response.data.choices[0].message.content;
  
};

console.log(process.env.API_KEY);
