var g = document.querySelector('#gallery');
var row;
for (var i = 0; i < 39; i++) {

    if (i % 3 === 0){
        row = document.createElement('div');
        row.className = 'row';
        g.appendChild(row);
        g.appendChild(document.createElement('hr'));
    }

    var cell = document.createElement('div');
    cell.className = 'col-lg-4 col-md-10 mx-auto';
    cell.innerHTML = '<img ' +
        'class="img-fluid" ' +
        'style="cursor: pointer" ' +
        'src="img/works/small/tn_' + (i +1)+ '.jpg" ' +
        'onclick="document.location.href = \'img/works/big/' + (i + 1) + '.jpg\'">';
    row.appendChild(cell);
}