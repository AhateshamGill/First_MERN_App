const mongoose = require('mongoose');
 
const shamSchema = mongoose.Schema({
    
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    sham:{
        type:String,
        required:[true, 'Please Fill the Requried Fields'],
    },
},{
    timestamps:true,
}
);




module.exports = mongoose.model('Sham',shamSchema);