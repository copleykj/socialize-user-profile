/**
 * Represents a Profile
 * @class Profile
 * @param {Object} document An object representing a users profile ususally a Mongo document
 */
Profile = BaseModel.extendAndSetupCollection("profiles");

ProfilesCollection = Profile.collection;

//attach or append
Profile.appendSchema({
    "userId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        autoValue:function () {
            if(!this.value && this.isInsert){
                return this.userId;
            }
        },
        index:1,
        unique:true,
        denyUpdate:true
    },
    "username":{
        type:String,
        autoValue:function () {
            if(this.isInsert){
                return Meteor.user().username;
            }
        },
        index:1,
        unique:true,
        denyUpdate:true
    },
    "createdAt":{
        type:Date,
        autoValue:function() {
            if(this.isInsert){
                return new Date();
            }
        }
    },
    "lastUpdate":{
        type:Date,
        autoValue:function() {
            return new Date();
        }
    }
});
