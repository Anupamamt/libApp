const mongoose=require('mongoose')

const booksSchema=mongoose.Schema({
    bookName:{
        type:  String,
      required:true},
      description:{
          type:  String,
        required:true},
      count:{
          type:  String,
        required:true},
        author:{
            type:  String,
          required:true},
})

var booksModel=mongoose.model("books",booksSchema)

module.exports=booksModel