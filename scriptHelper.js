// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.


   const div = document.getElementById ("missionTarget");
   div.innerHTML = `
   <h2>Mission Destination</h2>
   <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src=${imageUrl}>
                 `;
}

function validateInput(testInput) {
    
    if(testInput === ""){
        return "Empty";
    } else if(isNaN(testInput)){
        return "Not a Number";
    } else if (!isNaN(testInput)){
        return "Is a Number";
    }
}
   

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    pilot = document.querySelector("input[name=pilotName]").value;
     copilot = document.querySelector("input[name=copilotName]").value;
       fuelLevel = document.querySelector("input[name=fuelLevel]").value;
          cargoLevel = document.querySelector("input[name=cargoMass]").value;
      list = document.getElementById(faultyItems);
      if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty"){
        alert("All fields are required");
      } else {
      if(validateInput(pilot) === "Not a Number"){
        if(validateInput(copilot) === "Not a Number"){
            if(validateInput(fuelLevel) === "Is a Number"){
                if(validateInput(cargoLevel) === "Is a Number"){
                    let pilotString = "Pilot " + pilot + " is ready for launch";
                    let copilotString = "Co-Pilot " +copilot+" is ready for launch";
                    document.getElementById("copilotStatus").innerHTML = copilotString;
                    document.getElementById("pilotStatus").innerHTML = pilotString;
                    if(fuelLevel < 10000){
                        document.getElementById("launchStatus").style.color = 'red';
                        document.getElementById("launchStatus").innerHTML = 'Shuttle not ready for launch';
                        document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";

                    } else if(cargoLevel > 10000){
                        document.getElementById("launchStatus").style.color = 'red';
                        document.getElementById("launchStatus").innerHTML = 'Shuttle not ready for launch';
                        document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
                    } else {
                        document.getElementById("launchStatus").style.color = 'green';
                        document.getElementById("launchStatus").innerHTML = 'Shuttle ready for launch';
                    }
                    document.getElementById("faultyItems").style.visibility = 'visible';

                } else {
                    alert('Cargo mass should be a number');
                }
            } else{
                alert('Fuel level should be a number');
            }
        } else{
            alert('Co-Pilot name should be a string');
        }

      } else {
        alert('Pilot name should be a string');
      }
    }

}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    const random = Math.floor(Math.random() * 5);
    let randomDest = planets[random];
    return randomDest;
    
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
