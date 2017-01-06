import { Mongo } from 'meteor/mongo';
import { LinkableModel, LinkParent } from 'meteor/socialize:linkable-model'

export const ProfilesCollection = new Mongo.Collection('profiles');

/**
 * Represents a Profile
 * @class Profile
 * @param {Object} document An object representing a users profile usually a Mongo document
 */
export class Profile extends LinkParent{
    constructor(document){
        super(document);
    }
    user() {
        return Meteor.users.findOne(this.userId);
    }
}

Profile.attachCollection(ProfilesCollection);

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
