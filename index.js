const API_KEY = "322b172e-be69-4960-967a-a59eda7d54ca"; 
const search = document.querySelector("#search-query");
const year = document.querySelector("#year-query");
const month = document.querySelector("#month-query");
const day = document.querySelector("#day-query");
const country = document.querySelector("#country-query");
const language = document.querySelector("#language-query");
let allCountriesList;
let allLanguagesList;

// HOLIDAYS OF THE COUNTRIES
const buttonHolidaysList = document.querySelector("#holidays-btn");

const getHolidays = async () => {
    try {
        let queryString = "";
        if (search.value) {
            queryString += `&search=${search.value}`;
        } else {
            if(!country.value) {
                queryString += `&country=VN`;
            } 
        }
        if (!year.value) {
            queryString += `&year=2023`;
        } else {
            queryString += `&year=${year.value}`;
        }
        if (month.value) {
            queryString += `&month=${month.value}`;
        }
        if (day.value) {
            queryString += `&day=${day.value}`;
        }
        if (country.value) {
            queryString += `&country=${country.value.toUpperCase()}`;
        } 
        
        if (language.value) {
            queryString += `&language=${language.value.toLowerCase()}`;
        }


        const url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}${queryString}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        return data;
        // console.log(queryString);

    } catch (error) {
        console.log("error", error);
    }
}

// getHolidays();


const renderHolidays = async () => {
    try {
        const data = await  getHolidays();
        console.log(data);
        const holidaysList = document.querySelector("#holidays-list");
        const ulHolidaysList = holidaysList.children[1];
        ulHolidaysList.innerHTML = "";
        
        data.holidays.forEach((holiday, index) => {
            const x = document.createElement("li");
            x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${holiday.name}</div>
                <div class="li-text">${holiday.weekday.date.name} - ${holiday.date}</div>
            </div>`;

        ulHolidaysList.appendChild(x);
        })

    } catch (error) {
        console.log("error", error);
    }
}


function letCountryName(countryValue) {
    if(!countryValue) {
        return "Viet Nam";
    } else {
        for (i = 0; i < allCountriesList.length; i++) {
            if (allCountriesList[i].code === countryValue.toUpperCase()) {
                return allCountriesList[i].name;
        }
    }
} 
}

const holidaysTitle = document.querySelector("#holidays-title");

function displayNameTitle(countryName) {
    if(!country.value) {
        if(search.value) {
            return `Holidays all of countries`;
        }
    }
    return `Holidays in ${countryName}`;
}



buttonHolidaysList.addEventListener("click", async function ()  {
    if(!allCountriesList) {
        allCountriesList = await getCountries();
    }
    let languageCheck = false;
    if(language.value) {
        if(!allLanguagesList) {
            allLanguagesList = await getLanguages();
        }
        for (let i = 0; i < allLanguagesList.length; i++) {
            if (allLanguagesList[i].code === language.value.toUpperCase()) {
                languageCheck = true;
                break;
            }
        }
    } else {
        languageCheck = true;
    }

    let isCheck = false;
    if(!country.value) {
        isCheck = true;
    } else {
        for (let i = 0; i < allCountriesList.length; i++) {
            if (allCountriesList[i].code === country.value.toUpperCase()) {
                isCheck = true;
                break;
            }
        }
    }
    if (isCheck && languageCheck) {
        getHolidays();
        renderHolidays();
        let countryName = letCountryName(country.value);
        holidaysTitle.innerHTML = displayNameTitle(countryName);
    } else if(!isCheck) {
        alert(`${country.value} does not match the country list!`);
        return;
    } else {
        alert(`${language.value} does not match the language list!`);
    }


})

// COUNTRIES LIST
const buttonCountriesList = document.querySelector("#countries-list-btn");

const getCountries = async () => {
    try {
      const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`;
      //here is how we add a dynamic value (API KEY) to the url
      const response = await fetch(url);
      const data = await response.json();
    //   console.log("data", data); //have a look the retrieved data
      return data.countries;
    } catch (err) {
      console.log("err", err);
    }
  };

  const renderCountries = async () => {
    try {
      //1. Fetch all the countries by using function `getCountries`
      const data = await getCountries();
    //   console.log(data.countries);
  
      //2. Find the element with the id `countries-list`
      const countriesList = document.getElementById("countries-list");
  
      //3. Take out the `ul` element
      const ulCountriesList = countriesList.children[2];
  
      //4. Delete the sample inside `ul` element
      ulCountriesList.innerHTML = "";
  
      //5. Loop through the list of countries
      data.forEach((country, index) => {
        //Create new `li` for each element
        const x = document.createElement("li");
        x.innerHTML = `<div class="bullet">${index + 1}</div>
              <div class="li-wrapper">
                  <div class="li-title">${country.name}</div>
                  <div>Code: ${country.code}</div>
              </div>`;
  
        //Then append them to the `ul` element
        ulCountriesList.appendChild(x);
      });
    } catch (err) {
      console.log("err", err);
    }
  };

//   renderCountries()
//   getCountries();

buttonCountriesList.addEventListener("click", () => {
    getCountries();
    renderCountries();
})

// LANGUAGES LIST 
buttonLanguagesList = document.querySelector("#languages-list-btn");

const getLanguages = async () => {
    try {
        const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("data", data);
        return data.languages;
    } catch (error) {
        console.log('err', err);
    }
}

async function renderLanguages() {
    try {
        //1. Fetch all the languages by using function `getLanguages()`
      const data = await getLanguages();
    //   console.log(data.languages);
    
        //2. Find the element with the id `languages-list`
        const languagesList = document.getElementById("languages-list");
    
        //3. Take out the `ul` element
        const ulLanguagesList = languagesList.children[2];
    
        //4. Delete the sample inside `ul` element
        ulLanguagesList.innerHTML = "";
    
        //5. Loop through the list of languages
        data.forEach((language, index) => {
          //Create new `li` for each element
          const x = document.createElement("li");
          x.innerHTML = `<div class="bullet">${index + 1}</div>
                <div class="li-wrapper">
                    <div class="li-title">${language.name}</div>
                    <div>Code: ${language.code}</div>
                </div>`;
    
          //Then append them to the `ul` element
          ulLanguagesList.appendChild(x);
        });

        
    } catch (error) {
        console.log("error", error);
    }
}
// getLanguages();
// renderLanguages();

buttonLanguagesList.addEventListener("click", () => {
    getLanguages();
    renderLanguages();
})

