(function () {
    var target = document.createElement('div');
    document.body.appendChild(target);
    var scripts = document.getElementsByTagName('script');
    var page = scripts[scripts.length - 1].attributes["link"].value;
    var req = new XMLHttpRequest();
    req.open('get', page, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            target.innerHTML = req.responseText;
        }
    };
    req.send();
})();