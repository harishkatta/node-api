var express=require('express');
var app=express();
const port=3000;
let middleware=require('./middleware/middleware.js');

app.use(middleware.logger);

app.get('/',(req,res) => {
	res.send('Hello Express');
});

app.get('/about',(req,res)=> {
	res.send('About Tab');
});

app.post('/user',(req,res) =>{
	res.send('POST request to the homepage');
});

let dir='F:/WorkSpaces & Materials/node-api'+'/'
console.log(__dirname) //F:\WorkSpaces & Materials\node-api
//but we need F:/WorkSpaces & Materials/node-api/

app.use(express.static(dir));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
