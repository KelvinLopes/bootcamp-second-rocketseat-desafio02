const express = require("express");
const cors = require("cors");

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const  repositories = [];

app.get("/repositories", (request, response) => {

 return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  
  const { title, url , techs } = request.body;

  const repositorie =  { id: uuid(), title, url, techs };

  if(title === "" || url === "" || techs === "") {
    return response.status(400).json( { message: "Digite todos os campos solicitados." })
  }

  repositories.push(repositorie);
 
  return response.status(201).json(repositorie);

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url , techs } = request.body;

  const repositorieIndex = repositories.findIndex(repoId => repoId.id === id );

  if(repositorieIndex < 0 ) {
    return response.status(400).json({ message: 'Esse repostório não foi encontrado ou não existe.' })
  }

  const repositorie = {
    id,
    title,
    url , 
    techs
  }

  repositories[repositorieIndex] = repositorie;

  return response.status(201).json(repositorie);

});


app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repoId => repoId.id === id );

  if(repositorieIndex < 0 ) {
    return response.status(400).json({ message: 'Esse repostório não foi encontrado ou não existe.' })
  }

  repositories.splice( repositorieIndex , 1 )

  return response.status(200).json({ message: 'Repositório deletado com sucesso da lista.' })

});


app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
