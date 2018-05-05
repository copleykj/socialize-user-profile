export default ({ User, ProfilesCollection }) => {
    User.methods({
        profile() {
            return ProfilesCollection.findOne({ _id: this._id });
        },
    });
};
