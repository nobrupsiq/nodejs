const base = "http://localhost:3000";

setTimeout(async () => {
  const reponse1 = await fetch(base + "/curso/python/");
  console.log(reponse1.ok, reponse1.status);
  const body = await reponse1.json();
  console.log(body);
  const reponse2 = await fetch(base + "/");
  console.log(reponse2.ok, reponse2.status);
}, 200);
