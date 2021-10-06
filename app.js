//Importando o Express na Sintaxe CommonJS
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

//Importando a array de objetos que simula o banco de dados
const productsArray = require("./data");
const { request, response } = require("express");

//Instanciando o Express para criar um aplicativo
const app = express();

//Configurando o servidor Express para aceitar requisições no formato JSON
app.use(express.json());

//Criando uma rota do verbo GET com uma frase teste para ver se a requisição foi recebida e, retornando uma mensagem de boas vindas.
app.get("/hello", (request, response) => {
  console.log("A rota /hello foi chamada para teste");
  return response.send("Seja bem vindo!");
});

//Pesquisando um elemento na array
app.get("/products/search", (request, response, next) => {
  const queryParams = request.query;

  console.log(queryParams);

  //Iterando sobre cada propriedade do objeto queryParams, difernciando os números para facilitar a busca
  for (let key in queryParams) {
    const foundProduct = productsArray.find((productElement) => {
      if (typeof productElement[key] === "number") {
        return Math.round(productElement[key]) === Math.round(queryParams[key]);
      }
      //comparando letras minúsculas
      return productElement[key]
        .toLowerCase()
        .includes(queryParams[key].toLowerCase());
    });

    //exibindo o resultado encontrado ou mensagem de erro
    if (foundProduct) {
      return response.json(foundProduct);
    } else {
      return response.json({ msg: "Produto não encontrado." });
    }
  }
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

//Adicionando um novo produto
app.post("/products", (request, response) => {
  const formData = request.body;

  const newProduct = {
    id: uuidv4(),
    categoria: formData.categoria,
    subcategoria: formData.subcategoria,
    modelo: formData.modelo,
    cor: formData.cor,
    linha: formData.linha,
    fornecedor: formData.fornecedor,
    quantidade: formData.quantidade,
    preço: formData.preço,
    entrada: formData.entrada,
    imagem: formData.imagem,
  };
  productsArray.push(newProduct);
  return response.json(newProduct);
});

//Editando o produto
app.put("/products/:id", (request, response) => {
  const formData = request.body;

  //Encontrando um produto existente através do id
  const id = request.params.id;

  const foundProduct = productsArray.find((productElement) => {
    return productElement.id === id;
  });

  //Encontrando o índice desse registro na Array
  const index = productsArray.indexOf(foundProduct);

  productsArray[index] = { ...foundProduct, ...formData };
  return response.json(productsArray[index]);

  //Se encontrar o produto, atualiza os dados, se não, recebe a mensagem de erro
  if (foundProduct) {
    return response.json(foundProduct);
  } else {
    return response.json({ msg: "Produto não encontrado." });
  }
});

//Deletando um produto
app.delete("products/:id", (request, response) => {
  const index = productsArray.findIndex((productElement) => {
    return productElement.id === request.params.id;
  });

  if (index > 0) {
    productsArray.splice(index, 1);
    return response.json({ msg: "Product deletado com sucesso" });
  } else {
    return response.json({ msg: "Product não encontrado." });
  }
});

//Escutando requisições HTTP na porta 4000
app.listen(4000, () => {
  console.log("Servidor está no ar, escutando requisições na porta 4000!");
});
