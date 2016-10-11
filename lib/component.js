/**
 * Created by mohit on 11/10/16.
 */

Images_mongo=new Mongo.Collection("images");

//set up security for Images_monogo collcetion
Images_mongo.allow({
insert:function(userId,doc)//userId is here the ID of the current user and doc is the object of Images_mongo.
{
//console.log("Security test");
if(Meteor.user())
{
if(userId!=doc.createdBy)//they are messing arround... xD
{
return false;
}
else//userid and createdby is valid
return true;
}

else//user not logged in
return false;
},
remove:function()
{
return true;
},
update:function(userID,doc)
{
//console.log(userID+"   kk     "+doc._id+" "+());
if(userID)
return true; 
else
return false;
}


});
