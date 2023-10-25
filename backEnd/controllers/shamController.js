const AsyncHandler = require('express-async-handler');
const Sham = require('../models/ShamModel');
// add the sham 
const addSham = AsyncHandler(async(req, res) => {
    const sham = req.body.sham;
    // console.log(sham);
    if(!sham) {
        res.status(400);
        throw new Error("Please Fills the Empty Fields");
    }
    const mySham = await Sham.create({
        sham,
        user:req.user._id,
    });
        res.status(200).send(mySham);
});
// get the sham
const getSham = AsyncHandler(async(req, res) => {
    const sham = await Sham.find({user:req.user.id});
    res.status(200).send(sham);
});
// update sham
const updateSham = AsyncHandler(async(req, res) => {
    const id = req.params.id;
    const findSham = await Sham.findById(id);
    if(!findSham){
        res.status(404);
        throw new Error('Sham Is Not Found');
    }else{
        const updatedSham = await Sham.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.status(201).send(updatedSham); 
    }
    res.status(200).json({
        Data: `Your Data is Updated on id ${id} Successfully!`
    });
});
// delete sham
const deleteSham = AsyncHandler(async(req, res) => {
    const id = req.params.id;
    if(!id){
        throw new Error("User ID IS Required");
    }
    const findSham = await Sham.findById(id);
    if(!findSham){
        res.status(404);
        throw new Error("Sham is Not Found By ID");
    }else{await findSham.deleteOne();}
    res.status(200).json({
        Data: `Your Data is deleted on id ${id} Successfully!`
    });
});
const getUser = (req, res) => {
    res.status(200).json({
        Data: "User Retrieved Successfully!"
    });
};





module.exports = {
    addSham,
    getSham,
    updateSham,
    deleteSham,
    getUser,
}