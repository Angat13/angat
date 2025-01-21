const Person = require('../models/Person')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
      const data = req.body
      const NewPerson = Person(data)
     const response = await NewPerson.save()
      console.log(NewPerson)
      res.status(200).json(response)
    }
    catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        res.status(400).json({ error: "Email is already taken" })
      }
      else {
        res.status(500).json({ error: "Internal Error" })
      }
    }
  })
  
  
  //Get Method for Read Operation
  
  router.get("/", async (req,res)=>{
    try{
    const data =  await Person.find()
    res.status(200).json(data)
    console.log("Data has been read successfully")
  }catch(error){
    res.status(400).json({error:"some issues "})
  
  }
  })
  
  
  //Params 
  router.get("/:WorkType", async (req,res)=>{
    const WorkType=req.params.WorkType;
    try{
    if (WorkType==="waiter"|| WorkType==="chef"|| WorkType==="worker"){
      const response= await Person.find({work:WorkType})
      res.status(200).json(response)
  }
    else{
         res.status(400).json("invalid work Type")
    }}
  
    catch(err){
         res.status(500).json("internal server error")
    }
  })
//Updating user
  router.put("/:id", async (req, res) => {
    try {
        const PersonId = req.params.id; // Extract the ID from the route parameter
        const updatedData = req.body;  // Data to update the record with

        const check = await Person.findByIdAndUpdate(PersonId, updatedData, {
            new: true,           // Return the updated document
            runValidators: true, // Run schema validators
        });

        if (!check) {
            // If no document is found, send a 404 response
            return res.status(404).json({ message: "Data not found" });
        }

        // If everything is fine, send the updated document
        res.status(200).json(check);
    } catch (error) {
        // Send a 500 error response with the error message
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

//Deleting User
router.delete("/:id", async(req,res)=>{
  try{
   const id = req.params.id

   const check = await Person.findByIdAndDelete(id)
   if(!check){
    res.status(400).json("User not found")
   }
   res.status(200).json('User deleted successfully')
}
 catch (err){
   res.status(500).json('Internal error')
}

})



  

 module.exports = router