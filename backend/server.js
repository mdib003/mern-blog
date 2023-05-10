const User = require('./Schema/userSchema')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const mongodbUrl = "mongodb+srv://blogadmin:cG70ygiuDBa4BApc@blogcluster.xl9tzqz.mongodb.net/?retryWrites=true&w=majority"


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json())
/* app.use(express.urlencoded({ extended:true })) */


app.get('/v1/users', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send(user)
})

app.post('/v1/users', async (req, res) => {
    const user = await User.create(req.body)
    res.send(user)
})

app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    res.send(user)
})

app.delete('/users/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.send(user)
})

app.post('/v1/api/register', async (req, res) => {
    const { fullName, userName, password } = req.body
    const existingUser = await User.find({ userName })
    
    if (existingUser.length > 0) {       
        res.status(400).json({ check: false, message: 'User already exists' })
    } else {       
        User.create({ userName, password, fullName })
        res.status(201).json({ check: true, message: 'User created successfully' })
    }
})


const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(mongodbUrl, connectionParams)
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is running on port 5000')
        })
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
