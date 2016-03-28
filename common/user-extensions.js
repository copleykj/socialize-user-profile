User.prototype.getProfile = function() {
    return Meteor.profiles.findOne({userId:this._id});
};
