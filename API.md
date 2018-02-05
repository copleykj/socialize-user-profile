# Profile (class) extends LinkParent #

## Instance Methods ##

__user()__ - returns the User instance for the user who's profile it is.

## Publications ##

**socialize.userProfile(username)** - Publishes the profile and related data for a particular user. When the [socialize:friendships]() package is present, the friend and request records between the current user and the profile user are also published to facilitate showing this information on the users profile, otherwise just the profile and user record for the specified user are published.

```javascript
Meteor.subscribe('socialize.userProfile', 'copleykj');
```
