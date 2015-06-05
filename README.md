# User Profile #

This package provides the bare minimum required for a user profile and is intended to be built upon to create a custom profile class that meets your needs. Currently the fields on the schema are userId (unique), username (unique) and createdAt, and lastUpdated.

## Profile Class - Extends BaseModel ##

### Extending the Class ###

You can extend the profile class by adding necessary methods to it's prototype. They will then be available on instantiated objects such as when using Meteor.profiles.findOne() and when iterating over a cursor returned from Meteor.profiles.find()

```javascript
    Profile.prototype.fullName = function() {
        return this.firstName + " " + this.lastName;
    }
```
```javascript
    var userProfile = Meteor.profiles.findOne();

    console.log(userProfile.fullName()) //=> "John Doe"
```

### Extending the Schema ###

To extend the schema you can use the appendSchema method provided by the BaseModel Class. The Schema uses aldeed:simple-schmea so you should pass a compatible schema definition to appendSchema.

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

This package extends the socialize:user-model packge with useful methods pertaining to the user profile.

`User.prototype.profile()` - Returns the profile for the user. If on the client this assumes that you have published the profile data for the user.
