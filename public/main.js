let targetPlayer;
document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById('playerName');
    const guessButton = document.getElementById('guessButton');
    const resultDiv = document.getElementById('result');
    const guessesDiv = document.getElementById('guesses');
    const difficultySelect = document.getElementById('difficultySelect');
    const popUpHint = document.getElementById('hintPopUp');
    const hintButton = document.getElementById("hintButton");
    let popup = document.getElementById('popup')



    function askDifficulty() {
        const difficulty = difficultySelect.value;
        switch (difficulty) {
            case "easy":
                targetPlayer = easyPlayers[Math.floor(Math.random() * easyPlayers.length)];
                break;
            case "medium":
                targetPlayer = mediumPlayers[Math.floor(Math.random() * mediumPlayers.length)];
                break;
            case "hard":
                targetPlayer = players[Math.floor(Math.random() * players.length)];
                break;
            default:
                alert("Invalid selection. Please choose a valid option.");
                askDifficulty(); // Ask again until valid option is chosen
                break;
        }
        guessesDiv.innerHTML = '';
        resultDiv.innerHTML = '';
        popUpHint.style.display='none';
        resetAttributesDic();
    }

    askDifficulty();
    difficultySelect.addEventListener("change",askDifficulty);

   
    function autocomplete(inp, arr) {
        let currentFocus;
    
        inp.addEventListener("input", function (e) {
            let a, b, i, val = this.value;
    
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
    
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
    
            for (i = 0; i < arr.length; i++) {
                const fullName = arr[i].name;
                const firstName = fullName.split(' ')[0];
                const lastName = fullName.split(' ').slice(1).join(' ');
    
                if (firstName.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + firstName.substr(0, val.length) + "</strong>";
                    b.innerHTML += firstName.substr(val.length) + " " + lastName;
                    b.innerHTML += "<input type='hidden' value='" + fullName + "'>";
                    b.addEventListener("click", function (e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                } else if (lastName.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = firstName + " <strong>" + lastName.substr(0, val.length) + "</strong>";
                    b.innerHTML += lastName.substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + fullName + "'>";
                    b.addEventListener("click", function (e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
    
        inp.addEventListener("keydown", function (e) {
            let x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });
    
        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }
    
        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
    
        function closeAllLists(elmnt) {
            let x = document.getElementsByClassName("autocomplete-items");
            for (let i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
    
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }
    
    

    autocomplete(playerNameInput, players);

    guessButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.toLowerCase();
        const guessedPlayer = players.find(p => p.name.toLowerCase() === playerName);

        if (guessedPlayer) {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('guess-item');
            const guessedPlayerAge = calculateAge(guessedPlayer.birthdate);
            const targetPlayerAge = calculateAge(targetPlayer.birthdate);

            playerDiv.innerHTML = `
                <p>${guessedPlayer.name}</p>
                <img class="${compareNations(targetPlayer.team,guessedPlayer.team)}" src="${getCountryCode(guessedPlayer.team)}" alt="${guessedPlayer.team}">
                <p style="color:${comparePositionColor(targetPlayer.position, guessedPlayer.position)}">${guessedPlayer.position} </p>
                <p style="color:${compareNumAttributeColor(targetPlayerAge, guessedPlayerAge)}">${guessedPlayerAge} ${compareAttributes(targetPlayerAge, guessedPlayerAge)}</p>
                <p style="color:${compareNumAttributeColor(targetPlayer.height, guessedPlayer.height)}">${guessedPlayer.height} ${compareAttributes(targetPlayer.height, guessedPlayer.height)}</p>
                <p style="color:${compareAttributesColor(targetPlayer.currentClub, guessedPlayer.currentClub)}">${guessedPlayer.currentClub}</p>
                <p style="color:${compareAttributesColor(targetPlayer.group, guessedPlayer.group)}">${guessedPlayer.group}</p>
            `;
            guessesDiv.appendChild(playerDiv);
            resultDiv.innerHTML = '';
            if (guessedPlayer.name == targetPlayer.name) {
                openPopup();
            }
        } 
        else {
            resultDiv.innerHTML = 'Player not found';
        }
    });

  
    function hintPopUp() {
        if(popUpHint.style.display=== "none") {
            const availableAttributes = Object.keys(playersAttributes).filter(attr => !playersAttributes[attr]);
            if (availableAttributes.length > 0) {
                const randomAttribute = availableAttributes[Math.floor(Math.random() * availableAttributes.length)];
                popUpHint.innerHTML = playersAttributesToText[randomAttribute] + ": " + targetPlayer[randomAttribute];
                playersAttributes[randomAttribute] = true;
            } 
            else {
                popUpHint.innerHTML = "No more hints available.";
            }
            popUpHint.style.display="block";
        }
        else{
            popUpHint.style.display="none";
        }       
    }




    hintButton.addEventListener("click", hintPopUp);
});

function compareAttributes(targetValue, guessedValue) {
    if (guessedValue < targetValue) {
        return '<span>&#8593;</span>'; // Up arrow
    } else if (guessedValue > targetValue) {
        return '<span>&#8595;</span>'; // Down arrow
    } else {
        return '';
    }
}

function compareAttributesColor(random, guess) {
    return random == guess ? 'green' : 'red';
}

function compareNations(random,guess){
    return random==guess? 'flag-green' : 'flag-red';
}



const footballPositions = {
    "Defenders": ['CB', 'RB', 'LB'],
    "Midfielders": ['CM', 'CDM', 'CAM'],
    "Attackers": ['CF', 'ST', 'RW', 'LW']
};

const playersAttributes = {
    "team": false,
    "position": false,
    "height": false,
    "currentClub": false,
    "group": false
};

const playersAttributesToText={
    "team":"National Team",
    "position":"The Player's osition",
    "height":"Height(cm)",
    "currentClub":"Current Club",
    "group":"Group Stage"
}

function resetAttributesDic() {
    for (let key in playersAttributes) {
            playersAttributes[key] = false;
        }
}


function posToArea(pos) {
    if (footballPositions["Defenders"].includes(pos)) return "Def";
    if (footballPositions["Midfielders"].includes(pos)) return "Mid";
    if (footballPositions["Attackers"].includes(pos)) return "Att";
    else return "GK";
}

function comparePositionColor(randomPos, guessPos) {
    if (randomPos == guessPos) return "green";
    else if (posToArea(randomPos) == posToArea(guessPos)) return "orange";
    else return "red";
}

function compareNumAttributeColor(targetNum, guessNum) {
    const difference = Math.abs(targetNum - guessNum);
    if (targetNum == guessNum) return "green";
    else if (difference <= 2) return "orange";
    else return "red";
}

function calculateAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthdate hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}


function openPopup(isUserRight=true){
  const phrases=["Great!","Well Done!","Nice!"];
  var randomPhrase;
  var image;
  switch (targetPlayer.team||targetPlayer.name) {
    case "Italy":
        image="../flags/rome.gif";
        randomPhrase="It's Coming to ROME";
        break;
    case "Cristiano Ronaldo":
        randomPhrase="Siuuuuuuuuuuuu";
        image=getCountryCode(targetPlayer.team);
        break;
    case "England":
        randomPhrase="It's Coming Home";
        image=getCountryCode(targetPlayer.team);
        break;
    default:
        image=getCountryCode(targetPlayer.team);
        randomPhrase =phrases[Math.floor(Math.random() * phrases.length)];
  }
  randomPhrase=isUserRight?randomPhrase:"Try Again!"
  document.getElementById("resultFlag").src=image;
  document.getElementById("popUpResult").innerHTML="The Player was: "+targetPlayer.name;
  document.getElementById("popUpHeader").innerHTML=randomPhrase;
  popup.classList.add('open-popup')
}

function closePopup(){
  popup.classList.remove('open-popup')
}

function restart(){
    window.location.reload();
}