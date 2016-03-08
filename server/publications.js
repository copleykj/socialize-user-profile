Meteor.publish("profileFor", function(userIdOrUsername) {
    check(userIdOrUsername, String);
    return ProfilesCollection.find({$or:[{userId:userIdOrUsername}, {username:userIdOrUsername}]});
});
