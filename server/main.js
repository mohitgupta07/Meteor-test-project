/*import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup
});*/

Meteor.startup(function()
{
if(Images_mongo.find().count()==0)
{
for(var i=1;i<=22;i++)
{
		Images_mongo.insert( {
	     		 img_src:"img_"+i+".jpg",
		      img_alt:"image no."+i 
   					});	
		}
}
}

);
