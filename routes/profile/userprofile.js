var express = require("express");
var router = express.Router();
var passport = require("passport"),
User = require('../../models/user');
Job = require('../../models/job');

var middleware=require("../../middleware");


router.get("/:id",middleware.isLoggedIn,middleware.checkCommentOwnership, function (req, res) {    
    User.findById(req.params.id).populate("userDetail.hirerDetail.posts").populate({path :"userDetail.freelancerDetail.proposals",populate:{path:"job.id"}}).exec(function(err,User){
        if(err)
        {
            console.log(err)
        }
        else{
           
            if(User.isHirer)
            {
                res.render("hirerProfile",{currentUser:User})
            }
            else
            {
                // User.populate("userDetail.freelancerDetail.proposals.job").exec(function(err,founduser){
                    console.log(User.userDetail.freelancerDetail.proposals[0]);
                    res.render("freelancerProfile",{currentUser:User})
                // })
               
            }         
        }
    })
});

module.exports = router;