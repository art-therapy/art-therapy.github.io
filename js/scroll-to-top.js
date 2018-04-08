(function () {

    var btn;

    window.addEventListener('scroll', onScroll);

    function onScroll() {

        ensureButton();

        var visible = $(this).scrollTop() >= 100;
        btn.style.opacity = visible ? 1 : 0;
        btn.style.pointerEvents = visible ? 'all' : 'none';
    }

    function ensureButton() {

        if (!btn) {
            btn = document.querySelector('#return-to-top');
        }

        if (btn) {
            btn.onclick = function () {
                window.scroll({top: 0, left: 0, behavior: 'smooth'});
            };
        }
    }
})();
