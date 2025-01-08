 function countdown(dateEnd) {
  var timer, days, hours, minutes, seconds;

  dateEnd = new Date(dateEnd);
  dateEnd = dateEnd.getTime();

  if ( isNaN(dateEnd) ) {
    return;
  }

  timer = setInterval(calculate, 1000);

  function calculate() {
    var dateStart = new Date();
    var dateStart = new Date(dateStart.getUTCFullYear(),
                             dateStart.getUTCMonth(),
                             dateStart.getUTCDate(),
                             dateStart.getUTCHours(),
                             dateStart.getUTCMinutes(),
                             dateStart.getUTCSeconds());
                             
    var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)

    if ( timeRemaining >= 0 ) {
      days    = parseInt(timeRemaining / 86400);
      timeRemaining   = (timeRemaining % 86400);
      hours   = parseInt(timeRemaining / 3600);
      timeRemaining   = (timeRemaining % 3600);
      minutes = parseInt(timeRemaining / 60);
      timeRemaining   = (timeRemaining % 60);
      seconds = parseInt(timeRemaining);

      document.getElementById("days").innerHTML    = parseInt(days, 10);
      document.getElementById("hours").innerHTML   = ("0" + hours).slice(-2);
      document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
      document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
    } else {
      return;
    }
  }

  function display(days, hours, minutes, seconds) {}
}

const getTimeNow = () => {
  const timeNow = new Date(); 

const year = timeNow.getFullYear();
const month = String(timeNow.getMonth() + 1).padStart(2, '0'); 
const day = String(timeNow.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

return formattedDate;
}


const SendtoDHIS = (event) => {
  event.preventDefault();

  const myHeaders = new Headers();
  const originUrl = location.origin;
  const emailInput = document.querySelector('input[name="email"]');
  const emailValue = emailInput.value;
  const encodedCredentials = 'ZGF0YWVudHJ5OjEyMzQ1NkBEYXRh';

  const timeNow = getTimeNow();


myHeaders.append("Accept", "application/json");
myHeaders.append("Accept-Encoding", "gzip, deflate, br, zstd");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Authorization", "Basic "+encodedCredentials);

const raw = JSON.stringify({
  "events": [
    {
      "occurredAt": timeNow,
      "status": "COMPLETED",
      "notes": [],
      "completedAt": timeNow,
      "program": "V428ghrDulJ",
      "programStage": "j7rgrc8aU3q",
      "orgUnit": "Hk5qXDPGMfk",
      "dataValues": [
        {
          "dataElement": "i2p0tUCMNje",
          "value": originUrl
        },
        {
          "dataElement": "lcQjQOM9Ofz",
          "value": "Maillist"
        },
        {
          "dataElement": "rBpFToTyzph",
          "value": emailValue
        }
      ]
    }
  ]
});

console.log({raw, myHeaders})

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://dhis.atsl.co.ke/api/40/tracker?async=false", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

  return false;
}

window.onload = function() {
    var preloader = document.getElementsByClassName('preloader')[0];
    setTimeout(function(){
        preloader.style.display = 'none';
    }, 500);
};
