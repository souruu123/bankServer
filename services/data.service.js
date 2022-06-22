// import jsonwebtoken
const jwt =require('jsonwebtoken')



// DataBase
db = {
    1000:{"acno":1000,"username":"Neer","password":1000,"balance":5000,transaction:[]},
    1001:{"acno":1001,"username":"lalish","password":1001,"balance":5000,transaction:[]},
    1002:{"acno":1002,"username":"kiran","password":1002,"balance":3000,transaction:[]}
  
  }


  //regiser

  var register=(username,acno,password)=>{

  
    if(acno in db ){
      return {
        status:false,
        message:"already registered ...... please log in !!",
        statusCode:401
      }
    }
    else{
      //insert in database
      db[acno]={
        acno,
        username,
        password,
        "balance":0,
        transaction:[]
      }
      console.log(db);

      
      return {
        status:true,
        message:"registered successfully",
        statusCode:200
    }

  }
}

//login

const login=(acno,pswd)=>{
   


    if(acno in db){
      if(pswd == db[acno]["password"]){
       currentUser= db[acno]["username"]
       currentAcno= acno
        // token generate
     token =   jwt.sign({
          //store account number inside token
          currentAcno:acno
        },'supersecretkey12345')

       return {
        status:true,
        message:"login successfull",
        statusCode:200,
        currentUser,
        currentAcno,
        token
    }
  
      }
      else{
        
        return {
          status:false,
          message:"incorrect password",
          statusCode:401
        }
      }
    }
    else{
      alert("user does not exist!!!!")
      return {
        status:false,
        message:"user does not exist!!!!",
        statusCode:401
      }
    }


  }

//deposit

  const Deposit=(acno,password,amt)=>{

    var amount=parseInt(amt)
  
    if(acno in db){

      if (password == db[acno]["password"]){

        db[acno]["balance"]+=amount
        db[acno].transaction.push({
          type:"CREDIT",
          amount:amount
        })
        console.log(db);
        return {
          status:true,
          message:amount+ "Deposit successfully... new balance is " +db[acno]["balance"],
          statusCode:200
      }
     
    
      }
      else{
        return {
          status:false,
          message:"incorrect password",
          statusCode:401
        }
      }
    }
    else{
      return {
        status:false,
        message:"user does not exist!!!!",
        statusCode:401
      }
    }
  }

   //withdrawal

   const withdrawal=(acno,password,amt)=>{
    var amount=parseInt(amt)

    if(acno in db){

      if (password == db[acno]["password"]){

        if (db[acno]["balance"]>amount) {

          db[acno]["balance"]-=amount
          db[acno].transaction.push({
            type:"DEBIT",
            amount:amount
          })
        
          return {
            status:true,
            message:amount+ "debitted successfully... new balance is " +db[acno]["balance"],
            statusCode:200
        }
        
          
        }
      else {
      
        return {
          status:false,
          message:"insufficent balance",
          statusCode:402
        }
      }

      }
      else{
      
        return {
          status:false,
          message:"incorrect password",
          statusCode:401
        }
      }
    }
    else{
      return {
        status:false,
        message:"user does not exist!!!!",
        statusCode:401
      }
    }
  }

  const getTransaction=(acno)=>{
 
    if (acno in db) {
        
    return {
    status:true,
    statusCode:200,
     transaction:db[acno].transaction
    }
  }
    else{
      return {
        status:false,
        message:"user does not exist!!!!",
        statusCode:401
      }
    
    }

     
   }

// export

module.exports={
    register,
    login,
    Deposit,
    withdrawal,
    getTransaction
}