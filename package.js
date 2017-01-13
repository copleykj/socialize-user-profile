Package.describe({
    name: "socialize:user-profile",
    summary: "An extensible model for a users profile",
    version: "1.0.0",
    git: "https://github.com/copleykj/socialize-user-profile.git"
});

Package.onUse(function(api) {
    api.versionsFrom("1.3");

    api.use([
        "socialize:user-model@1.0.0"
    ]);

    api.mainModule("server/server.js", "server");
    api.mainModule("common/common.js");
});
