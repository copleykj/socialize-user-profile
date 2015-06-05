Profile.collection.allow({
    insert: function(userId, document) {
        return document.checkOwnership();
    },
    update: function(userId, document) {
        return document.checkOwnership();
    }
});

Meteor.users.after.insert(function(userId, document) {
    ProfilesCollection.insert({userId:document._id});
});
