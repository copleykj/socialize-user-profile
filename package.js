/* global Package */
Package.describe({
    name: 'socialize:user-profile',
    summary: 'An extensible model for a users profile',
    version: '1.0.1',
    git: 'https://github.com/copleykj/socialize-user-profile.git',
});

Package.onUse(function _(api) {
    api.versionsFrom('1.3');

    api.use('socialize:user-blocking@1.0.0');
    api.use('socialize:friendships@1.0.0', { weak: true });

    api.mainModule('server/server.js', 'server');
    api.mainModule('common/common.js', 'client');
});
