var fs;
var actual;

readActualPosts(initVk);

function readActualPosts(callback) {
    log('reading actual posts:');
    req('../posts/index.json', function (postsIndex) {
        actual = postsIndex.ids;
        log('actual posts:' + actual.length);
        callback()
    });
}

function preparePostIds(postsListData) {
    return postsListData.response.items.filter(function (post) {
        return actual.indexOf(post.id) === -1;
    }).map(function (post) {
        return post.owner_id + '_' + post.id
    });
}

function getAllPosts() {
    log('getting posts from wall');
    call('wall.get', function (postsListData) {
        // log(postsListData)
        log('total posts: ' + postsListData.response.count);
        preparePostIds(postsListData).forEach(updatePost);
        // updatePost(preparePostIds(postsListData)[0])
    })
}

function updatePost(postId) {
    call('wall.getById', {
        posts: [postId]
    }, function (postsContents) {
        var text = postsContents.response[0].text;
        log(text);

        fs.writeFile('posts/' + postId + '.json', text, 'utf8').then(function () {

        })
    })
}

function gitClone() {
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
        // readFile(fs);
        getAllPosts();
    }
}

function initVk() {
    var vkProps = { apiId: '5043774' };
    log('vk api: ' + vkProps.apiId);
    VK.init(vkProps);
    vkLogin();
}

function vkLogin() {
    log('vk login');
    VK.Auth.login(function () {
        log('vk login success');
        initFS(gitClone);
    });
}

function initFS(fsLoadCallback) {
    var fsConfig = {
        fs: "IndexedDB",
        options: {}
    };

    BrowserFS.configure(fsConfig, function (err) {
        if (err)
            return console.error(err);
        fs = BrowserFS.BFSRequire("fs");
        fsLoadCallback();
    });
}

function call(method, paramsOrCallback, callback) {
    var params = callback ? paramsOrCallback : {};
    params.v = '5.74';
    callback = callback || paramsOrCallback;
    VK.Api.call(method, params, callback)
}

function log(a) {
    document.body.appendChild(htmlify(a));
}
