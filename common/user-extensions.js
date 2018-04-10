import { ProfilesCollection } from './profile-model';

export default (User) => {
    User.methods({
        profile() {
            return ProfilesCollection.findOne({ _id: this._id });
        },
    });
};
