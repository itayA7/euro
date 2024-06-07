 const countryFlags = {
        "Germany": "DE",
        "Spain": "ES",
        "England": "GB",
        "Portugal": "PT",
        "Italy": "IT",
        "Belgium": "BE",
        "Hungary": "HU",
        "Denmark": "DK",
        "France":"FR",
        "Serbia":"RS",
        "Netherlands":"NL",
        "Georgia":"GE",
        "Czech Republic":"CZ"
    };

 
    
    function getCountryCode(countryName) {
        return '../flags/'+countryFlags[countryName]+'.svg';
    }