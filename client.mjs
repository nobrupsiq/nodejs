const response = await fetch(
  "http://localhost:3000/produtos?cor=azul&tamanho=g",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "bruno", password: "123456" }),
  },
);

const body = await response.text();

console.log(body);
