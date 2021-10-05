//Importando o Express na Sintaxe CommonJS
const express = require("express");

//Instanciando o Express para criar um aplicativo
const app = express();

//Criando uma rota do verbo GET com uma frase teste para ver se a requisição foi recebida e, retornando uma mensagem de boas vindas.
app.get("/hello", (request, response) => {
  console.log("A rota /hello foi chamada para teste");
  return response.send("Seja bem vindo!");
});

//Escutando requisições HTTP na porta 4000
app.listen(4000, () => {
  console.log("Servidor está no ar, escutando requisições na porta 4000!");
});
