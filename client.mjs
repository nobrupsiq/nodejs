const produtosResp = await fetch("http://localhost:3000/produtos");
const produtos = await produtosResp.json();

const response = await fetch("http://localhost:3000/produtos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nome: "Notebook",
    slug: "notebook",
    categoria: "eletronicos",
    preco: 4000,
  }),
});

await fetch("http://localhost:3000/produtos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nome: "Computador",
    slug: "computador",
    categoria: "eletronicos",
    preco: 6400,
  }),
});

await fetch("http://localhost:3000/produtos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nome: "Mesa",
    slug: "mesa",
    categoria: "moveis",
    preco: 1200,
  }),
});

await fetch("http://localhost:3000/produtos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nome: "Mouse",
    slug: "mouse",
    categoria: "eletronicos",
    preco: 500,
  }),
});
