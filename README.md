# User Profile #
This package provides the bare minimum required for a user profile and is intended to be built upon to create a custom profile class that meets your needs.

## Supporting the Project ##
In the spirit of keeping this and all of the packages in the [Socialize](https://atmospherejs.com/socialize) set alive, I ask that if you find this package useful, please donate to it's development.

Litecoin: LXLBD9sC5dV79eQkwj7tFusUHvJA5nhuD3 / [Patreon](https://www.patreon.com/user?u=4866588) / [Paypal](https://www.paypal.me/copleykj)

## Installation ##

This package relies on the npm package `simpl-schema` so you will need to make sure it is installed as well.

```shell
$ meteor npm install --save simpl-schema
$ meteor add socialize:user-profile
```

> __Note__
>    
> _This package completely disables updates to the users collection from the client to remove the ability of users to arbitrarily update the profile field on the user document._

## Profile Auto Creation ##

This package will automatically create user profiles when a new user is created. To disable this behavior you can set `User.disableProfileCreation = true`.

```javascript
import { User } from 'meteor/socialize:user-model';

User.disableProfileCreation = true;
```

## Basic Usage ##
The `Profile` class provides your starting point. From there you may want to use the `methods` function inherited from `BaseModel` to add methods to the class. You could also extend the class instead and provide the methods as part of the new class. This would just require calling `NewClassName.updateTransformFunction();` so that `find` and `findOne` calls would return instances of the new class.

### Extending using methods() ###
```javascript
import { Profile, ProfilesCollection } from 'meteor/socialize:user-profile';

Profile.methods({
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
});

var userProfile = ProfilesCollection.findOne();

userProfile.fullName(); //=> "John Doe"
```

### Extending Profile class ###
```javascript
import { Profile, ProfilesCollection } from 'meteor/socialize:user-profile';

export class EnhancedProfile extends Profile{
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

var userProfile = ProfilesCollection.findOne();

userProfile.fullName(); //=> "John Doe"
```

### Extending The Schema ###
Currently the schema for `Profile` has the following definition.

```javascript
{
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
    }
}
```

> **Note**
>
> Profiles created automatically or from the client use the current users `_id` as the `_id` of the new profile record.

As part of the above examples, in the `fullName` method we return a string containing the `firstName` and `lastName` properties of the document. For these to be allowed as part of the profile document, you will need to add them to the schema for `Profile`. This can be accomplished by using the `attachSchema` method inherited from `BaseModel`.

The schema is handled by `SimpleSchema` so just pass a compatible schema definition to the `attachSchema` method.

```javascript
    Profile.attachSchema({
        "firstName":{
            type:String,
            required: true
        },
        "lastName":{
            type:String,
            required: true
        }
    })
```

### User Extensions ###

This package extends the socialize:user-model package with a `profile` method which will return the profile for the found user.


```javascript
let user = Meteor.users.findOne();

user.profile();


Meteor.user().profile(); // the current users profile
```

>__Note__
>
>`user.profile()` will be undefined on the client if profile is not published from the server.

## Advanced Usage ##

The `Profile` class extends the `LinkParent` class provided by _socialize:linkable-model_. This allows you to extend the `Profile` class using linkable packages such as _socialize:likeable_, _socialize:commentable_, and _socialize:postable_.

For example you could create a profile that would allow other users to add posts to it.

```javascript
import { PostableModel } from 'meteor/socialize:postable';
import { Profile } from 'meteor/socialize:user-profile';
import { LinkableModel } from 'meteor/socialize:linkable-model';

export class PostableProfile extends PostableModel(Profile){
    //methods here
}

PostableProfile.updateTransformFunction();

LinkableModel.registerParentModel(PostableProfile);
```
