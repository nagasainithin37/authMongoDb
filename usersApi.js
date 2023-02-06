const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

const expressAsyncHandler=require('express-async-handler')

userApp.use(exp.json())

userApp.post('/createUser',expressAsyncHandler(async (req,res)=>{

    const authObj=req.app.get('authObj')
    let password=await bcryptjs.hash(req.body.password,5)

    //Search if username is already existed
    let result=await authObj.findOne({username:req.body.username})
    console.log(result)
    if(result!=null){
        res.send({message:`${req.body.username} is already present try with other username`})
    }
    else{
        await authObj.insertOne({"username":req.body.username,"password":password})
        res.send({message:`User created Succesfully`})
    }

    
}))


userApp.post('/login',expressAsyncHandler(async(req,res)=>{
 
    const authObj=req.app.get('authObj')
    let obj=await authObj.findOne({username:req.body.username})
    if(obj==null){
        res.send({message:`No User exists with ${req.body.username}`})
    }
    else{
        let status=await bcryptjs.compare(req.body.password,obj.password)
     
        if(status===false){
            res.send({message:'Wrong Password try again'})
        }
        else{
            let token=jwt.sign({username:req.body.username},'abcde',{expiresIn:600})

            res.send({message:'login Succes',payload:token,userDetails:obj})
        }
    }

}))

module.exports=userApp
