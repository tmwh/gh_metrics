module.exports = function (shipit) {
    shipit.initConfig({
        staging: {
            servers: 'deployer@katlavan.ddns.net'
        }
    });

    shipit.task('pwd', function () {
        return shipit.remote('pwd');
    });
};