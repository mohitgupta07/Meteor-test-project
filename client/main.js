/*import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';*/
//Images_mongo=new Meteor.Collection("images");


//--routing part over here---//

Router.configure({
layoutTemplate:'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome',{
to:"main"
});
});


Router.route('/images',function(){
this.render('images',{to:"main"});
this.render('navbar',{to:"navbar"});
});

Router.route('/image/:_id',function(){
this.render('showimage',{to:"main",data:function(){
return Images_mongo.findOne({'_id':this.params._id});
}});
this.render('navbar',{to:"navbar"});
});


//---routing ends here---//



//----login configuration---//
  Accounts.ui.config({passwordSignupFields:"USERNAME_AND_EMAIL"});


//----Infinity Scroll--//
Session.set("imageLimit",8);
//--template images helper function starts---//
   Template.images.helpers({
images:function(){//gallery work over here
if(Session.get("userFilterID"))
return Images_mongo.find({createdBy:Session.get("userFilterID")},{sort:{createdOn:-1,rating:-1},});

else
return Images_mongo.find({},{sort:{createdOn:-1,rating:-1},limit:Session.get("imageLimit")});

}
,
images_filtered:function(){//filtering if session exists or not
if(Session.get("userFilterID"))
return true;
else
return false;
},


filtered_user:function(){
var user=Meteor.users.findOne({_id:Session.get("userFilterID")});

return user.username;
},


getUser:function(user_id)

{
var user=Meteor.users.findOne({"_id":user_id});//remember that user_id here means the id generated when user sign in. don't confuse it with Images_mongo._id .....!!!

if(user){
console.log("the user is :"+user);
return user.username;
}else{
console.log("a");
return "guest user";

}


}


});

//--body helper===universal helper template--//
   Template.body.helpers({username:function()
{
if(Meteor.user())
return Meteor.user().username;
else
return "Guest User";
},

});	

//-----event handling done over here---//
   Template.images.events({
    'click .js-image':function(event){
        $(event.target).css("width", "75%");
    },

'click .js-img-del':function(event)
{
var img_id=this._id;
console.log(img_id);
$("#"+img_id).hide(function(){
Images_mongo.remove({"_id":img_id});
}
);

},

'click .js-img-star-rating':function(event){
//console.log(this._id);
var rating=$(event.currentTarget).data("userrating");
console.log(rating);
var img_id=this.id;
console.log(img_id);
Images_mongo.update({"_id":img_id},{$set:{rating:rating}});
},

'click .show-image-float-form':function(event)
{
$("#image_add_modal_form").modal('show');
},

'click .js-set-image-filter':function(event){
console.log(this.createdBy);
Session.set("userFilterID",this.createdBy);
//console.log(Session.get("userFilterID"));

},
'click .js-unset-image-filter':function(event){
Session.set("userFilterID",undefined);
//console.log(Session.get("userFilterID"));

},




   });//images-event-template ends here....


//---form event handling...triggers when you submit an image url...:0===--//
Template.image_add_form.events({
'submit .js-save-img':function(event)
{
var img_src,img_alt;
img_src=event.target.img_src.value;
img_alt=event.target.img_alt.value;
createdOn=new Date();
createdBy=Meteor.user()._id;
console.log(img_src+" "+img_alt);
Images_mongo.insert({img_src:img_src,img_alt:img_alt,createdOn:createdOn,createdBy:createdBy});
return false;
},


});

//---scroll coding part over here---//
var lastscroll=0;
$(window).scroll(

    function(event)
    {
        console.log($(window).scrollTop());

        if(($(window).scrollTop()+$(window).height())>$(document).height()-100)
        {
            var scrollTop=$(window).scrollTop();
        //   console.log($(window).height());
            if(scrollTop>lastscroll)
            {
                console.log("going down");
//increasing limit
                Session.set("imageLimit",Session.get("imageLimit")+4);
            }

            lastscroll=scrollTop;
        }
    }
);
//--scroll coding ends here--//

