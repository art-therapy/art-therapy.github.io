window.hr = elem('hr');
window.div = elem('div');
window.span = elem('span');

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
            try {
                callback(JSON.parse(r.responseText));
            } catch (e) {
                callback(r.responseText);
            }
        }
    };
    r.send();
}

function formatDate(date) {
    var d = new Date(date * 1000)
        .toISOString()
        .split("T")
        .join(' ')
        .split('.')[0]
        .split(':');
    d.pop();
    return d.join(':');
}