//Importando o Express na Sintaxe CommonJS
const express = require("express");
const path = require("path");

//Instanciando o Express para criar um aplicativo
const app = express();

//Importando a array de objetos que simula o banco de dados
const productsArray = require("./data");

//Criando uma rota do verbo GET com uma frase teste para ver se a requisição foi recebida e, retornando uma mensagem de boas vindas.
app.get("/hello", (request, response) => {
  console.log("A rota /hello foi chamada para teste");
  return response.send("Seja bem vindo!");
});

//Pesquisando um elemento na array
app.get("/products/search", (request, response) => {
  const queryParams = request.query;

  console.log(queryParams);

  response.json(queryParams);
});

//Esta rota responde com a base de dados de todos os produtos, em formato JSON
app.get("/products", (request, response) => {
  return response.json(productsArray);
});

//Criando uma rota que responde com um produto específico, filtrando pelo ID (pode ser outro parâmetro, usando a mesma sintaxe do React Router, tornando a busca bem dinâmica) E respondendo uma mensagem para o usuário caso digite o ID incorreto

app.get("/products/:id", (request, response) => {
  const id = req.params.id;
  const foundProduct = productsArray.find((productElement) => {
    return productElement.id === id;
  });
  if (foundProduct) {
    return response.json(foundProduct);
  } else {
    return response.json({ msg: "Produto não encontrado." });
  }
});

//Escutando requisições HTTP na porta 4000
app.listen(4000, () => {
  console.log("Servidor está no ar, escutando requisições na porta 4000!");
});
