import { createServer } from "node:http";
import { Router } from "./router.mjs";
import { customRequest } from "./custom-request.mjs";
import { customResponse } from "./custom-response.mjs";
import fs from "node:fs/promises";

const router = new Router();
const produtosDir = "produtos";

router.post("/produtos", async (req, res) => {
  const { categoria, slug } = req.body;
  try {
    await fs.mkdir(`./${produtosDir}/${categoria}`);
  } catch {
    console.log(`${categoria} Já criada.`);
  }
  try {
    await fs.writeFile(
      `./${produtosDir}/${categoria}/${slug}.json`,
      JSON.stringify(req.body),
      res.status(201).json(`${slug} criado.`),
    );
  } catch {
    res.status(500).json("Erro.");
  }
});

router.get("/produtos", async (req, res) => {
  try {
    const listaArquivos = await fs.readdir(`${produtosDir}`, {
      recursive: true,
    });
    const arquivosJson = listaArquivos.filter((item) => item.endsWith(".json"));
    const promises = [];
    for (const arquivo of arquivosJson) {
      const conteudo = fs.readFile(`./${produtosDir}/${arquivo}`, "utf-8");
      promises.push(conteudo);
    }
    const conteudos = await Promise.all(promises);
    const produtos = conteudos.map(JSON.parse);
    res.status(200).json(produtos);
  } catch {
    res.status(500).json("Erro.");
  }
});

router.get("/produto", async (req, res) => {
  const categoria = req.query.get("categoria");
  const slug = req.query.get("slug");
  try {
    const conteudo = await fs.readFile(
      `./${produtosDir}/${categoria}/${slug}.json`,
      "utf-8",
    );
    const produto = JSON.parse(conteudo);
    res.status(200).json(produto);
  } catch {
    res.status(404).json("Não encontrado.");
  }
});

const server = createServer(async (request, response) => {
  const req = await customRequest(request);
  const res = customResponse(response);

  const handler = router.find(req.method, req.pathname);
  if (handler) {
    handler(req, res);
  } else {
    res.status(404).end("Não encontrada");
  }
});

server.listen(3000, () => {
  console.log("Server: http://localhost:3000");
});
