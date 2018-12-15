let express = require('express');
let bodyParser = require('body-parser');

let app=express();

let port=3000;

    let todos=[
        {
            id:1,
            description:'Meet Me for lunch',
            completed:false
        },
        {
            id:2,
            description:'Meet Me for lunch',
            completed:false
        },
        {
            id:3,
            description:'Meet Me for lunch',
            completed:true
        }
    ];

let finalTodoId=todos[todos.length-1].id;

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('Hello Todo app');
});


//GET /todos
app.get('/todos',(req,res)=>{
    //res.send(todos)
    res.json(todos);
});

//GET todos/:id
app.get('/todos/:id',(req,res) => {

    let todoId=parseInt(req.params.id);

    let matchedTodo=todos.filter((todo) =>{
        return todo.id === todoId;
    });
    if(matchedTodo.length > 0){
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});

//POST /todos

app.post('/todos', (req,res) =>{

    let body = req.body;
    body.id = finalTodoId+1;
    todos.push(body);
    res.json(body);
});

//Delete

app.delete('/todos/:id', (req, res) => {
    let deletedId = parseInt(req.params.id);
    let index=todos.findIndex((todo) => todo.id === deletedId);
    if(index !== -1){
        todos.splice(index,1);
        res.status(204);
        //res.json(todos);
    } else {
        res.status(404).json({"Error:":"no Todo found with that Id"});
    }
});

//Put
app.put('/todos/:id', (req,res) =>{

    let body=req.body;
    let putId = parseInt(req.params.id);
    let index=todos.findIndex((todo) => todo.id === putId);
    console.log(index);
    console.log(body);

    if(index !== -1 /*&& body.hasOwnProperty('completed') && body.hasOwnProperty('description')*/){
        todos[index].description=body.description;
        todos[index].completed=body.completed;
        res.json(todos[index]);
    } else {
        res.status(404).json({"Error:":"no Todo found with that Id"})
    }
})

app.listen(3000,()=> console.log(`app listen to ${port}`));