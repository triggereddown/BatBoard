function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var allFullElems = document.querySelectorAll(".fullElem");
  var allFullElemsBackBtn = document.querySelectorAll(".fullElem .back");
  allElems.forEach(function (elem) {
    //console.log(elem.id);
    elem.addEventListener("click", function () {
      allFullElems[elem.id].style.display = "block";
    });
  });

  allFullElemsBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      allFullElems[back.id].style.display = "none";
    });
  });
}

openFeatures();

// function openFeatures() {
//     var allElems = document.querySelectorAll('.elem')
//     var fullElemPage = document.querySelectorAll('.fullElem')
//     var fullElemPageBackBtn = document.querySelectorAll('.fullElem .back')

//     allElems.forEach(function (elem) {
//         elem.addEventListener('click', function () {
//             fullElemPage[elem.id].style.display = 'block'
//         })
//     })

//     fullElemPageBackBtn.forEach(function (back) {
//         back.addEventListener('click', function () {
//             fullElemPage[back.id].style.display = 'none'
//         })
//     })
// }

// openFeatures()

function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is Empty");
  }

  function renderTask() {
    var allTask = document.querySelector(".allTask");

    var sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>Mark as Completed</button>
        </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();

    taskCheckbox.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}

todoList();

function dailyPlanner() {}

dailyPlanner();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";

    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
</div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      //console.log('hello');
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

function motivationalQuotes() {
  var motivationalQuoteContent = document.querySelector(".motivation-2 h1");
  var motivationaalAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    try {
      let response = await fetch(
        "https://api.api-ninjas.com/v2/quotes?categories=success,wisdom",
        {
          method: "GET",
          headers: {
            "X-Api-Key": "1ZfcuJQ517iU5MM/hnOP4A==LAopVZTdswFKeV3n",
          },
        }
      );
      let data = await response.json();
      motivationalQuoteContent.innerHTML = data[0].quote;
      motivationaalAuthor.innerHTML = data[0].author;
    } catch (err) {
      console.log(err);
      motivationalQuoteContent = "Batman is the best motivator";
      motivationaalAuthor = "Trigger Batman";
    }
  }
  fetchQuote();
}
motivationalQuotes();

// function motivationalQuote() {
//     var motivationQuoteContent = document.querySelector('.motivation-2 h1')
//     var motivationAuthor = document.querySelector('.motivation-3 h2')

//     async function fetchQuote() {
//         let response = await fetch('https://zenquotes.io/api/random')
//         let data = await response.json()

//         motivationQuoteContent.innerHTML = data.content
//         motivationAuthor.innerHTML = data.author
//     }

//     fetchQuote()
// }

// motivationalQuote()

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  var startBtn = document.querySelector(".pomo-timer .start-timer");
  var pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  var resetBtn = document.querySelector(".pomo-timer .reset-timer");
  var session = document.querySelector(".pomodoro-fullpage .session");
  var isWorkSession = true;

  let totalSeconds = 25 * 60;
  let timerInterval = null;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--blue)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerInterval);
    updateTimer();
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}

pomodoroTimer();

var apiKey = "458619f10cce4d71a41170345251812";
var city = "Kolkata";

// async function weatherAPICall() {
//   try {
//     let response = await fetch(
//       `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
//     );

//     let data = await response.json();
//     console.log(data); // ✅ actual weather data
//   } catch (error) {
//     console.error("Error fetching weather:", error);
//   }
// }

// weatherAPICall();

function weatherFunctionality() {
  // I have removed API key for security purpose

  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var header2Temp = document.querySelector(".header2 h2");
  var header2Condition = document.querySelector(".header2 h4");
  var precipitation = document.querySelector(".header2 .precipitation");
  var humidity = document.querySelector(".header2 .humidity");
  var wind = document.querySelector(".header2 .wind");

  var data = null;

  async function weatherAPICall() {
    var response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    data = await response.json();

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    header2Condition.innerHTML = `${data.current.condition.text}`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}%`;
  }

  weatherAPICall();

  function timeDate() {
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();
    var dayOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var tarik = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();

    header1Date.innerHTML = `${tarik} ${month}, ${year}`;

    if (hours > 12) {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} PM`;
    } else {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} AM`;
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}

weatherFunctionality();

// function changeTheme() {
//   var theme = document.querySelector(".theme");
//   var rootElement = document.documentElement;

//   var flag = 0;
//   theme.addEventListener("click", function () {
//     if (flag == 0) {
//       rootElement.style.setProperty("--pri", "#F8F4E1");
//       rootElement.style.setProperty("--sec", "#222831");
//       rootElement.style.setProperty("--tri1", "#948979");
//       rootElement.style.setProperty("--tri2", "#393E46");
//       flag = 1;
//     } else if (flag == 1) {
//       rootElement.style.setProperty("--pri", "#F1EFEC");
//       rootElement.style.setProperty("--sec", "#030303");
//       rootElement.style.setProperty("--tri1", "#D4C9BE");
//       rootElement.style.setProperty("--tri2", "#123458");
//       flag = 2;
//     } else if (flag == 2) {
//       rootElement.style.setProperty("--pri", "#F8F4E1");
//       rootElement.style.setProperty("--sec", "#381c0a");
//       rootElement.style.setProperty("--tri1", "#FEBA17");
//       rootElement.style.setProperty("--tri2", "#74512D");
//       flag = 0;
//     }
//   });
// }

// changeTheme();

function changeTheme() {
  var theme = document.querySelector(".theme");
  var rootElement = document.documentElement;

  // Select all feature images
  var featureImages = document.querySelectorAll(".allFeatures img");

  // Image sets for each theme (order matters)
  var themeImages = [
    // Theme 0
    [
      "https://images.unsplash.com/photo-1611526114392-8d8e229f511d",
      "https://images.unsplash.com/photo-1630421408187-014cbfdb965d",
      "https://images.unsplash.com/photo-1694747993968-c5beea3b5c88",
      "https://images.unsplash.com/photo-1542410613-d073472c3135",
      "https://i.pinimg.com/1200x/31/3c/de/313cde3d2abe354a865386ec22750100.jpg",
    ],

    // Theme 1
    [
      "https://images.unsplash.com/photo-1563564120768-da63ef4f7446?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1632179008519-c1dd068f9bdc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1590171275368-bb7d215b2519?q=80&w=1154&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1675848493910-5474ee04c3e3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1667592157310-2fea7127ce8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],

    // Theme 2
    [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    ],
  ];

  var flag = 0;

  theme.addEventListener("click", function () {
    if (flag === 0) {
      rootElement.style.setProperty("--pri", "#F1EFEC");
      rootElement.style.setProperty("--sec", "#ff00aaff");
      rootElement.style.setProperty("--tri1", "#ffe600ff");
      rootElement.style.setProperty("--tri2", "#00bbffff");

      document.querySelector("#main").style.background =
        "linear-gradient(135deg, #f10adaff, #feb1faff)";

      document.querySelector(".nav-in").style.background =
        "linear-gradient(135deg, rgba(245, 159, 255, 1), #ffdff8ff)";

      flag = 1;
    } else if (flag === 1) {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#818cf8");
      rootElement.style.setProperty("--tri1", "#948979");
      rootElement.style.setProperty("--tri2", "#393E46");

      document.querySelector("#main").style.background =
        "linear-gradient(135deg, #222831, #000000)";

      document.querySelector(".nav-in").style.background =
        "linear-gradient(135deg, #222831, #393E46)";

      flag = 2;
    } else {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#321b0fff");
      rootElement.style.setProperty("--tri1", "#c48f13ff");
      rootElement.style.setProperty("--tri2", "");

      document.querySelector("#main").style.background =
        "linear-gradient(135deg, #ffb514ff, #ffae00ff)";

      document.querySelector(".nav-in").style.background =
        "linear-gradient(135deg, #818cf8, #6574faff)";

      flag = 0;
    }

    featureImages.forEach(function (img, index) {
      img.src = themeImages[flag][index];
    });
  });
}

changeTheme();
