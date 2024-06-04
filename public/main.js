document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById('playerName');
    const guessButton = document.getElementById('guessButton');
    const resultDiv = document.getElementById('result');
    const guessesDiv = document.getElementById('guesses');
    let targetPlayer;
    const difficultySelect = document.getElementById('difficultySelect');
    const popUpHint=document.getElementById('hintPopUp');
    const hintButton=document.getElementById("hintButton");
    
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
        console.log(`Target player: ${targetPlayer.name}`); // For debugging purposes
    }

    difficultySelect.addEventListener("change",()=>{
        askDifficulty();
    })

    // Ask user for difficulty level when the page loads
    askDifficulty();

    function autocomplete(inp, arr) {
        let currentFocus;

        inp.addEventListener("input", function(e) {
            let a, b, i, val = this.value;

            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;

            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);

            for (i = 0; i < arr.length; i++) {
                const fullName = arr[i].name;
                const firstName = fullName.split(' ')[0];
                const lastName = fullName.split(' ').slice(1).join(' ');
                
                if (firstName.substr(0, val.length).toUpperCase() === val.toUpperCase() || 
                    lastName.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + fullName.substr(0, val.length) + "</strong>";
                    b.innerHTML += fullName.substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + fullName + "'>";
                    b.addEventListener("click", function(e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });

   

        inp.addEventListener("keydown", function(e) {
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
            guessedPlayerAge=calculateAge(guessedPlayer.birthdate);
            targetPlayerAge=calculateAge(targetPlayer.birthdate);

            playerDiv.innerHTML = `
                <p>${guessedPlayer.name}</p>
                <p style="color:${compareAttributesColor(targetPlayer.team,guessedPlayer.team)}">${guessedPlayer.team}</p>
                <p style="color:${comparePositionColor(targetPlayer.position,guessedPlayer.position)}">${guessedPlayer.position} </p>
                <p  style="color:${compareNumAttributeColor(targetPlayerAge,guessedPlayerAge)}">${guessedPlayerAge} ${compareAttributes(targetPlayerAge,guessedPlayerAge)}</p>
                <p  style="color:${compareNumAttributeColor(targetPlayer.height,guessedPlayer.height)}">${guessedPlayer.height} ${compareAttributes(targetPlayer.height, guessedPlayer.height)}</p>
                <p style="color:${compareAttributesColor(targetPlayer.currentClub,guessedPlayer.currentClub)}">${guessedPlayer.currentClub} </p>
                <p style="color:${compareAttributesColor(targetPlayer.group,guessedPlayer.group)}">${guessedPlayer.group} </p>

                `;
            guessesDiv.appendChild(playerDiv);
            resultDiv.innerHTML = '';
            if(guessedPlayer.name==targetPlayer.name){
                resultDiv.innerHTML="Well Done!";
            }
        } else {
            resultDiv.innerHTML = 'Player not found';
        }
    });

    

    function hintPopUp(){
        popUpHint.style.display="block";
        popUpHint.innerHTML=targetPlayer.name;
    }

    hintButton.addEventListener("click",hintPopUp);
    



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

function compareAttributesColor(random,guess){
    if(random==guess)return "green";
    else return "red";
}

const footballPositions={
    "Defenders":['CB','RB','LB'],
    "Midfielders":['CM','CDM','CAM'],
    "Attackers":['CF','ST','RW','LW']
};

function posToArea(pos){
    if(footballPositions["Defenders"].includes(pos))return "Def";
    if(footballPositions["Midfielders"].includes(pos))return "Mid";
    if(footballPositions["Attackers"].includes(pos))return "Att";
    else return "GK";
}
function comparePositionColor(randomPos,guessPos){
    if(randomPos==guessPos)return "green";
    else if(posToArea(randomPos)==posToArea(guessPos))return "orange";
    else return "red";
}

function compareNumAttributeColor(targetNum,guessNum){
    const difference = Math.abs(targetNum - guessNum);
    if(targetNum==guessNum)return "green";
    else if(difference<=2)return "orange";
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