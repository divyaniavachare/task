const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')

const register = async function (req, res) {
    let data = req.body
    let { name, email, password, phone } = data
    if(!name)res.send({msg:"please enter your name"})
    if(!email)res.send({msg:"please enter your email"})
    if(!password) res.send({msg:"please enter password"})
     if(!phone)res.send({msg:"please enter phone number"})
    let rounds = 10
    let hash = await bcrypt.hash(password, rounds)
    data.password = hash;
    let savedData = await userModel.create(data)
    res.send({ msg: savedData })
}


const login = async function (req, res) {
    let data = req.body
    let { email, password } = data
    console.log(data)
    let savedData = await userModel.findOne({ email: email })
   
    let passwordBody = savedData.password;
    console.log(passwordBody)
    let encryptPassword = await bcrypt.compare(password, passwordBody);
    if(!encryptPassword)
    res.send({msg:"wrong password"})
     else{
        res.send({ msg: "user login successfuly" });
        }
    }


module.exports = { register, login };