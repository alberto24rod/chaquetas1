class GeneradorCURP {
    constructor(nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, genero, estadoNacimiento) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.estadoNacimiento = estadoNacimiento;
    }
  
    generar() {
        const vocales = /[AEIOU]/g;
        const consonantes = /[BCDFGHJKLMNPQRSTVWXYZ]/g;
      
        // Convertir fecha de nacimiento a un formato YYMMDD
        const fechaFormateada = this.fechaNacimiento.getFullYear().toString().substr(2) +
                                ('0' + (this.fechaNacimiento.getMonth() + 1)).slice(-2) +
                                ('0' + this.fechaNacimiento.getDate()).slice(-2);
      
        // Obtener los dos primeros dígitos del apellido paterno
        let dosPrimerasLetrasApellidoPaterno = '';
        for (let i = 0; i < this.apellidoPaterno.length; i++) {
            const letra = this.apellidoPaterno[i];
            if (!vocales.test(letra) && letra !== 'Ñ' && letra !== 'X') {
                dosPrimerasLetrasApellidoPaterno += letra;
            }
            if (dosPrimerasLetrasApellidoPaterno.length === 2) {
                break;
            }
        }
      
        // Obtener el día de la fecha de nacimiento
        const diaNacimiento = ('0' + this.fechaNacimiento.getDate()).slice(-2);
      
        // Obtener la letra correspondiente al género
        const letraGenero = this.genero === 'Hombre' ? 'H' : 'M';
      
    
        // Mapeo de abreviaturas de estado a claves
const estadoClaveMap = {
    "NE": "00",
    "AS": "01",
    "BC": "02",
    "BS": "03",
    "CC": "04",
    "CL": "05",
    "CM": "06",
    "CS": "07",
    "CH": "08",
    "DF": "09",
    "DG": "10",
    "GT": "11",
    "GR": "12",
    "HG": "13",
    "JC": "14",
    "MC": "15",
    "MN": "16",
    "MS": "17",
    "NT": "18",
    "NL": "19",
    "OC": "20",
    "PL": "21",
    "QT": "22",
    "QR": "23",
    "SP": "24",
    "SL": "25",
    "SR": "26",
    "TC": "27",
    "TS": "28",
    "TL": "29",
    "VZ": "30",
    "YN": "31",
    "ZS": "32",
    "NA": "88",
    "SI": "99"
};

// Obtener la clave del estado de nacimiento
let claveEstadoNacimiento = estadoClaveMap[this.estadoNacimiento];

      
        // Obtener la primera consonante interna del apellido paterno
        let primeraConsonanteApellidoPaterno = '';
        for (let i = 1; i < this.apellidoPaterno.length; i++) {
            const letra = this.apellidoPaterno[i];
            if (consonantes.test(letra)) {
                primeraConsonanteApellidoPaterno = letra;
                break;
            }
        }
      
        // Obtener la primera consonante interna del segundo apellido
        let primeraConsonanteApellidoMaterno = '';
        for (let i = 1; i < this.apellidoMaterno.length; i++) {
            const letra = this.apellidoMaterno[i];
            if (consonantes.test(letra)) {
                primeraConsonanteApellidoMaterno = letra;
                break;
            }
        }
      
        // Obtener la primera consonante interna del nombre
        let primeraConsonanteNombre = '';
        for (let i = 1; i < this.nombre.length; i++) {
            const letra = this.nombre[i];
            if (consonantes.test(letra)) {
                primeraConsonanteNombre = letra;
                break;
            }
        }
      
        // Generar homoclave
        const homoclave = Math.floor(Math.random() * 100).toString().padStart(2, '0');
      
        // Generar los dos últimos dígitos verificadores de manera aleatoria
        const digitoVerificador1 = Math.floor(Math.random() * 10);
        const digitoVerificador2 = Math.floor(Math.random() * 10);
      
        const curp = `${dosPrimerasLetrasApellidoPaterno}${this.apellidoMaterno.charAt(0)}${this.nombre.charAt(0)}${fechaFormateada}${primeraConsonanteNombre}${claveEstadoNacimiento}${letraGenero}${homoclave}${digitoVerificador1}${digitoVerificador2}`;
      
        return curp.toUpperCase();
    }
}

function generarCURP() {
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    fechaNacimiento.setDate(fechaNacimiento.getDate() + 1); // Ajustar para obtener el día correcto
    const genero = document.getElementById('genero').value;
    const estadoNacimiento = document.getElementById('estado').value;
    const generador = new GeneradorCURP(nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, genero, estadoNacimiento);
    const curp = generador.generar();
    document.getElementById('resultado').innerText = "El CURP generado es: " + curp;
}
