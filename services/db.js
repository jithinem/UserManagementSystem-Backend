//server-mongodb integration
//importing mongoose
const mongoose=require('mongoose');

//state connection string via mongoose
mongoose.connect('mongodb://localhost:27017/UserManagementSystem',{
    useNewUrlParser:true
})

//defining a model
const User=mongoose.model('User',{
    userid:Number,
    email:String,
    password:String,
    username:String,
    securityQ:String,
    answer:String 
})

module.exports={
    User
}