/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
/* eslint-enable import/no-unresolved */

import { ProfilesCollection } from '../common/profile-model';

ProfilesCollection.allow({
    insert(userId, document) {
        return document.checkOwnership();
    },
    update(userId, document) {
        return document.checkOwnership();
    },
});

Meteor.users.after.insert(function afterInsertUser(userId, document) {
    const profile = {
        userId: document._id,
    };

    if (document.username) {
        profile.username = document.username;
    }

    ProfilesCollection.insert(profile);
});

Meteor.users.after.remove(function afterRemoveUser(userId) {
    ProfilesCollection.remove({ userId });
});

Meteor.users.deny({
    update() {
        return true;
    },
});
