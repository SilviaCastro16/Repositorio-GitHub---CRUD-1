function getCurrentDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return now.toLocaleDateString('es-ES', options);
}

const form = document.getElementById('formRegister');
const nameinput = document.getElementById('nameinput');
const idinput = document.getElementById('idinput');

//donde vamos a pintar los datos de Usuario//
const tablebody = document.getElementById('tablebody');


let data = JSON.parse(localStorage.getItem('formData')) || []; 

// Creamos funcion para que al evento "submit" click al boton (agregar), almacene la información en memoria
form.addEventListener('submit', function(event){
    event.preventDefault();

    const name = nameinput.value;
    const identificacion = idinput.value;

    if(name && identificacion){
        const currentDate = getCurrentDate(); // Obtener la fecha actual
        const newData = { name, identificacion, date: currentDate }; // Agregar la fecha al nuevo registro
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    } else {
        alert('Favor llenar todos los campos');
    }
});


//Función para guardar los datos del formulario:
function saveDataToLocalStorage(){
    localStorage.setItem('formData', JSON.stringify(data));
}

//Función para renderizar o actualizar el formulario, limpia el contenido de la tabla para nuevo registro:
function renderTable(){
    tablebody.innerHTML = '';

    data.forEach (function (item, index){
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const idCell = document.createElement('td');
        const dateCell = document.createElement('td');
        const actionCell = document.createElement('td');
       
        function getCurrentDate() {
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return now.toLocaleDateString('es-ES', options);
        }

    // Dentro de la celda "action" o acciones creamos dos botones un editar y otro eliminar.
        const editButton = document.createElement('button')
    
    // Agregamos el contenido de la celda, texto para name y email.
        nameCell.textContent = item.name;
        idCell.textContent = item.identificacion;
        dateCell.textContent= item.date;

    // Agregamos el texto en los botones.    
        editButton.textContent = 'Editar';

    // asignamos las clases a los botones que aparecen en la celda "acciones".
        editButton.classList.add('button', 'button--secundary');
       
    // Eventos de escucha con funciones para los botones de la celda "acciones" editar y eliminar.
        editButton.addEventListener('click', function(){
            editData(index);
        })


        // Agregamos los botones a la celda de acciones.
        actionCell.appendChild(editButton);


        // Creamos las filas o celdas para los textos que capture en la data:
        row.appendChild(nameCell);
        row.appendChild(idCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);

        // Creamos las filas para nuestro tablebody "la que aparece con la data":
        tablebody.appendChild(row);

    })  
}

// Confección de las funciones de editar y eliminar
function editData(index){
    const item = data[index];
    nameinput.value = item.name;
    idinput.value = item.identificacion;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index){
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();