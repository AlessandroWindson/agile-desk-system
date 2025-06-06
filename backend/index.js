const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend rodando!');
});

app.listen(5000, () => {
  console.log('Servidor backend rodando na porta 5000');
});
