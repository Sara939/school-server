const express= require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const fs = require('fs');
app.use(cors());
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));


const names = ["sara", "lala", "tata", "baba", "mama", "jaja", "rara", "caca", "zaza", "yaya"];

const students = [
    {id: 0, firstname: "sara", lastname: "likaount", age : 30},
    {id: 1, firstname: "sara", lastname: "likaount" ,age : 30},
    {id: 2, firstname: "sara", lastname: "likaount" ,age : 30},
    {id: 3, firstname: "sara", lastname: "likaount" ,age : 30}
    ];

app.get('/', (req,res)=>{
    res.send("server working")
})

app.get('/names', (req,res)=>{
    res.send(`good ${names}`)

})

app.post('/names/newname', (req,res)=>{
    names.push(req.body.nameobj)
    res.send('success')
})

app.get('/students', (req,res)=>{
    res.send({massage: 'success', students})
})

app.post('/students/newstudent', (req, res)=>{
    students.push(req.body.student)
    res.send({massage: 'new student added'})
    
})

app.get('/byid/:id', (req, res)=>{
    const stu= students.find(stu=>stu.id == req.params.id)
    stu ? res.send(stu) : res.send("no")
      
})

app.post('/teachers/addteacher', (req,res)=>{
    fs.writeFile('tachers.json', JSON.stringify(req.body.teacher), (err)=>{
        if (err) return res.send(err)
        res.send("teacher add")
    }); 
})

app.get('/teachers', (req,res)=>{
    fs.readFile('tachers.json',{encoding: 'utf-8'},(err, data)=>{
        if (err) return res.send(err)
        res.send(data)
    })
})


app.put('/updatestudent/:id', (req, res)=>{
    const stutoupdate = students.find(student => student.id == req.params.id);
    stutoupdate ? (stutoupdate.age = req.body.newage , res.send(stutoupdate)) : res.send("id not exist");

})


app.listen(port, ()=>{
    console.log("working");
})

