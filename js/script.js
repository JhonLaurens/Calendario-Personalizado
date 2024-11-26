// Elementos del DOM
const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');
const daysContainer = document.getElementById('days');
const dayContainer = document.getElementById('day-container');

// Configuración del calendario
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const weekDays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const currentDate = new Date();

// Festivos en Colombia
const holidays = {
    "1-1": "Año Nuevo",
    "5-1": "Día del Trabajo",
    "7-20": "Día de la Independencia",
    "8-7": "Batalla de Boyacá",
    "12-8": "Inmaculada Concepción",
    "12-25": "Navidad",
    // Añade más festivos según sea necesario
};

// Inicializar selectores
function initializeSelectors() {
    const currentYear = currentDate.getFullYear();
    
    // Populate years
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        if (year === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    }
    
    // Populate months
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = month;
        if (index === currentDate.getMonth()) option.selected = true;
        monthSelect.appendChild(option);
    });
}

// Generar calendario
function generarCalendario(year, month) {
    daysContainer.innerHTML = '';
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    // Crear grid del calendario
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';
    
    // Añadir días vacíos al inicio
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Añadir días del mes
    for (let day = 1; day <= totalDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Formato clave para festivos
        const key = `${month + 1}-${day}`;
        if (holidays[key]) {
            dayElement.classList.add('holiday');
            dayElement.title = holidays[key];
        }
        
        // Marcar día actual
        if (year === currentDate.getFullYear() && 
            month === currentDate.getMonth() && 
            day === currentDate.getDate()) {
            dayElement.classList.add('today');
        }
        
        dayElement.addEventListener('click', () => selectDay(dayElement, day, month, year));
        calendarGrid.appendChild(dayElement);
    }
    
    daysContainer.appendChild(calendarGrid);
    actualizarFechaSeleccionada();
}

// Seleccionar día
function selectDay(element, day, month, year) {
    // Remover selección previa
    const prevSelected = daysContainer.querySelector('.selected');
    if (prevSelected) prevSelected.classList.remove('selected');
    
    // Añadir nueva selección
    element.classList.add('selected');
    
    // Actualizar fecha mostrada
    actualizarFechaSeleccionada(day, month, year);
}

// Actualizar fecha seleccionada
function actualizarFechaSeleccionada(day, month, year) {
    if (day && month && year) {
        const fecha = new Date(year, month, day);
        dayContainer.textContent = `${weekDays[fecha.getDay()]}, ${day} de ${months[month]} del ${year}`;
    } else {
        dayContainer.textContent = 'Seleccione una fecha';
    }
}

// Event Listeners
yearSelect.addEventListener('change', () => {
    generarCalendario(parseInt(yearSelect.value), parseInt(monthSelect.value));
});

monthSelect.addEventListener('change', () => {
    generarCalendario(parseInt(yearSelect.value), parseInt(monthSelect.value));
});

// Inicializar calendario
initializeSelectors();
generarCalendario(currentDate.getFullYear(), currentDate.getMonth());