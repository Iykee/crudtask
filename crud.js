const express = require('express');
const app = express();
const port = 4000;

const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://iykezuridb:ADA168@cluster0.blb7f.mongodb.net/crudapp?retryWrites=true&w=majority';
app.use(express.json())

mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
},(err) => {
    if (err){
        console.log(err)
    }else{ console.log('connectiion sucessful')}
})
const crudSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String,
})
const Crud = mongoose.model('Crud', crudSchema)
//post request
app.post('/crud', function (req, res){
    const crud = req.body.crud;
    Crud.create({
        name: crud.name,
        email: crud.email,
        country: crud.country
    }, (err, newCrud) => { 
        if(err){
            return res.status(500).json({message: err})
        }else{
            return res.status(200).json({message: "sucessful", newCrud})
        
        }
    })
})
app.get('/crud/:id', (req, res)=> {
    Crud.findById(req.params.id, (err , crud) =>{
    if (err){
        return res.status(500).json({message:err})
   }
    else if (!crud){
        return res.status(404).json({message: "info not found"})

        }
    else{
        return res.status(200).json({crud})
    }
})
app.put('/crud/:id', (req, res) => {
    Crud.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        country:req.body.country
    },(err,crud)=>{
        if(err){
            return res.status(500).json({message:err})
        }else if(!crud){
            return res.status(404).json({message:"info not found"})
        }else{
            crud.save((err, savedcrud)=>{
                if(err){
                    return res.status(400).json({message:err})

                }else{
                     return res.status(200).json({message: "updated"})
                
                }
                
                    
                });
            }

})
        

})
})
app.delete('/crud/:id', (req,res)=>{
    Crud.findByIdAndDelete(req.params.id,(err, crud)=>{
        if(err){
            return res.status(500).json({message:err})

        }
        else if(!crud){
        return res.status(404).json({message:"info not found"})
    }
    else{
        return res.status(200).json({message:"deleted"})
    
    }
    })
})
app.listen(port,() => console.log('app listening on port ${port}'));
