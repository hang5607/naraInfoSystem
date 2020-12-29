const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

// const multer = require('multer');
// const upload = multer({dest:'./upload'})

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();


app.get('/api/grammars',(req,res) => {
    connection.query(
        'select * from grammar where isDeleted = 0',
        (err,rows,fields) => {
            res.send(rows);
        }
    )
});

//app.use('/image', express.static('./upload'));

//file 필요시
//app.post('/api/grammars', upload.single('image) ,(req,res) => {
app.post('/api/grammars', (req,res) => {
    let sql = 'insert into grammar values(null,?,?,?,now(),0)';
    let content = req.body.content;
    let comment = req.body.comment;
    let check = req.body.check;
    let params = [content,comment,check];
    
    connection.query(sql,params,
        (err,rows,fields) => {
            res.send(rows);
        } 
    );
});

app.delete('/api/grammars/:id', (req,res)=> {
    let sql = 'update grammar set isDeleted = 1 where id = ?';
    let params = [req.params.id];
    connection.query(sql,params,
        (err,rows,fields) => {
            res.send(rows);
        }
        ); 
})

app.listen(port, ()=> console.log(`Listening on port ${port}`));