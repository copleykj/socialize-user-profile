# User Profile #
This package provides the bare minimum required for a user profile and is intended to be built upon to create a custom profile class that meets your needs.

## Basic Usage ##
The `Profile` class provides your starting point. From there you may want to use the `methods` function inherited from `BaseModel` to add methods to the class. You could also extend the class instead and provide the methods as part of the new class. This would just require calling `NewClassName.updateTransformFunction();` so that `find` and `findOne` calls would return instances of the new class.

### Extending using methods() ###
```javascript
import { Profile } from 'meteor/socialize:user-profile';

Profile.methods({
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
});

var userProfile = Meteor.profiles.findOne();

userProfile.fullName(); //=> "John Doe"
```

### Extending Profile class ###
```javascript
import { Profile } from 'meteor/socialize:user-profile';

export class EnhancedProfile extends Profile{
    constructor(document){
        //must call super, passing in the document that gets passed to the constructor
        super(document);
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

var userProfile = Meteor.profiles.findOne();

userProfile.fullName(); //=> "John Doe"
```

### Extending The Schema ###
Currently the schema for `Profile` has the following definition.

```javascript
{
    "userId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        autoValue:function () {
            if(!this.value && this.isInsert){
                return this.userId;
            }
        },
        index:1,
        unique:true,
        denyUpdate:true
    },
    "username":{
        type:String,
        index:1,
        unique:true,
        optional:true,
        denyUpdate:true
    },
    "createdAt":{
        type:Date,
        autoValue:function() {
            if(this.isInsert){
                return new Date();
            }
        },
        denyUpdate:true
    },
    "lastUpdate":{
        type:Date,
        autoValue:function() {
            return new Date();
        }
    }
}
```

As part of the above examples, in the `fullName` method we return a string containing the `firstName` and `lastName` properties of the document. For these to be allowed as part of the profile document, you will need to add them to the schema for `Profile`. This is made simple by the `appendSchema` inherited from `BaseModel`.

The schema is handled by `SimpleSchema` so just pass a compatible schema definition to the `appendSchema` method.

```javascript
    Profile.appendSchema({
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
