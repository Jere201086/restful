const express = require('express');
const app = express();
const data = require('./data.json')


// Verbos HTTP
// GET - Recebe dados de um Resource
// POST - Envia dados ou informações para serem processados por um Resource.
// PUT - Atualizar os dados de um Resource
// DELETE - Deletar um Resource
app.use(express.json());

app.get("/clients", function(req, res){
    res.json(data);
});

app.get("/clients/:id", function(req, res){
    const { id } = req.params
    const client = data.find(cli=> cli.id == id)

    if (!client) return res.status(404).json();

    res.json(client)
});


app.post("/clients", function(req, res){
    const { name, email } = req.body;
    //salvar
    res.json({name, email})
});


app.put("/clients/:id", function(req, res){
    const { id } = req.params;
    const client = data.find(cli=> cli.id == id);

    if (!client) return res.status(404).json();
    const { name } = req.body;

    client.name = name;
    res.json(client)
});


app.delete("/clients/:id", function(req, res){
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id != id);

    res.json(clientsFiltered);

});

app.listen(3000, function(){
    console.log('Server is running on http://localhost:3000');
})
