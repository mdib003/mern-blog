const User = require('./Schema/userSchema')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = express()
const mongodbUrl = "mongodb+srv://blogadmin:cG70ygiuDBa4BApc@blogcluster.xl9tzqz.mongodb.net/?retryWrites=true&w=majority"
const salt = 10


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
    try {
        await User.create({ userName, password: bcrypt.hashSync(password, salt), fullName })
        res.status(201).json({ check: true, msg: 'User created successfully' })
    } catch (err) {
        console.log(err)
        res.status(400).json({ check: false, msg: 'User already exists' })
    }
})

app.post('/v1/api/login', async (req, res) => {
    const { userName, password } = req.body
    const checkUser = await User.findOne({ userName })
    if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password)
        console.log(checkPassword)
        if (checkPassword) {
            res.status(200).json({ check: true, msg: 'User logged in successfully', pw: true, userExist: true })
        } else {
            res.status(400).json({ check: false, msg: 'Wrong password', pw: false, userExist: true })
        }
    } else {
        res.status(400).json({ check: false, msg: 'User not found', pw: false, userExist: false })
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
