import { createServer } from "node:http";

const frase1 = Promise.resolve("Olá");
const frase2 = Promise.resolve("Mundo");
const frasesPromisses = [frase1, frase2];
const frases = [];

for await (const frase of frasesPromisses) {
  frases.push(frase);
}

const part1 = Buffer.from("Olá ");
const part2 = Buffer.from("Mundo!");
const final = Buffer.concat([part1, part2]);

const server = createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  const url = new URL(req.url, "http://localhost");
  const cor = url.searchParams.get("cor");
  const tamanho = url.searchParams.get("tamanho");
  // console.log(req.headers["content-type"]);
  // console.log(req.rawHeaders);

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString("utf-8");
  console.log(JSON.parse(body));

  if (req.method === "GET" && url.pathname === "/") {
    res.statusCode = 200;
    res.end("Home");
  } else if (req.method === "POST" && url.pathname === "/produtos") {
    res.statusCode = 201;
    res.end(`Produtos: ${cor}, ${tamanho}`);
  } else {
    res.statusCode = 404;
    res.end("Não encontrada.");
  }
  console.log(req.method);
});

server.listen(3000, () => {
  console.log("Server: http://localhost:3000");
});
