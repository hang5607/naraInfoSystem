const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/api/grammars',(req,res) => {
    res.send([
        {
            'id': 1,
            'content': '문법 내용1',
            'comment': '문법 코멘트1',
            'check': 'Y'
        },
        {
            'id': 2,
            'content': '문법 내용2',
            'comment': '문법 코멘트2',
            'check': 'N'
        },
        {
            'id': 3,
            'content': '문법 내용3',
            'comment': '문법 코멘트3',
            'check': 'Y'
        }
    ]);
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));