import { ProfilesCollection } from '../common/profile-model';
import { Meteor } from 'meteor/meteor';

ProfilesCollection.allow({
    insert: function(userId, document) {
        return document.checkOwnership();
    },
    update: function(userId, document) {
        return document.checkOwnership();
    }
});

Meteor.users.after.insert(function(userId, document) {
    var profile = {
        userId:document._id
    };

    if(document.username){
        profile.username = document.username;
    }

    ProfilesCollection.insert(profile);
});

Meteor.users.deny({
    update: function() {
        return true;
    }
});
