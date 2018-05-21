(function () {

    var id = document.location.search.substring(1);

    var target = document.createElement('div');
    document.body.appendChild(target);
    var req = new XMLHttpRequest();
    req.open('get', 'posts/' + id + '.json', true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var html = '';

            var post = req.responseText;

            html += '<header class="masthead" style="background-image: url(\'img/post-bg-compressed.jpg\')">' +
                '<div class="overlay"></div><div class="container"><div class="row">' +
                '<div class="col-lg-8 col-md-10 mx-auto"><div class="post-heading">' +
                '<h2>' + id + '</h2>' +
                '</div></div></div></div></header>' +

                '<article><div class="container"><div class="row">' +
                '<div class="col-lg-8 col-md-10 mx-auto">' +
                '<h2 class="section-heading"></h2>' +
                '<p>' + post + '</p>' +
                '</div></div></div></article>';

            target.innerHTML = html;
        }
    };
    req.send();
})();


