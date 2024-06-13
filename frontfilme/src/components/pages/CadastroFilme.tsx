import axios from 'axios';
import { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

function CadastroFilme() {
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');
  const [estrelas, setEstrelas] = useState('');

  function enviar() {
    const filme = {
      titulo: titulo,
      genero: genero,
      ano: Number.parseInt(ano),
      estrelas: Number.parseInt(estrelas),
    };

    axios
      .post('http://localhost:3001/filme', filme)
      .then((resposta) => {
        console.log(resposta.data.mensagem);
        setTitulo('');
        setGenero('');
        setAno('');
        setEstrelas('');
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}> Cadastrar Filme</h1>
      
      <TextField id="outlined-size-small" label="Título" value={titulo} onChange={(event) => setTitulo(event.target.value)}/>
      <br />
      <TextField id="outlined-size-small" label="Gênero" value={genero} onChange={(event) => setGenero(event.target.value)}/>
      <br />
      <TextField id="outlined-size-small" label="Ano" value={ano} onChange={(event) => setAno(event.target.value)}/>
      <br />
      <TextField id="outlined-size-small" label="Estrelas" value={estrelas} onChange={(event) => setEstrelas(event.target.value)}/>
      <br />
      <Button variant="contained" color="secondary" size="medium" onClick={enviar}>
        Cadastrar
      </Button>
    </div>
  );
}

export default CadastroFilme;
