const express = require('express');

const app = express();

app.use(express.json());

//Query params = ?nome=nodeJS
//Route Params = /curso/2
//Request Body = { nome: 'nodeJS', tipo: 'Backend' }


const cursos = ['node.js', 'JavaScript', 'React Native']

//Middleware Global
app.use((req, res, next)=>{
    console.log('testando');

    return next();
});


function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: 'nome do curso obrigatório'});
    }
    
    return next();
}

function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index];
    
    if(!curso){
        return res.status(400).json({ error: "Bad request! "})
    }

    req.curso = curso;
    return next();
}

//Listagem de todos os cursos
app.get('/curso', (req, res) =>{
    return res.json(cursos);
});


//Listagem de 1 curso
app.get('/curso/:index',checkIndexCurso, (req, res) => {
    const { index } = req.params;
    return res.json(cursos[index]);
});

//Criar curso
app.post('/curso', checkCurso, (req, res) => {
    const {name} = req.body;
    cursos.push(name);

    return res.json(cursos)
});

//Atualizando um curso
app.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
});


//Excluindo um curso
app.delete('/cursos/:index',checkIndexCurso, (req, res) => {
    const { index } = req.params;
    
    cursos.splice(index, 1);

    return res.json(cursos)
});

//Função de rodar
app.listen(3001, () => {
    console.log("Executando")
});