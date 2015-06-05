Meteor.publish("profileFor", function(userIdOrUsername) {
    return ProfilesCollection.find({$or:[{userId:userIdOrUsername}, {username:userIdOrUsername}]});
});
