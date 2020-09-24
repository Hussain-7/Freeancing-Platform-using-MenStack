var mongoose = require('mongoose');
var jobSchema = new mongoose.Schema({
   jobdetail:{
    jobTitle: String,
    jobCategory: String,
    jobLevel: String,
    budget: String,
    description: String,
    duration: Number,
    skills: String,
    views:{
        type:Number,default:0
    },
   },
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        username:String,
    },
    proposals:{
        id:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Proposal",
          }]
    },
    // hired:{
    //     id:[{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"User",
    //     }]
    // },
    hiredCount:{
        type:Number,default:0
    },
    rejectedCount:{
        type:Number,default:0
    },
    posted_At:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Job", jobSchema);