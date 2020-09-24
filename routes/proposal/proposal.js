

let express = require("express"),
middleware = require("../../middleware"),
router = express.Router(),
Proposal = require('../../models/proposal'),
Job = require('../../models/job');

router.post("/accept/:id", middleware.isLoggedIn, function (req, res) {
      Proposal.findOneAndUpdate({_id:req.params.id},{$set:{'status': "Accepted"}},function(err,updateditem){
        Job.updateOne({ _id:updateditem.job.id},{ $inc: { 'hiredCount': 1 }},function(err,updateditem){
          // console.log(updateditem.proposals);
          // if(!err)
          // {
          //   console.log("testing output!!!!!!!!!!!!!!"+updateditem)
          req.flash("success","Succesfully accepted proposal!!");
        console.log("<------------------------------------updateditem---------------------------------->")
        res.redirect("back");
          // }
        })
         
      })

})
router.post("/reject/:id", middleware.isLoggedIn, function (req, res) {

    Proposal.findOneAndUpdate({_id:req.params.id},{'status': "Rejected"},function(err,updateditem){
      Job.updateOne({ _id:updateditem.job.id},{ $inc: { 'rejectedCount': 1 }},function(err,updateditem){
        
        req.flash("error","Rejected a proposal!!");
        res.redirect("back"); 
    
      })
       
    })
      
})

module.exports = router;