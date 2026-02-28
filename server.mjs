import { createServer } from "node:http";
import { Router } from "./router.mjs";
import { customRequest } from "./custom-request.mjs";
import { customResponse } from "./custom-response.mjs";
import {
  criarCurso,
  criarAula,
  pegarCursos,
  pegarCurso,
  pegarAulas,
  pegarAula,
} from "./database.mjs";

const router = new Router();

// Criar cursos
router.post("/cursos", (req, res) => {
  const { slug, nome, descricao } = req.body;
  const criado = criarCurso({ slug, nome, descricao });
  if (criado) {
    res.status(201).json("curso criado");
  } else {
    res.status(400).json("erro ao criar curso");
  }
});

// Criar aulas
router.post("/aulas", (req, res) => {
  const { slug, nome, cursoSlug } = req.body;
  const criada = criarAula({ slug, nome, cursoSlug });
  if (criada) {
    res.status(201).json("Aula criada");
  } else {
    res.status(400).json("erro ao criar aula");
  }
});

//Visualiazr cursos
router.get("/cursos", (req, res) => {
  const cursos = pegarCursos();
  if (cursos && cursos.length) {
    res.status(200).json(cursos);
  } else {
    res.status(404).json("cursos não encontrado");
  }
  return;
});

// Visualizar apenas um curso especifico
router.get("/curso", (req, res) => {
  const slug = req.query.get("slug");
  const curso = pegarCurso(slug);
  if (curso) {
    res.status(200).json(curso);
  } else {
    res.status(404).json("curso não encontrado");
  }
  return;
});

// Visualizar aulas
router.get("/aulas", (req, res) => {
  const curso = req.query.get("curso");
  const aulas = pegarAulas(curso);
  if (aulas && aulas.length) {
    res.status(200).json(aulas);
  } else {
    res.status(404).json("aulas não encontradas");
  }
});

// Visualizar aula
router.get("/aula", (req, res) => {
  const curso = req.query.get("curso");
  const slug = req.query.get("slug");
  const aula = pegarAula(curso, slug);
  if (aula) {
    res.status(200).json(aula);
  } else {
    res.status(404).json("aula não encontradas");
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
