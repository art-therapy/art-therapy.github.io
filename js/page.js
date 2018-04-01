(function () {
    var target = document.createElement('div');
    document.body.appendChild(target);
    var req = new XMLHttpRequest();
    req.open('get', 'pages.txt', true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var html = '';
            var index = document.location.search.substring(1);
            var post = req.responseText.split('---')[index].split('\n');
            var title = '';
            while (+title === +'')
                title = post.shift();

            html += '<header class="masthead" style="background-image: url(\'img/post-bg.jpg\')">' +
                '<div class="overlay"></div><div class="container"><div class="row">' +
                '<div class="col-lg-8 col-md-10 mx-auto"><div class="post-heading">' +
                '<h2>' + title + '</h2>' +
                '</div></div></div></div></header>' +

                '<article><div class="container"><div class="row">' +
                '<div class="col-lg-8 col-md-10 mx-auto">' +
                '<h2 class="section-heading"></h2>' +
                '<p>' + post.join('') + '</p>' +
                '</div></div></div></article>';

            target.innerHTML = html;
        }
    };
    req.send();
})();


