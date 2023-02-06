const exp=require('express')
const app=exp()

const userApp=require('./usersApi')
const mClient=require('mongodb').MongoClient
const DBurl='mongodb+srv://nagasainithin:nithin1239@cluster0.vdj3e.mongodb.net/?retryWrites=true&w=majority'

mClient.connect(DBurl)
.then((client)=>{
    console.log("Connection successful")

    const DbObj=client.db('demo')
    const authObj=DbObj.collection('auth')

    app.set('authObj',authObj)
})
.catch(err=>console.log(`error occured ${err.message}`))


app.use('/users',userApp)

//Invalid requests
app.use((req,res,next)=>{
    res.send({message:`Invalid url ${req.url}`})
})

// Error handling
app.use((err,req,res,next)=>{
    res.send({message:`error occured ${err.message}`})
})
app.listen(3000,()=>{console.log("Server is listining")})