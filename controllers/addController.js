const AddRouter = require("express").Router();
const {addModel} = require("../models/addModel")
const {formvalidator} = require("../middlewares/formvalidator")

AddRouter.get("/",(req,res)=>{
    res.status(200).json({message:"Add router is working properly"});
})




AddRouter.post("/createadd",formvalidator,async(req,res)=>{
 let formdetail = req.body;
 try {
   let createform = new addModel(formdetail);
   await createform.save(); 
res.status(201).json({message:"add created successfully"})
 } catch (error) {
   console.log(`error while creating the add:error is ${error}`);
   res.status(500).json({message:"server error , please try again later"}); 
 }  
})


AddRouter.get("/category",async(req,res)=>{
let {category} = req.body;

try {
let add = await addModel.find({category});
res.status(200).json({add});
}
catch (error) {
  console.log(`error while finding the add by category: error is ${error}`);
  res.status(500).json({message:"server error , please try again later."})
}

})



AddRouter.get("/date/:sort",async(req,res)=>{
    let sortindex = req.params.sort;
    // 1 for ascending, -1 for descending;
    try {
    let add = await addModel.find().sort({postedAt:sortindex});
    res.status(200).json({add});
    }
    catch (error) {
      console.log(`error while sorting the add by date: error is ${error}`);
      res.status(500).json({message:"server error , please try again later."})
    }
    
    })





AddRouter.get("/name",async(req,res)=>{
    let {name} = req.body;
    console.log(name)
    try {
    let add = await addModel.find({"name":{$regex:`${name}`,$options:"i"}}).then((result)=>{
        res.status(200).json(result)
        console.log(result)
    }).catch((error)=>{
        if(error){
            console.log(`error while loading the add with name as${name} :error is ${error}`);
            res.status(500).json({message:"error while finding the add with name"})
        }
    })
    }
    catch (error) {
      console.log(`error while finding the add by name: error is ${error}`);
      res.status(500).json({message:"server error , please try again later."})
    }
    })
    
  AddRouter.get("/getadd/:pagenumber",async(req,res)=>{
   // we will require page number 
   let pagenumber = req.params.pagenumber; 
try {
    let adds = await addModel.find().skip(((pagenumber||1)-1)*4).limit(4);
    res.status(200).json({adds})
} catch (error) {
    console.log(`error while loading the data with pagination :error is ${error}`)
    res.status(500).json({message:"server error"});
}   
})  

AddRouter.delete("/deleteadd/:id",async(req,res)=>{
let id = req.params.id;
console.log(req.params.id)
//641c000ed75ed3dfb00831c9
if(id){
    try {
        let deleteAdd = await addModel.findByIdAndDelete(id);
        res.status(200).json({message:"successfully deleted"}); 
     } catch (error) {
         console.log(`error while deting the add with add id ${id} :error is ${error.message}`);
     }
}else{
    res.status(400).json({message:"plese send a valid id"})
}


})


module.exports = {AddRouter};