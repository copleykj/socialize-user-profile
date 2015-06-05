User.prototype.profile = function() {
    return ProfilesCollection.findOne({userId:this._id});
};
