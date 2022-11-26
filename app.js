const express=require('express')
const cors=require('cors')
const logger=require('morgan')
const mongoose=require('mongoose')
const booksModel = require('./models/books')
const path = require('path');


const app=new express()
app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('./dist/frontend'));
const port=process.env.port || 3000;

mongoose.connect("mongodb+srv://anupamamt:anupama2000@cluster0.nfdclmf.mongodb.net/LibraryDB?retryWrites=true&w=majority")

app.post('/api/api/addNewBook',async (req,res)=>{
    let data=req.body
    const book=new booksModel(data)
    await book.save((error,dbdata)=>{
        if(error){
            res.json(error)
        }
        else{
           res.json(dbdata)
        }
    })
})

app.get('/api/api/viewBooks',async (req,res)=>{
    booksModel.find((error,dbdata)=>{
        if(error){
            res.json(error)
        }
        else{
           res.json(dbdata)
        }
    })
})

app.put('/api/api/bookUpdate/:id',async (req,res)=>{
    let data=req.body
    await booksModel.findOneAndUpdate({"_id":req.params.id},data)
    res.send(data)
 })

 app.get('/api/findBook/:id',(req,res)=>{
    booksModel.findOne({"_id":req.params.id},(error,dbdata)=>{
        if(error){
            res.json(error)
        }
        else{
           res.json(dbdata)
        }
    })
})

app.delete('/api/api/deleteBook/:id',(req,res)=>{
    booksModel.remove({"_id":req.params.id},(err,data)=>{
      if(err){
        res.send("The error is "+err)
      }
      res.json("deleted")
    })
  })

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
   });
app.listen(port,()=>{
    console.log("server is running")
})