const formvalidator = (req,res,next)=>{
 let {name,description,category,image,location,postedAt,price}   = req.body;
// now validate the field
// a small check is is that the field should not empty , right 
if(name&&description&&category&&image&&location&&postedAt&&price){
    next()
}else{
    res.status(400).json({message:"Bad request, please fill all fields correctly."})
}
}
module.exports = {formvalidator}