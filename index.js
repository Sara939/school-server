const express= require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const fs = require('fs');
const { send } = require('process');
app.use(cors());
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));


const names = ["sara", "lala", "tata", "baba", "mama", "jaja", "rara", "caca", "zaza", "yaya"];

const students = [
    {id: 0, firstname: "sara", lastname: "likaount", age : 30},
    {id: 1, firstname: "lala", lastname: "likaount" ,age : 20},
    {id: 2, firstname: "bela", lastname: "likaount" ,age : 40},
    {id: 3, firstname: "nina", lastname: "likaount" ,age : 50}
    ];

const courses= [
    {id: 10, courseName: "religon" , description: "fun", img: ""},
    {id: 20, courseName: "science" , description: "fun", img: ""},
    {id: 30, courseName: "computers" , description: "fun", img: ""}
];

app.get('/', (req,res)=>{
    res.send("server working")
})

app.get('/names', (req,res)=>{
    res.send(`good ${names}`)

})

app.post('/names', (req,res)=>{//can use same endpoint for diffrent method
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

app.get('/students/:id', (req, res)=>{
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
    const stuToUpdate = students.find(student => student.id == req.params.id);
    stuToUpdate ? (stuToUpdate.age = req.body.newage , res.send(stuToUpdate)) : res.send("id not exist");
    // Object.assign(stutoupdate, {age:req.body.newage })
})

app.delete('/students/deletestudent/:id', (req,res)=>{
    const stuToDeleta= students.find (student=>student.id == req.params.id);
    if (stuToDeleta){
        const studentIndex = students.indexOf (stuToDeleta);
        students.splice(studentIndex,1); 
        // students.slice(studentIndex,studentIndex+1);  // after change same array, return the deleted slice
        // res.send(students); // diffrent array after change, returns the deleted splice
        res.send(students);
    } else{
        res.send("id not exist")
    }
});

app.get('/courses', (req,res) => {
    res.send({massage: "sucsess",  courses})
});

app.get('/courses/:id', (req,res) => {
    const courseToDisplay= courses.find( obj => obj.id == req.params.id)
    courseToDisplay ? res.send(courseToDisplay) : res.send("id incoorect, course not found");
});


app.post('/courses/create', (req, res)=>{
    courses.push(req.body.newCourse);
    res.send({massage: "course added sucssesfully", courses})
});

app.put('/courses/edit/:id', (req,res) =>{
    let courseId= courses.find(course=> course.id == req.params.id);
    courseId ? ( Object.assign (courseId, req.body.update) , res.send({massage: "Information updated!" , courses}))
    : res.send("id incoorect, course not found")
});

app.delete('/courses/remove/:id', (req,res)=>{
    const startIndex= indexOfItem (courses,req);
    courses.splice(startIndex,1)
    res.send({massage: 'yay', courses})
});













app.listen(port, ()=>{
    console.log("working");
})

function indexOfItem (array,req){
    const foundIndex= array.find( item => item.id == req.params.id);
    if (foundIndex){
        const startIndex= array.indexOf(foundIndex);
        return startIndex
    } else{
        console.log("not found");
    }
}


// function findObjectbyReqId(array, req){
//     const objId= array.find( obj => obj.id == req.params.id)
//     objId ? objId : console.log("not found");
// }