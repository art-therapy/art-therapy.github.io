(function () {
    var target = document.createElement('div');
    target.innerHTML = '<div class="container"><div class="row"><div class="col-lg-8 col-md-10 mx-auto">';
    document.body.appendChild(target);
    var req = new XMLHttpRequest();
    req.open('get', 'pages.txt', true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var html = ''
            req.responseText.split('---').forEach(function (postText, i) {
                html += html ? '<hr>' : '<div class="container"><div class="row"><div class="col-lg-8 col-md-10 mx-auto">';
                var post = postText.split('\n');
                var title = '';
                while (+title === +'')
                    title = post.shift();
                var text = '';
                while (text.length < 100)
                    text += post.shift();
                html += '<div class="post-preview"><a href="post.html?'+i+'"><h2 class="post-title">'
                    + title + '</h2><h3 class="post-subtitle">'
                    + text + ' ...</h3></a></div>'
            });
            target.innerHTML = html + '</div></div></div>';
        }
    };
    req.send();
})();
