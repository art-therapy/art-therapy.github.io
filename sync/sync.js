var fs;
var actual = [];
var remain;
var githubLogin;
var githubPassword;

chain(
    initVk,
    initFS,
    gitClone,
    // gitPull,
    processWallPosts,
    updateIndexFile,
    gitCommit,
    gitPush,
    done
);

function done() {
    log('done');
}

function gitPush(finish) {
    log('push');
    git.push({
        fs: fs,
        dir: '/',
        remote: 'origin',
        ref: 'master',
        authUsername: githubLogin,
        authPassword: githubPassword
    }).then(function () {
        log('pushed');
        finish();
    }).catch(function (reason) {
        log('error');
        log(reason);
        finish();
    })
}

function gitCommit(finish) {
    log('commit');
    git.commit({
        fs: fs,
        dir: '/',
        author: {
            name: 'wall sync script',
            email: 'mrtest@example.com'
        },
        message: 'vk wall sync'
    }).then(function () {
        log('commited');
        finish();
    }).catch(function (reason) {
        log('error');
        log(reason);
        finish();
    });
}

function gitAdd(file, callback) {
    git.add({
        fs: fs,
        dir: '/',
        filepath: file
    }).then(callback).catch(function (reason) {
        log('error');
        log(reason);
        callback();
    });
}

function processWallPosts(finish) {
    log('getting posts from wall');
    vkApiCall('wall.get', function (postsListData) {
        var total = postsListData.response.count;
        remain = total;
        log('total posts: ' + total);
        log('');
        asyncLoop(processChunk, 0, total, 100, 1000);
    });

    function processChunk(i) {
        vkApiCall('wall.get', {
            count: 100,
            offset: i
        }, function (posts) {
            posts.response.items.forEach(updatePost)
        });
    }

    function updatePost(post) {
        actual.push(post.id);
        var fileName = 'posts/' + post.id + '.json';
        fs.writeFile(fileName, post.text, 'utf8', function (err) {
            if (err) {
                log(err);
                fileWritten();
            }

            gitAdd(fileName, fileWritten);
        });
    }

    function fileWritten() {
        remain -= 1;
        removeLastLogRecord();
        log('remain ' + remain);
        if (remain > 0)
            return;
        removeLastLogRecord();
        log('updating posts complete, processed: ' + actual.length);
        finish();
    }
}

function updateIndexFile(finish) {
    log('update index file');
    var file = 'posts/index.json';
    fs.writeFile('/' + file, JSON.stringify(actual), 'utf8', function (err) {
        if (err) {
            log('update index file error');
            log(err);
            finish();
        } else {
            log('update index file success');
            gitAdd(file, finish);
        }
    });
}

function gitClone(finish) {
    var repo = 'art-therapy/art-therapy.github.io';
    log('cloning github repository ' + repo);

    git.clone({
        fs: fs,
        dir: '/',
        url: 'https://cors-buster-jfpactjnem.now.sh/github.com/' + repo + '.git',
        singleBranch: true,
        depth: 1
    }).then(success);

    function success() {
        log('clone success');
        finish();
    }
}

function gitPull(finish) {

    log('pulling remote changes');


    git.pull({
        fs: fs,
        dir: '/',
        ref: 'master',
        singleBranch: true
    }).then(success);

    function success() {
        log('pull success');
        finish();
    }
}

function initVk(finish) {
    VK.init({apiId: '5043774'});
    log('vk login');
    VK.Auth.login(function () {
        log('vk login success');
        finish();
    });
}

function initFS(finish) {
    BrowserFS.configure({
        fs: "IndexedDB",
        options: {}
    }, function (err) {
        if (err)
            return console.error(err);
        fs = BrowserFS.BFSRequire("fs");
        log('filesystem initialized');
        finish();
    });
}

function vkApiCall(method, paramsOrCallback, callback) {
    var params = callback ? paramsOrCallback : {};
    params.v = '5.74';
    callback = callback || paramsOrCallback;
    VK.Api.call(method, params, callback)
}

function chain() {

    var queue = Array.prototype.slice.call(arguments);

    run();

    function run() {
        queue.shift()(run);
    }
}

function asyncLoop(func, from, to, step, timeout) {
    var i = from;
    doStep(i);

    function doStep() {
        func(i);
        i += step;
        i < to && setTimeout(doStep, timeout);
    }
}

function log(a) {
    document.body.appendChild(htmlify(a));
}

function removeLastLogRecord() {
    document.body.removeChild(document.body.lastChild);
}
