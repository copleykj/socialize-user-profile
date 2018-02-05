/* global Package */

/* eslint-disable import/no-unresolved, global-require*/
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { User } from 'meteor/socialize:user-model';
import { publishComposite } from 'meteor/reywood:publish-composite';

import { ProfilesCollection } from '../common/profile-model.js';

let childrenPublications = [
    {
        find(user) {
            return ProfilesCollection.find({ _id: user._id });
        },
    },
];

let FriendsCollection;
let RequestsCollection;

if (Package['socialize:friendships']) {
    FriendsCollection = require('meteor/socialize:friendships').FriendsCollection;
    RequestsCollection = require('meteor/socialize:requestable').RequestsCollection;
}


publishComposite('socialize.userProfile', function publishUserProfile(username) {
    check(username, String);
    if (this.userId) {
        const currentUser = User.createEmpty(this.userId);
        const userCursor = Meteor.users.find({ username }, { fields: User.fieldsToPublish });
        const userToPublish = userCursor.fetch()[0];
        const isSelf = userToPublish.isSelf(currentUser);

        if (!isSelf && Package['socialize:friendships']) {
            childrenPublications = childrenPublications.concat([
                {
                    find() {
                        return FriendsCollection.find({
                            $or: [
                                { userId: userToPublish._id, friendId: this.userId },
                                { userId: this.userId, friendId: userToPublish._id },
                            ],
                        });
                    },
                },
                {
                    find() {
                        return RequestsCollection.find({
                            $or: [
                                { linkedObjectId: this.userId, requesterId: userToPublish._id },
                                { linkedObjectId: userToPublish._id, requesterId: this.userId },
                            ],
                        });
                    },
                },
            ]);
        }


        if (isSelf || (!currentUser.blocksUser(userToPublish) && !userToPublish.blocksUser(currentUser))) {
            return {
                find() {
                    return userCursor;
                },
                children: childrenPublications,
            };
        }
    }
    return this.ready();
});
