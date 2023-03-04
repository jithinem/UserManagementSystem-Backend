//importing express
const express=require('express');

//importing json web token
const jwt=require('jsonwebtoken')

//importing cors to establish connection between frontend, backend, and mongodb
const cors=require('cors');


//creating an app using express
const app=express();

//specifying origin to the user using cors
app.use(cors({
    origins:'http://localhost:4200'
}))



//connection between index and dataService
const dataService=require('./services/dataService');

//for json to js conversion
app.use(express.json())


//creating a port number
app.listen(3000,()=>{
    console.log('listening to port 3000');
})

//router specific middlware
const jwtRouterMiddleware=(req,res,next)=>{
    try{
        console.log('router specific middleware');
        // const token=req.body.token;
        const token=req.headers('x-access-token');
        const data=jwt.verify(token,'superkey2023');
        console.log(data);
        next();
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'please login first'
        })
    }
}

app.post('/register',(req,res)=>{
        dataService.register(req.body.email,req.body.username,req.body.password,req.body.question,req.body.answer).then(
            result=>{
                res.status(result.statusCode).json(result);
            }
        )
})

app.post('/login',(req,res)=>{
    dataService.login(req.body.email,req.body.password).then(
        result=>{
            res.status(result.statusCode).json(result);
        }
    )
})

app.patch('/editData',(req,res)=>{
    dataService.editData(req.body.emailOld,req.body.emailNew,req.body.username).then(
        result=>{
            res.status(result.statusCode).json(result);
        }
    )
})

app.patch('/passwordEdit',(req,res)=>{
    dataService.passwordEdit(req.body.email,req.body.password,req.body.answer).then(
        result=>{
            res.status(result.statusCode).json(result);
        }   
    )
    console.log(req.body.email); 
        console.log(req.body.password); 
            console.log(req.body.answer); 
})
