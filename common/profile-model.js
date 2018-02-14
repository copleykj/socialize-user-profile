/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { LinkableModel, LinkParent } from 'meteor/socialize:linkable-model';
import { ServerTime } from 'meteor/socialize:server-time';
import SimpleSchema from 'simpl-schema';
/* eslint-disable import/no-unresolved */

export const ProfilesCollection = new Mongo.Collection('socialize:profiles');

/**
 * Represents a Profile
 * @class Profile
 * @param {Object} document An object representing a users profile usually a Mongo document
 */
export class Profile extends LinkParent {
    user() {
        return Meteor.users.findOne({ _id: this._id });
    }
    checkOwnership() {
        return this._id === Meteor.userId();
    }
}

Profile.attachCollection(ProfilesCollection);

Profile.attachSchema(new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue() {
            if (this.isInsert && !this.isFromTrustedCode) {
                return this.userId;
            }
            return undefined;
        },
    },
    username: {
        type: String,
        index: 1,
        unique: true,
        optional: true,
        denyUpdate: true,
    },
    createdAt: {
        type: Date,
        autoValue() {
            if (this.isInsert) {
                return ServerTime.date();
            }
            return undefined;
        },
        denyUpdate: true,
    },
    updatedAt: {
        type: Date,
        autoValue() {
            return ServerTime.date();
        },
    },
}));

LinkableModel.registerParentModel(Profile);
