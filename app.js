const express = require('express');
const app = express();

const pool = require("./db");
const fs = require('fs');

app.use(express.json())

// Function to enter logs
function logFileEntry(data) {
    try {
        if(fs.existsSync('log.txt')) {
            console.log("The file exists.");
            fs.appendFileSync('log.txt', data)
        } else {
            console.log('The file does not exist.');
            fs.writeFileSync('log.txt', data)
        }
    } catch (err) {
        console.error(err);
    }
}

// Routes
app.get('/', (req, res) => {
    res.send({
        "name" : "me"
    })
})


app.post('/department', async (req, res) => {
    try {
        const { dno, name} = req.body;
        const newDepartment = await pool.query("INSERT INTO department (dno, name) VALUES ($1, $2)", [dno, name]);
        logFileEntry("Added Department to Database Successfully")
    } catch (error) {
        console.log(error)
        logFileEntry("Error while adding department in database")
    }
})

app.put('/department/:dno', async (req, res) => {
    try {
         const name = req.body;
        const updatedDepartment = await pool.query("UPDATE department SET name = $2 WHERE dno=$1", [req.params.dno, name]);
        console.log(updatedDepartment)
        logFileEntry("Updated Department to Database Successfully")
    } catch (error) {
        logFileEntry("Error while updating department in database")
    }
})

app.delete('/department/:dno', async (req, res) => {
    try {
        const deletedDepartment = await pool.query("DELETE FROM department WHERE dno=$1", [req.params.dno]);
        logFileEntry("Deleted Department to Database Successfully")
    } catch (error) {
        logFileEntry("Error while deleting department in database")

    }
})

app.post('/employe', async (req, res) => {
    try {
        const { id, name, address, works_in} = req.body;
        const newEmploye = await pool.query("INSERT INTO employ (id, name, address, work_in) VALUES ($1, $2, $3, $4)", [id, name, address, works_in]);
        logFileEntry("Added Employe to Database Successfully")

    } catch (error) {
        logFileEntry("Error while adding employe in database")
    }
})

app.put('/employe/:id', async (req, res) => {
    try {
        const { name, address, works_in} = req.body;
        const updatedEmploy = await pool.query("UPDATE employ SET name = $2, address= $3, work_in= $4 WHERE id=$1", [req.params.id, name, address, works_in]);
        logFileEntry("Updated Employe to Database Successfully")
    } catch (error) {
        logFileEntry("Error while update employe in database")
    }
})

app.delete('/employe/:id', async (req, res) => {
    try {
        const deletedEmploy = await pool.query("DELETE FROM employ WHERE id=$1", [req.params.id]);
        logFileEntry("Deleted Employe from Database Successfully")
       
    } catch (error) {
        logFileEntry("Error while deleting employe in database")
        
    }
})

app.listen(3000, () => {
    console.log("Started server at port 3000");  
})