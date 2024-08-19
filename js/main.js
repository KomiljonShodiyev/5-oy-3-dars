const elMainList = document.querySelector(".main-list");
const searchInput = document.querySelector('input[name="search"]');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const elBody = document.body;
const modal = document.getElementById('countryModal');
const closeModalBtn = document.getElementById('closeModal');

const countries = [
    {
        id: 1,
        name: "Wallis and Futuna",
        capital: "Mata-Utu",
        population: 11750,
        area: "142 km²",
        currency: "CFP franc",
        language: "French",
        flag: "https://flagcdn.com/wf.svg"
    },
    {
        id: 2,
        name: "Iceland",
        capital: "Reykjavik",
        population: 366425,
        area: "103,000 km²",
        currency: "Icelandic króna",
        language: "Icelandic",
        flag: "https://flagcdn.com/is.svg"
    },
    {
        id: 3,
        name: "Luxembourg",
        capital: "Luxembourg",
        population: 632275,
        area: "2,586 km²",
        currency: "Euro",
        language: "Luxembourgish, French, German",
        flag: "https://flagcdn.com/lu.svg"
    },
    {
        id: 4,
        name: "Mali",
        capital: "Bamako",
        population: 20250834,
        area: "1,240,192 km²",
        currency: "West African CFA franc",
        language: "French",
        flag: "https://flagcdn.com/ml.svg"
    },
    {
        id: 5,
        name: "Comoros",
        capital: "Moroni",
        population: 869595,
        area: "1,861 km²",
        currency: "Comorian franc",
        language: "Comorian, Arabic, French",
        flag: "https://flagcdn.com/km.svg"
    },
    {
        id: 6,
        name: "Australia",
        capital: "Canberra",
        population: 25687041,
        area: "7,692,024 km²",
        currency: "Australian dollar",
        language: "English",
        flag: "https://flagcdn.com/au.svg"
    },
    {
        id: 7,
        name: "Estonia",
        capital: "Tallinn",
        population: 1331057,
        area: "45,339 km²",
        currency: "Euro",
        language: "Estonian",
        flag: "https://flagcdn.com/ee.svg"
    },
    {
        id: 8,
        name: "Canada",
        capital: "Ottawa",
        population: 38005238,
        area: "9,984,670 km²",
        currency: "Canadian dollar",
        language: "English, French",
        flag: "https://flagcdn.com/ca.svg"
    },
    {
        id: 9,
        name: "Belarus",
        capital: "Minsk",
        population: 9398861,
        area: "207,595 km²",
        currency: "Belarusian ruble",
        language: "Belarusian, Russian",
        flag: "https://flagcdn.com/by.svg"
    },
    {
        id: 10,
        name: "Guyana",
        capital: "Georgetown",
        population: 786559,
        area: "214,970 km²",
        currency: "Guyanese dollar",
        language: "English",
        flag: "https://flagcdn.com/gy.svg"
    }
];

function renderCountries(arr) {
    elMainList.innerHTML = "";
    arr.forEach(item => {
        const cardItem = document.createElement("li");
        cardItem.className = "w-[300px] p-5 bg-white dark:bg-gray-700 rounded-lg shadow-lg transition transform hover:scale-105";
        cardItem.innerHTML = `
            <img src="${item.flag}" alt="Flag" class="rounded-md shadow-md w-full h-40 object-cover"/>
            <h2 class="font-bold mt-3 text-xl">Country: ${item.name}</h2>
            <p class="text-gray-600 dark:text-gray-300">Capital: ${item.capital}</p>
            <p class="text-gray-600 dark:text-gray-300">Population: ${item.population.toLocaleString()}</p>
            <div class="flex mt-4 space-x-3">
                <button class="rounded-full p-2 bg-gray-100 dark:bg-gray-600 hover:bg-red-200 transition">
                    <img src="./images/heart-icon.svg" alt="Heart Icon" width="28" height="28"/>
                </button>
                <button class="rounded-full p-2 bg-gray-100 dark:bg-gray-600 hover:bg-green-200 transition">
                    <img src="./images/save-icon.svg" alt="Save Icon" width="33" height="33"/>
                </button>
                <button class="more-btn rounded-full p-2 bg-gray-100 dark:bg-gray-600 hover:bg-blue-200 transition">
                    <img src="./images/more-icon.svg" alt="More Icon" width="30" height="30"/>
                </button>
            </div>
        `;
        elMainList.appendChild(cardItem);
    });

    const moreButtons = document.querySelectorAll('.more-btn');
    moreButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showCountryDetails(arr[index]);
        });
    });
}

function showCountryDetails(country) {
    document.getElementById('modalCountryName').textContent = `Country: ${country.name}`;
    document.getElementById('modalCountryCapital').textContent = `Capital: ${country.capital}`;
    document.getElementById('modalCountryPopulation').textContent = `Population: ${country.population.toLocaleString()}`;
    document.getElementById('modalCountryArea').textContent = `Area: ${country.area}`;
    document.getElementById('modalCountryCurrency').textContent = `Currency: ${country.currency}`;
    document.getElementById('modalCountryLanguage').textContent = `Language: ${country.language}`;
    document.getElementById('modalCountryFlag').src = country.flag;

    modal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(query)
    );
    renderCountries(filteredCountries);
});

function toggleTheme() {
    elBody.classList.toggle('dark-mode');
    if (elBody.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        elBody.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        elBody.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
    }
}

themeToggle.addEventListener('click', toggleTheme);

applySavedTheme();
renderCountries(countries);
