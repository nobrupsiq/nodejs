import fs from "node:fs/promises";

try {
  await fs.mkdir("./produtos");
} catch {
  console.log("Pasta ja existe!");
}

fs.writeFile("./produtos/notebook.json", JSON.stringify({ nome: "notebook" }));

const dados = await fs.readFile("./produtos/notebook.json", "utf-8");
console.log(dados);

const dir = await fs.readdir("./produtos", { recursive: true });
console.log(dir);
console.log(dir.filter((file) => file.endsWith(".txt")));
