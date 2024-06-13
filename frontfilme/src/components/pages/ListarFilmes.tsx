import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

interface Filme {
  _id: string;
  titulo: string;
  genero: string;
  ano: number;
  estrelas: number;
}

function ListarFilmes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  // Função para carregar os dados dos filmes
  function carregarDados() {
    axios
      .get<Filme[]>("http://localhost:3001/filmes")
      .then((resposta) => {
        setFilmes(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  // Efeito para carregar os dados ao montar o componente
  useEffect(() => {
    carregarDados();
  }, []);

  // Função para remover um filme
  function remover(titulo: string) {
    axios
      .delete(`http://localhost:3001/filme/${titulo}`)
      .then((resposta) => {
        console.log(resposta.data.mensagem);
        carregarDados();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>Listagem de Filmes</h1>
      <table style={{ border: "2px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ border: "2px solid black", borderCollapse: "collapse" }}>
            <th style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>Id</th>
            <th style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>Título</th>
            <th style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>Gênero</th>
            <th style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>Ano</th>
            <th style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>Estrelas</th>
            <th style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>Remover</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map((filme: Filme) => ( // Especificando o tipo de filme como Filme
            <tr key={filme._id} style={{ border: "2px solid black", borderCollapse: "collapse" }}>
              <td style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>{filme._id}</td>
              <td style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>{filme.titulo}</td>
              <td style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>{filme.genero}</td>
              <td style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>{filme.ano}</td>
              <td style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>{filme.estrelas}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={() => remover(filme.titulo)}
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarFilmes;
