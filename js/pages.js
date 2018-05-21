(function () {

    var target = div('', document.body);
    var container = div('container', target);
    var row = div('row', container);
    var col = div('col-lg-8 col-md-10 mx-auto', row);

    var posts;
    var page = 0;
    var count = 5;

    req('posts/index.json', function (postsData) {
        posts = postsData;
        renderPage();
    });

    function renderPage() {
        col.innerHTML = '';
        var p = posts.slice(page*count, page*count+count);
        p.forEach(function (id) {
            col.innerHTML && hr(col);
            var postBody = div('post-preview', col);
            req('posts/' + id + '.json', function (postData) {
                postBody.innerHTML = '<div class="post-preview"><a href="post.html?'+id+'"><h4>id: '
                    + id + '</h4><h5 class="post-subtitle">'
                    + postData.substring(0, 100) + ' ...</h5></a></div>'
            });
        });
        var buttons = div('navigation-buttons', col);
        div('fa fa-2x fa-angle-double-left', buttons).onclick = goToPage.bind(null, -posts.length);
        div('fa fa-2x fa-angle-left', buttons).onclick = goToPage.bind(null, -1);
        div('pager-text', buttons).innerHTML = (page*count+1) + ' - ' + (page*count+count) + ' / ' + posts.length;
        div('fa fa-2x fa-angle-right', buttons).onclick = goToPage.bind(null, 1);
        div('fa fa-2x fa-angle-double-right', buttons).onclick = goToPage.bind(null, posts.length);
    }

    function goToPage(dir) {
        page = page + dir;
        var max = posts.length / count;

        if (page <= -1)
            page = 0;

        if (page >= max)
            page = max - 1;

        renderPage();
    }
})();
