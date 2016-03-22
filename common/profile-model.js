/**
 * Represents a Profile
 * @class Profile
 * @param {Object} document An object representing a users profile ususally a Mongo document
 */
Profile = BaseModel.extendAndSetupCollection("profiles");

ProfilesCollection = Profile.collection;

Profile.methods({
    user: function() {
        return Meteor.users.findOne(this.userId);
    }
});

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
        index:1,
        unique:true,
        optional:true,
        denyUpdate:true
    },
    "createdAt":{
        type:Date,
        autoValue:function() {
            if(this.isInsert){
                return new Date();
            }
        },
        denyUpdate:true
    },
    "lastUpdate":{
        type:Date,
        autoValue:function() {
            return new Date();
        }
    }
});
