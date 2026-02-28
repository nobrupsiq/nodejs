const base = "http://localhost:3000";

await fetch(base + "/cursos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    slug: "javascript",
    nome: "JavaScript",
    descricao: "Curso de JavaScript",
  }),
});

await fetch(base + "/cursos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    slug: "html",
    nome: "HTML",
    descricao: "Curso de HTML",
  }),
});

await fetch(base + "/aulas", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    slug: "variaveis",
    nome: "Variáveis",
    cursoSlug: "javascript",
  }),
});

await fetch(base + "/aulas", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    slug: "arrays",
    nome: "Arrays",
    cursoSlug: "javascript",
  }),
});

const aula = await fetch(base + "/aula?curso=javascript&slug=arrays").then(
  (r) => r.json(),
);
console.log(aula);

const aulas = await fetch(base + "/aulas?curso=javascript").then((r) =>
  r.json(),
);
console.log(aulas);

const curso = await fetch(base + "/curso?slug=html").then((r) => r.json());
console.log(curso);

const cursos = await fetch(base + "/cursos").then((r) => r.json());

console.log(cursos);
