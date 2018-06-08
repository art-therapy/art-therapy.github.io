(function () {

    var target = div('', document.body);
    var container = div('container', target);
    var row = div('row', container);
    var col = div('col-lg-8 col-md-10 mx-auto', row);
    col.style.minHeight = '500px';
    var posts;
    var page = (document.location.search.substring(1) - 1) || 0;
    var count = 5;

    req('posts/index.json', function (postsData) {
        posts = postsData;
        renderPage();
    });

    function title(text) {
        return '<span style="font-size:15px; font-family: \'Open Sans\',\'Helvetica Neue\',Helvetica,Arial,sans-serif;">' + text + '</h5><br>';
    }

    function renderPage() {
        col.innerHTML = '';
        var p = posts.slice(page*count, page*count+count);
        p.forEach(function (id, i) {
            col.innerHTML && hr(col);
            var postBody = div('post-preview', col);
            req('posts/' + id + '.json', function (postData) {

                if (postData.copy_history)
                    postData = postData.copy_history[0];

                var s = postData.text.substring(0, 100);
                s && (s += ' ...');

                postBody.innerHTML = '<div class="post-preview"><a href="post.html?' + id + '"><h4>'
                    + formatDate(postData.date) + '</h4><h5 class="post-subtitle">' + s + '</h5>';

                postData.attachments && postData.attachments.forEach(function (attachment) {
                    if (attachment.type === 'photo') {
                        postBody.innerHTML += '<img src="' +attachment.photo.photo_130 +'"/>';
                    }
                    if (attachment.type === 'video') {
                        // postBody.innerHTML += title(attachment.video.title);
                        postBody.innerHTML += '<img src="' + attachment.video.photo_130 +'"/>';
                    }
                    if (attachment.type === 'doc') {
                        // postBody.innerHTML += attachment.doc.title + '<br>';
                        postBody.innerHTML += '<img src="' +attachment.doc.preview.photo.sizes.shift().src  +'"/>';
                    }
                });
                postBody.innerHTML += '</a></div>';
                i !== p.length-1 && (postBody.innerHTML += '<hr>');
            });
        });
        var buttons = div('navigation-buttons', col);
        div('fa fa-2x fa-angle-double-left', buttons).onclick = goToPage.bind(null, -posts.length);
        div('fa fa-2x fa-angle-left', buttons).onclick = goToPage.bind(null, -1);
        div('pager-text', buttons).innerHTML = (page*count+1) + ' - ' + (page*count+count) + ' / ' + posts.length;
        div('fa fa-2x fa-angle-right', buttons).onclick = goToPage.bind(null, 1);
        div('fa fa-2x fa-angle-double-right', buttons).onclick = goToPage.bind(null, posts.length);
        window.history.replaceState('', '', document.location.pathname + '?' + (page + 1));
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
