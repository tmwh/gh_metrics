module.exports = function (shipit) {
    require('shipit-deploy')(shipit);
    require('shipit-npm')(shipit);

    shipit.initConfig({
        default: {
            workspace: '~/tmp/github-monitor',
            deployTo: '~/tmp/homeserver',
            repositoryUrl: 'git@gitlab.com:katlavan/home_api.git',
            branch: 'master',
            ignores: ['.git', 'node_modules'],
            rsync: ['--del'],
            keepReleases: 2
            //key: '~/.ssh/id_rsa.pub',
            //shallowClone: true
        },
        staging: {
            servers: 'kot@katlavan.ddns.net'
        }
    });

    shipit.task('start', function () {
        shipit.remote('cd ~/tmp/homeserver/current && npm start &');
    });
};