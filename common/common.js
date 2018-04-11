/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { LinkableModel, LinkParent } from 'meteor/socialize:linkable-model';
import { ServerTime } from 'meteor/socialize:server-time';
import { User } from 'meteor/socialize:user-model';
/* eslint-disable import/no-unresolved */

import extendUser from './user-extensions';
import construct from './profile-model.js';

const { Profile, ProfilesCollection } = construct({ Meteor, Mongo, LinkableModel, LinkParent, ServerTime });
extendUser({ User, ProfilesCollection });

export { Profile, ProfilesCollection };
