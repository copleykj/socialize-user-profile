/* eslint-disable import/no-unresolved */
import Meteor, { Mongo } from '@socialize/react-native-meteor';
import { LinkableModel, LinkParent } from '@socialize/linkable-model';
import { ServerTime } from '@socialize/server-time';
import { User } from '@socialize/user-model';
/* eslint-disable import/no-unresolved */

import extendUser from './common/user-extensions';
import construct from './common/profile-model.js';

const { Profile, ProfilesCollection } = construct({ Meteor, Mongo, LinkableModel, LinkParent, ServerTime });
extendUser(User);

export { Profile, ProfilesCollection };
