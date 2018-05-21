(function () {

    var target = div('', document.body);
    var container = div('container', target);
    var row = div('row', container);
    var col = div('col-lg-8 col-md-10 mx-auto', row);

    req('posts/index.json', function (posts) {
        posts.forEach(function (id) {
            col.innerHTML && hr(col);
            var postBody = div('post-preview', col);
            req('posts/' + id + '.json', function (postData) {
                postBody.innerHTML = '<div class="post-preview"><a href="post.html?'+id+'"><h4>'
                + postData.title + '</h4><h5 class="post-subtitle">'
                + postData.text.substring(0, 100) + ' ...</h5></a></div>'
            });
        });
    });
})();
