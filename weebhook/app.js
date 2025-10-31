// Importar Express.js
const express = require("express");
const app = express();

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Establecer puerto y token de verificación
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Ruta para solicitudes GET (verificación del webhook)
app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];

  if (mode === "subscribe" && token === verifyToken) {
    console.log("✅ WEBHOOK VERIFICADO");
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Ruta para solicitudes POST (mensajes entrantes)
app.post("/", (req, res) => {
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  console.log(`\n📩 Webhook recibido ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${port}\n`);
});
