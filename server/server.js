Profile.collection.allow({
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
