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

  const repository =  { 
    id: uuid(), 
    title, 
    url, 
    techs,
    likes: 0
  };

  /*
  * Se for utilizar os testes, comente as verificações:
  * Verifica campos vazios e verifica se o item já existe.
  * Pois, elas não fazem parte do teste automatizado e receberá neles erros.
  */

/** */
//Verifica campos vazios
  if(title === "" || url === "" || techs === "") {
    return response.status(400).json( { message: "Digite todos os campos solicitados." })
  }

//Verifica se o item já existe
  const repositoryIndex = repositories.findIndex(repoId => repoId.title === title );

  if(repositoryIndex !== -1 ) {
    return response.status(400).json({ error: 'Já existe um item com esse nome.' });
  }
  /** */

  repositories.push(repository);
 
  return response.status(201).json(repository);

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url , techs } = request.body;

  const repositoryIndex = repositories.findIndex(repoId => repoId.id === id );

  if(repositoryIndex < 0 ) {
    return response.status(400).json({ message: 'Esse repostório não foi encontrado ou não existe.' });
  }

  const repository = {
    id,
    title,
    url, 
    techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository;

  return response.status(201).json(repository);

});


app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repoId => repoId.id === id );

  if(repositoryIndex < 0 ) {
    return response.status(400).json({ error: 'Esse repostório não foi encontrado ou não existe.' });
  }
  
  repositories.splice( repositoryIndex , 1 )

  return response.status(204).send();

});


app.post("/repositories/:id/like", (request, response) => {
   
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repoId => repoId.id === id );

  if(repositoryIndex < 0 ) {
    return response.status(400).json({ error: 'Esse repostório não foi encontrado ou não existe.' });
  }

  repositories[repositoryIndex].likes++;

  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
