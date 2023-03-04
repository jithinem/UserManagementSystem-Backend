//importing db.js
const db=require('./db')

//importing json web token
const jwt=require('jsonwebtoken')

userDetails={
    "a":{id:"1",username:"a",email:"a",password:"a",security:"apple"}
}

const register=(email,username,password,question,answer)=>{
    return db.User.findOne({email}).then(
        user=>{
            if(user){
                return{
                    status:false,
                    statusCode:401,
                    message:"email id already exists"
                }
            }
            else{
                const newUser=new db.User({
                    userid:Math.floor(Math.random()*1000000000000000),
                    email:email,
                    username:username,
                    password:password,
                    securityQ:question,
                    answer:answer
                })
                newUser.save();
                return{
                    status:true,
                    statusCode:200,
                    message:"Registration successful"
                }
            }
        }
    )
}



const login=(email,password)=>{
    return db.User.findOne({email,password}).then(
        user=>{
            if(user){
                const token=jwt.sign({email:email},'superkey2023');
                return{
                    status:true,
                    statusCode:200,
                    message:"Login successful",
                    token:token,
                    email:user.email,
                    id:user.userid,
                    username:user.username,
                    question:user.securityQ
                }
            }
            else{
                return{
                  status:false,
                  statusCode:401,
                  message:"Invalid login credentials"
                }
              }
        }
    )
}

const editData=(email,emailNew,username)=>{
    return db.User.findOne({email}).then(
        user=>{
            if(user){
                user.email=emailNew
                user.username=username
                user.save();
                return{
                    status:true,
                    statusCode:200,
                    message:"Updation successful",
                    username:user.username,
                    email:user.email
                }
            }
            else{
                return{
                    status:false,
                    statusCode:401,
                    message:"Incorrect user credentials"
        
                }
            }        
        }
    )
}

const passwordEdit=(email,password,answer)=>{
    return db.User.findOne({email}).then(
        user=>{
            if(user){
                if(answer==user.answer){
                    user.password=password;
                user.save();
                  return{
                    status:true,
                    statusCode:200,
                    message:"Updation successful",
                    password:password
                  }
                }
                else{
                    return{
                        status:false,
                        statusCode:401,
                        message:"Incorrect security question's answer"
                    }
                }            
            }
            else{
                return{
                    status:false,
                    statusCode:401,
                    message:"Incorrect user credentials"
                }
            }     
        }
    )
}


module.exports={
    register,
    login,
    editData,
    passwordEdit
}