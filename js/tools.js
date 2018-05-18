window.hr = elem('hr');
window.div = elem('div');

function elem(type) {
    return function elem(className, parent) {
        var el = document.createElement(type);
        el.className = className;
        parent && parent.appendChild(el);
        return el;
    }
}

function req(url, callback) {
    var r = new XMLHttpRequest();
    r.open('get', url, true);
    r.onreadystatechange = function () {
        if (r.readyState === 4 && r.status === 200) {
            callback(JSON.parse(r.responseText));
        }
    };
    r.send();
}