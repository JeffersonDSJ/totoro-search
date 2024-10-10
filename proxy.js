import express from "express";
import cors from "cors";
import axios from "axios";

const PORT = 4000;

const app = express();

app.use(cors());

app.get("/search", async (req, res) => {
  const apiKey =
    "d37de77b2461898d19becf6699cd7699d1303d97cd209c5f115f2ff777a031f6";

  const { query } = req.query;

  const URL = "https://serpapi.com/search.json";

  try {
    const response = await axios.get(URL, {
      params: {
        q: query,
        api_key: apiKey,
        num: 10,
        engine: "google",
        google_domain: "google.com.br",
        hl: "pt-br",
        gl: "br",
      },
    });
    res.json(response.data);
  } catch {
    res
      .status(500)
      .json({ error: "ocorreu um erro ao fazer a requisiçao a API" });
  }
});

app.listen(PORT, () => {
  console.log(`o proxy esta rodando na porta ${PORT}`);
});
