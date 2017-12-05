/* eslint-disable import/no-unresolved */
import { User } from 'meteor/socialize:user-model';
/* eslint-disable import/no-unresolved */

import { ProfilesCollection } from './profile-model';


User.methods({
    profile() {
        return ProfilesCollection.findOne({ _id: this._id });
    },
});
