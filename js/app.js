document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       UNITS DROPDOWN (Metric / Imperial)
    =============================== */

    const dropdown = document.getElementById('unitsDropdown');
    const button = document.getElementById('unitsBtn');
    const switchBtn = document.getElementById('switchUnits');

    let unitSystem = 'metric';

    if (dropdown && button && switchBtn) {

        button.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });

        switchBtn.addEventListener('click', () => {
            unitSystem = unitSystem === 'metric' ? 'imperial' : 'metric';
            updateUnitsUI();
            saveUnitPreference();
        });

        function toggleUnit(type, isMetric) {
            const options = document.querySelectorAll(`[data-type="${type}"]`);
            if (options.length !== 2) return;

            options[0].classList.toggle('hidden', !isMetric);
            options[1].classList.toggle('hidden', isMetric);
        }

        function updateUnitsUI() {
            const isMetric = unitSystem === 'metric';

            toggleUnit('temp', isMetric);
            toggleUnit('wind', isMetric);
            toggleUnit('rain', isMetric);

            switchBtn.textContent = isMetric
                ? 'Switch to Imperial'
                : 'Switch to Metric';
        }

        function saveUnitPreference() {
            localStorage.setItem('unitSystem', unitSystem);
        }

        const savedUnit = localStorage.getItem('unitSystem');
        if (savedUnit) {
            unitSystem = savedUnit;
            updateUnitsUI();
        }
    }

    /* ===============================
       SEARCH + RECENT SEARCHES
    =============================== */

    const input = document.getElementById('searchPlace');
    const recentList = document.getElementById('recentList');
    const searchButton = document.querySelector('.search-button');

    let recentSearches = JSON.parse(
        localStorage.getItem('recentSearches')
    ) || [];

    if (input && recentList) {

        input.addEventListener('focus', () => {
            if (recentSearches.length === 0) return;
            renderRecentSearches();
            recentList.classList.remove('hidden');
        });

        input.addEventListener('input', () => {
            if (recentSearches.length === 0) {
                recentList.classList.add('hidden');
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.input-search')) {
                recentList.classList.add('hidden');
            }
        });
    }

    if (searchButton && input) {
        searchButton.addEventListener('click', () => {
            const value = input.value.trim();
            if (!value) return;

            saveSearch(value);
            recentList.classList.add('hidden');
        });
    }

    function renderRecentSearches() {
        recentList.innerHTML = '';

        recentSearches.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city;

            li.addEventListener('click', () => {
                input.value = city;
                recentList.classList.add('hidden');
            });

            recentList.appendChild(li);
        });
    }

    function saveSearch(city) {
        if (!recentSearches.includes(city)) {
            recentSearches.unshift(city);
            recentSearches = recentSearches.slice(0, 5);
            localStorage.setItem(
                'recentSearches',
                JSON.stringify(recentSearches)
            );
        }
    }

});
