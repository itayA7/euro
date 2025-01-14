 const countryFlags = {
        //Europe
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
        "Romania":"RO",
        "Norway":"NO",
        "Wales":"wal",
        "Sweden":"SE",
        "Greece":"GR",
        "Ireland":"IE",
        "Kosovo":"XK",

        //America
        "Brazil":"BR",
        "Argentina":"arg",
        "United State":"US",
        "Colombia":"CO",
        "Uruguay":"UY",
        "Mexico":"MX",
        "Paraguay":"PY",
        "Ecuador":"EC",
        "New Zealand":"NZ",

        //Africa
        "Cameroon":"cam",
        "Ghana":"GH",
        "Jamaica":"JM",
        "Senegal":"SN",
        "Mali":"ML",
        "Nigeria":"NG",
        "Ivory Coast":"CI",
        "Morocco":"MA",
        "Guinea":"GN",

        //Asia
        "South Korea":"KR",
        "Egypt":"EG",
        "Japan":"JP",
        "Israel":"IL",

    };

 
    
    function getCountryCode(countryName) {
        return '../flags/'+countryFlags[countryName]+'.svg';
    }