const getCOVID = async () => {
    const response = await fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=US", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
            "x-rapidapi-key": "1c19e85651msh616f36790c5f4a5p117a06jsneedad279cef1"
        }
    });
    const data = await response.json();
    const covid = data.data.covid19Stats;
   
    console.log(data);

    //number by county
    let deaths;
    let cases;
    let recovered;

    //total number in Maryland
    let totalDeaths = 0;
    let totalCases = 0;
    let totalRecovered = 0;
    for(let i = 0; i < covid.length; i++){
        if(covid[i].province === 'Maryland'){
            let maryland = covid[i];
            let city = maryland.city;

            deaths = maryland.deaths;
            cases = maryland.confirmed;
            recovered = maryland.recovered;

            totalDeaths += deaths; //adding up the deaths by county
            totalCases += cases; //adding up the cases by county
            totalRecovered += recovered;
            if(city === 'Unassigned'){
                continue;
            } else{
                console.log(`${city} County: ${deaths} deaths with ${cases} confirmed cases`);
            }
            console.log();
        }
    }
    const marylandDeath = document.getElementById('death-toll');
    const marylandCases = document.getElementById('cases');
    const marylandRecoveries = document.getElementById('recovery');


    marylandDeath.innerHTML = `<b>${totalDeaths}</b>`;
    marylandCases.innerHTML = `<b>${totalCases}</b>`
    marylandRecoveries.innerHTML = `<b>${totalRecovered}</b>`;
    
    const selectedCounty = document.querySelector('.selection');

    selectedCounty.addEventListener('change', (city) => {
        city = selectedCounty.value;
        let maryland;
        let county;
        let countyDeaths;
        let countyCases;
        let countyRevival;
        for(let i = 0; i < covid.length; i++){
            if(covid[i].province === 'Maryland'){
                maryland = covid[i];
                county = maryland.city;
                if(city === county){
                    countyDeaths = maryland.deaths;
                    countyCases = maryland.confirmed;
                    countyRevival = maryland.recovered;
                }
                console.log();
            }
        }

        const caseInCounty = document.getElementById('casesInCounty');
        const deathInCounty = document.getElementById('death-tollInCounty');
        const recoveryInCounty = document.getElementById('recoveryInCounty');

        caseInCounty.innerHTML = `<b>${countyCases}</b>`
        deathInCounty.innerHTML = `<b>${countyDeaths}</b>`
        recoveryInCounty.innerHTML = `<b>${countyRevival}</b>`

        console.log(`${city} County: ${countyDeaths} deaths with ${countyCases} confirmed cases`);
    });


};

getCOVID();