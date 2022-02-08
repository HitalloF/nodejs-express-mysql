const express = require('express')
const mysql = require('mysql')
const app = express()
const bodyParser = require('body-parser')

 

app.use(bodyParser.json())

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hitallo",
    multipleStatements: true
})


mysqlConnection.connect((err)=>{
    if(!err)
        console.log("DB Connection  succeded")
    else
        console.log("DB conecntion falied \n errps : ", + JSON.stringify(er,undefined,2))
})

app.listen(3000,()=>console.log("express server running at port 3000"))




// Listar todos!

app.get('/usuarios',(req,res) => {
mysqlConnection.query(`SELECT * FROM usuario`,(err,rows,fields)=>{
    if(!err)
        res.send(rows)
    else
    console.log(err)

    })
})

// listar por id
app.get('/usuario/:id', (req, res)=>{
    mysqlConnection.query('SELECT * FROM usuario WHERE ID = ?',[req.params.id],(err, rows,fields)=>{
        if(!err)
        res.send(rows)
        else 
        console.log(err )
    } )
})

// deletar usuario

app.delete('/usuario/:id', (req, res)=>{
    mysqlConnection.query('DELETE FROM usuario WHERE ID = ?',[req.params.id],(err, rows,fields)=>{
        if(!err)
        res.send("Deletado com sucesso")
        else 
        console.log(err )
    } )
})

// criar usuario

app.post('/usuarios',(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const sql = `INSERT INTO usuario(nome, email) VALUES('${nome}','${email}')`
    mysqlConnection.query(sql,function(err){
        if(err){
            console.log(err)
        }
        res.send("Crete at sucesses")
    })
})