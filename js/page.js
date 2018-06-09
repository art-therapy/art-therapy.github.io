(function () {

    var id = document.location.search.substring(1);

    var target = document.createElement('div');
    document.body.appendChild(target);
    var req = new XMLHttpRequest();
    req.open('get', 'posts/' + id + '.json', true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var html = '';

            var postData = JSON.parse(req.responseText);

            if (postData.copy_history)
                postData = postData.copy_history[0];

            html += '<header class="masthead" style="background-image: url(\'img/post-bg-compressed.jpg\')">' +
                '<div class="overlay"></div><div class="container"><div class="row">' +
                '<div class="col-lg-8 col-md-10 mx-auto"><div class="post-heading">' +
                '<h2>' + formatDate(postData.date) + '</h2>' +
                '</div></div></div></div></header>' +

                '<article><div class="container"><div class="row">' +
                '<div class="col-lg-8 col-md-10 mx-auto">' +
                '<h2 class="section-heading"></h2>' +
                '<p style=" font-size :16px;font-family: \'Open Sans\',\'Helvetica Neue\',Helvetica,Arial,sans-serif;">' +
                postData.text.split('\n').join('<br>') + '</p>';

            postData.attachments && postData.attachments.forEach(function (attachment) {
                if (attachment.type === 'photo') {
                    html += '<img src="' +attachment.photo.photo_130 +'"/>';
                }
                if (attachment.type === 'video') {
                    // postBody.innerHTML += title(attachment.video.title);
                    html += '<img src="' + attachment.video.photo_130 +'"/>';
                }
                if (attachment.type === 'doc') {
                    // postBody.innerHTML += attachment.doc.title + '<br>';
                    html += '<img src="' +attachment.doc.preview.photo.sizes.shift().src  +'"/>';
                }
            });

            html +='</div></div></div></article>';

            target.innerHTML = html;
        }
    };
    req.send();


})();


