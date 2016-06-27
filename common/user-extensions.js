import { User } from 'meteor/socialize:user-model';
import { ProfilesCollection } from './profile-model';


User.methods({
    profile() {
        return ProfilesCollection.findOne({userId:this._id});
    }
});
