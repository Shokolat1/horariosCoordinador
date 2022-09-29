

let fecIni = document.getElementById('fecIni')
let fecTer = document.getElementById('fecTer')
let tablaDias = document.getElementById('tablaDias')
let tablaMeses = document.getElementById('tablaMeses')

// MÉTODOS IMPORTANTES Y PROTOTIPOS -----------------------------------------
// Obtener año actual
let anio = new Date().getFullYear()

// Agregar días a una cierta fecha
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date.toString();
}

// Agregar meses a una cierta fecha
Date.prototype.addMonths = function (months) {
    var date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + months);
    return date.toString();
}

// MÉTODOS PARA FUNCIONAMIENTO ----------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
    days()
});

function days(){
    let {days, colspans} = getDays()
    let months = getMonths()

    tablaMeses.innerHTML = ''
    tablaDias.innerHTML = ''

    for (let i = 0; i < months.length; i++) {
        tablaMeses.innerHTML += `<th colspan="${colspans[i]}">${months[i]}</th>`
    }

    for (let i = 0; i < days.length; i++) {
        tablaDias.innerHTML += `<th scope="col" colspan="2">${days[i]} - ${days[i + 1]}</th>`
        i++
    }
}

// Función para obtener los números de los días entre semana (lunes a viernes) entre ciertas fechas
function getDays() {
    let arr = []
    let colspans = []
    let tempCS = 0
    let diasEntreFechas = (new Date(`${fecTer.value} ${anio}`) - new Date(`${fecIni.value} ${anio}`)) / 1000 / 60 / 60 / 24
    let fechaIni = new Date(`${fecIni.value} ${anio}`)

    let fI = fecIni.value
    arr.push(fI.slice(-2))
    arr.push(fechaIni.addDays(4).slice(8, 10))

    for (let i = 7; i < diasEntreFechas; i++) {
        arr.push(fechaIni.addDays(i).slice(8, 10))
        arr.push(fechaIni.addDays(i + 4).slice(8, 10))
        i += 6
    }

    for (let e = 0; e < arr.length; e++) {
        if (arr[e] < arr[e + 1]){
            tempCS += 1
        }else{
            colspans.push(tempCS+1)
            tempCS = 0
        }
    }

    return {days: arr, colspans}
}

function getMonths() {
    let arrM = []
    let mesesES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    // Obtener el numero de mes en el que inicia y finaliza el periodo (0 = Enero, 1 = Feb, ...)
    let mInicio = (new Date(`${fecIni.value} ${anio}`).getMonth())
    let mFin = (new Date(`${fecTer.value} ${anio}`).getMonth())

    // Agregar al arreglo los nombres de los meses, dependiendo de los valores anteriores
    for (let i = mInicio; i < mFin + 1; i++) {
        arrM.push(mesesES[i])
    }

    return arrM
}

// Displays
function showDivMaestros() {
document.getElementById("CajaMaestros").style.display="block"
document.getElementById("CajaMaterias").style.display="none"
document.getElementById("CajaAula").style.display="none"
document.getElementById("CajaHoras").style.display="none"
}

function showDivMaterias() {
    document.getElementById("CajaMaestros").style.display="none"
    document.getElementById("CajaMaterias").style.display="block"
    document.getElementById("CajaAula").style.display="none"
    document.getElementById("CajaHoras").style.display="none"
}

function showDivAula() {
    document.getElementById("CajaMaestros").style.display="none"
    document.getElementById("CajaMaterias").style.display="none"
    document.getElementById("CajaAula").style.display="block"
    document.getElementById("CajaHoras").style.display="none"
}

function showDivHoras() {
    document.getElementById("CajaMaestros").style.display="none"
    document.getElementById("CajaMaterias").style.display="none"
    document.getElementById("CajaAula").style.display="none"
    document.getElementById("CajaHoras").style.display="block"
}