
const dropdown = document.getElementById('unitsDropdown');
const button = document.getElementById('unitsBtn');
const switchBtn = document.getElementById('switchUnits');

let unitSystem = 'metric'; // estado global

button.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

switchBtn.addEventListener('click', () => {
    unitSystem = unitSystem === 'metric' ? 'imperial' : 'metric';

    updateUnitsUI();
    saveUnitPreference();
});

function updateUnitsUI() {
    const isMetric = unitSystem === 'metric';

    document.querySelectorAll('[data-type="temp"]')[0].classList.toggle('hidden', !isMetric);
    document.querySelectorAll('[data-type="temp"]')[1].classList.toggle('hidden', isMetric);

    document.querySelectorAll('[data-type="wind"]')[0].classList.toggle('hidden', !isMetric);
    document.querySelectorAll('[data-type="wind"]')[1].classList.toggle('hidden', isMetric);

    document.querySelectorAll('[data-type="rain"]')[0].classList.toggle('hidden', !isMetric);
    document.querySelectorAll('[data-type="rain"]')[1].classList.toggle('hidden', isMetric);

    switchBtn.textContent = isMetric
        ? 'Switch to Imperial'
        : 'Switch to Metric';
}

function saveUnitPreference() {
    localStorage.setItem('unitSystem', unitSystem);
}

// Al cargar la app
const savedUnit = localStorage.getItem('unitSystem');
if (savedUnit) {
    unitSystem = savedUnit;
    updateUnitsUI();
}
