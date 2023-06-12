const myHeaders = new Headers();
myHeaders.append("apikey", "hZDnJY2uBvS3MqkH7l6IvSn1akEUNTNI");


const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    const select1 = document.getElementById('select1');
    const select2 = document.getElementById('select2');
    const select1Wrapper = document.getElementById('select1-wrapper');
    const select2Wrapper = document.getElementById('select2-wrapper');
    // Create the default options
    const defaultOption1 = document.createElement('option');
    defaultOption1.disabled = true;
    defaultOption1.selected = true;
    defaultOption1.textContent = 'FROM :';
    const defaultOption2 = document.createElement('option');
    defaultOption2.disabled = true;
    defaultOption2.selected = true;
    defaultOption2.textContent = 'TO :';
    // Append the default options to the select elements
    select1.appendChild(defaultOption1);
    select2.appendChild(defaultOption2);
    
    // Iterate over the countries
    for (const country in data) {
        if (data.hasOwnProperty(country)) {
            const currencies = data[country].currencies;

            // Iterate over the currencies in each country
            for (const currency in currencies) {
                if (currencies.hasOwnProperty(currency)) {
                    // Get the currency code (3 letters)
                    const currencyCode = currency;

                    // Create the option element
                    const option1 = document.createElement('option');
                    option1.value = currencyCode;
                    option1.textContent = currencyCode;

                    const option2 = document.createElement('option');
                    option2.value = currencyCode;
                    option2.textContent = currencyCode;

                    // Append the options to the select elements
                    select1.appendChild(option1);
                    select2.appendChild(option2);
                }
            }

            // Create and insert flag image element for select1-wrapper
            const flagUrl1 = data[country].flags.png;
            const imgElement1 = document.createElement("img");
            imgElement1.src = flagUrl1;
            select1Wrapper.insertBefore(imgElement1, select1Wrapper.firstChild);
            console.log(flagUrl1);

            // Create and insert flag image element for select2-wrapper
            const flagUrl2 = data[country].flags.png;
            const imgElement2 = document.createElement("img");
            imgElement2.src = flagUrl2;
            select2Wrapper.insertBefore(imgElement2, select2Wrapper.firstChild);
        }
    }
    // Add event listener to select1
    select1.addEventListener('change', (event) => {
        const selectedCurrencyCode = event.target.value;
        const selectedFlag1 = select1Wrapper.querySelector('img');
        const selectedCountry1 = data.find(country_1 => country_1.currencies[selectedCurrencyCode]);

        if (selectedCountry1) {
            const selectedFlagUrl1 = selectedCountry1.flags.png;
            selectedFlag1.src = selectedFlagUrl1;
        }
    });
    // Add event listener to select2
    select2.addEventListener('change', (event_1) => {
        const selectedCurrencyCode_1 = event_1.target.value;
        const selectedFlag2 = select2Wrapper.querySelector('img');
        const selectedCountry2 = data.find(country_2 => country_2.currencies[selectedCurrencyCode_1]);

        if (selectedCountry2) {
            const selectedFlagUrl2 = selectedCountry2.flags.png;
            selectedFlag2.src = selectedFlagUrl2;
        }
    });
};

fetchCountries();

// Retrieve the button element
const convertButton = document.querySelector('.button-17');

// Add event listener to the button
convertButton.addEventListener('click', () => {
    // Get the selected currency codes and amount
    const fromCurrency = select1.value;
    const toCurrency = select2.value;
    const amounts = amount.value;

    // Construct the API URL with the variables
    const apiUrl = `https://api.apilayer.com/currency_data/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amounts}`;

    // Make the API request
    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Extract the result number from the API response
            const result = data.result;

            // Display the result in the result div
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<table border="1px"><th>Result: ${result}</th></table>`;
        })
        .catch(error => console.log('error', error));
});




