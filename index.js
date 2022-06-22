//server creation

//1. import express

const express= require('express')
const { verify } = require('jsonwebtoken')

// import jsonwebtoken
const jwt =require('jsonwebtoken')



//import data service

const dataService =require('./services/data.service')
//server appliccation create using express

const app = express()

//parse JSON data

app.use(express.json())

//application specific middleware

const appMiddleware= (req,res,next)=>{
    console.log("application specific middleware");
    next()
}

//use middleware in app
app.use(appMiddleware)


//bank server


const jwtMiddleware =(req,res,next)=>{
    //fetch token
   try {token=req.headers[x-access-token]
    // verify token
  const data=  jwt.verify(token,'supersecretkey12345')
  console.log(data);
  next()}
  catch{
    res.status(401).json({
        status:false,
        status:401,
        message:"please log in "
    })
  }
}

// -----------------------------------------------------

//register API
app.post('/register',(req,res)=>{

//register solving
console.log(req.body);
const result = dataService.register(req.body.username,req.body.acno,req.body.password)
res.status(result.statusCode).json(result)
})

// -----------------------------------------------------

//login api

app.post('/login',(req,res)=>{

    //login solving
  
    const result = dataService.login(req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)
    })

// -----------------------------------------------------    

    //deposit api

app.post('/Deposit',jwtMiddleware,(req,res)=>{

    //deposit solving
   
    const result = dataService.Deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result)
    })

// -----------------------------------------------------

    //withdrawal api

    app.post('/withdrawal',jwtMiddleware,(req,res)=>{

    //withdrawal solving
  
        const result = dataService.withdrawal(req.body.acno,req.body.password,req.body.amt)
        res.status(result.statusCode).json(result)
        })

// -----------------------------------------------------

    //get transaction api

    app.post('/transaction',jwtMiddleware,(req,res)=>{

    //get transaction solving
  
        const result = dataService.getTransaction(req.body.acno)
        res.status(result.statusCode).json(result)
        })

// -----------------------------------------------------


//user request resolving

//get request
app.get('/',(req,res)=>{
    res.send('GET REQUEST')
})

//post request

app.post('/',(req,res)=>{
    res.send('POST REQUEST')
})

//put request

app.put('/',(req,res)=>{
    res.send('PUT REQUEST')
})

//delete

app.delete('/',(req,res)=>{
    res.send('DELETE REQUEST')
})

//patch

app.patch('/',(req,res)=>{
    res.send('PATCH REQUEST')
})




//set up port number to the server app

app.listen(3000,()=>{
    console.log("server started at 3000");
})