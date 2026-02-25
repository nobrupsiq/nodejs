import { createServer } from "node:http";
import { Router } from "./router.mjs";
import { customRequest } from "./custom-request.mjs";

const router = new Router();
router.get("/", (req, res) => {
  res.end("Home");
});

router.get("/produto/notebook", (req, res) => {
  res.end("Produtos - Notebook");
});

router.post("/produto", (req, res) => {
  res.end("Notebook Post");
});

const server = createServer(async (request, res) => {
  const req = await customRequest(request);

  const handler = router.find(req.method, req.pathname);
  console.log(handler);
  if (handler) {
    handler(req, res);
  } else {
    res.statusCode = 404;
    res.end("Não encontrada");
  }
});

server.listen(3000, () => {
  console.log("Server: http://localhost:3000");
});
