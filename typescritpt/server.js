const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect("mongodb+srv://saraalves0901:12345678910@filmesfavs.53eqegv.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema do Filme
const filmeSchema = new mongoose.Schema({
  titulo: String,
  genero: String,
  ano: Number,
  estrelas: Number, // Adicionando campo 'estrelas' ao schema
});

const Filme = mongoose.model("Filme", filmeSchema);

// Schema de Favoritos
const favoritosSchema = new mongoose.Schema({
  titulo: String,
  filmesId: Number,
});

const Favoritos = mongoose.model("Favoritos", favoritosSchema);

// Rota para cadastrar um novo filme (POST)
app.post("/filme", async (req, res) => {
  try {
    const novoFilme = new Filme(req.body);
    await novoFilme.save();
    res.status(201).json({ mensagem: "Filme cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
});

// Rota para buscar um filme pelo título (GET)
app.get("/filme/:titulo", async (req, res) => {
  try {
    const filme = await Filme.findOne({ titulo: req.params.titulo });
    if (filme) {
      res.json(filme);
    } else {
      res.status(404).json({ mensagem: "Filme não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
});

// Rota para listar todos os filmes (GET)
app.get("/filmes", async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.json(filmes);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
});

// Rota para remover um filme pelo título (DELETE)
app.delete("/filme/:titulo", async (req, res) => {
  const titulo = req.params.titulo;
  try {
    const filmeRemovido = await Filme.findOneAndDelete({ titulo });
    if (filmeRemovido) {
      res.json({ mensagem: `Filme '${titulo}' removido com sucesso` });
    } else {
      res.status(404).json({ mensagem: "Filme não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
});

// Rota para cadastrar favoritos (POST)
app.post("/favoritos", async (req, res) => {
  try {
    const novoFavorito = new Favoritos(req.body);
    await novoFavorito.save();
    res.status(201).json({ mensagem: "Favorito cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
