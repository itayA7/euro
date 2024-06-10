 const countryFlags = {
        "Germany": "DE",
        "Spain": "ES",
        "England": "eng",
        "Portugal": "PT",
        "Italy": "IT",
        "Belgium": "BE",
        "Hungary": "HU",
        "Denmark": "DK",
        "France":"FR",
        "Serbia":"RS",
        "Netherlands":"NL",
        "Georgia":"GE",
        "Czech Republic":"CZ",
        "Turkey":"TR",
        "Ukraine":"UA",
        "Austria":"AT",
        "Poland":"PL",
        "Scotland":"sco",
        "Switzerland":"CH",
        "Croatia":"HR",
        "Slovenia":"SI",
        "Slovakia":"SK",
        "Romania":"RO"
    };

 
    
    function getCountryCode(countryName) {
        return '../flags/'+countryFlags[countryName]+'.svg';
    }