// BOTONES NAVBAR
// let btnProf = document.getElementById('btnNavProf')
// let btnClass = document.getElementById('btnNavCls')
// let btnHr = document.getElementById('btnNavHr')
// let btnMore = document.getElementById('btnMore')

// BOTÓN OBTENER DATOS DE TABLA CLASES
let btnReg = document.getElementById('btnReg')

// TABLAS
let tbProf = document.getElementById('tProf')
let tbClass = document.getElementById('tClass')
let tbHr = document.getElementById('tHrs')
var oTable = document.getElementById('oTable');

// Escoge Aula
let escogeAula = document.getElementById('escogeAula')
let aulaInp = document.getElementById('aula')
escogeAula.addEventListener('change', () => {
    aulaInp.value = escogeAula.value
})

// MÉTODOS
// Lo que hace que el Drag and Drop funcione correctamente
document.addEventListener('DOMContentLoaded', (event) => {
    DragnDrop()
});

// HACER UN MAP CON VALORES DE CADA CLASE
let classInp = document.querySelectorAll('#arrClases')
let map = {}
for (let i = 0; i < classInp.length; i++) {
    let arrC = []
    arrC = classInp[i].value
    arrC = arrC.split(',')
    let atr1 = arrC[0]
    let atr2 = arrC[1]
    map[atr1] = atr2
}

let cls = document.querySelectorAll('#cls')
let matTable = document.getElementById('matCls')

cls.forEach(element => {
    matTable.innerHTML += `<tr><td class="text-dark draggable" draggable="true">${element.value}</td></tr>`
});

// Obtener datos de tabla clases y mostrar c/u en una alerta
btnReg.addEventListener('click', () => {
    //gets rows of table
    var rowLength = oTable.rows.length;

    //loops through rows
    for (i = 0; i < rowLength; i++) {
        let arr = []
        let row = `f${i + 1}`

        //gets cells of current row
        var oCells = oTable.rows.item(i).cells;

        //gets amount of cells of current row
        var cellLength = oCells.length;

        //loops through each cell in current row
        for (var j = 0; j < cellLength; j++) {
            let cellVal = ''

            // get your cell info here
            if (j == 2) {
                cellVal = oCells.item(j).firstChild.value
            } else {
                cellVal = oCells.item(j).innerHTML;
            }
            arr.push(cellVal)
            // console.table(cellVal);
        }
        document.getElementById(row).value = arr

        document.getElementById('btnReg2').style.display = 'block'
        btnReg.style.display = 'none'
    }
})

function checkClass() {
    //gets rows of table
    let rowLength = oTable.rows.length;

    //loops through rows
    for (i = 0; i < rowLength; i++) {

        //gets cell 3 of current row
        let oCells = oTable.rows.item(i).cells;
        let cell3 = oCells.item(0).innerHTML;

        oCells.item(1).innerHTML = map[cell3] ?? 'Error: Info incompatible'
    }
}

function DragnDrop() {

    var dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        if (dragSrcEl != this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
            checkClass()

        }

        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        items.forEach(function (item) {
            item.classList.remove('over');
        });
    }

    let items = document.querySelectorAll('.x .draggable');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
}