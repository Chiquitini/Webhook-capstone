// weebhook/app.js
const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());

// Usa el puerto que entrega Render
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// Healthcheck opcional
app.get("/", (_req, res) => res.status(200).send("OK"));

// ✅ Verificación de Webhook (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ WEBHOOK_VERIFIED");
      return res.status(200).send(challenge);
    }
    console.warn("❌ VERIFY_TOKEN inválido");
    return res.sendStatus(403);
  }
  return res.sendStatus(400);
});

// ✅ Recepción de mensajes (POST)
app.post("/webhook", (req, res) => {
  const ts = new Date().toISOString().replace("T", " ").slice(0, 19);
  console.log( Webhook recibido ${ts});
  console.log(JSON.stringify(req.body, null, 2));
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log( Servidor escuchando en el puerto ${PORT});
});