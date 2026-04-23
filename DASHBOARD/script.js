// =======================
// 1. CHECKLIST SAVE SYSTEM
// =======================

const checkboxes = document.querySelectorAll(".check");

// Load saved state
window.onload = function () {
  checkboxes.forEach((box, index) => {
    let saved = localStorage.getItem("check_" + index);
    if (saved === "true") {
      box.checked = true;
    }
  });

  updateStatus();
  updateRisk();
};

// Save state on change
checkboxes.forEach((box, index) => {
  box.addEventListener("change", () => {
    localStorage.setItem("check_" + index, box.checked);
    updateStatus();
  });
});

// =======================
// 2. ADD ALERT FUNCTION
// =======================

function addAlert() {
  let input = document.getElementById("alertInput");
  let text = input.value;

  if (text === "") return;

  let li = document.createElement("li");
  li.innerHTML = "⚠️ " + text + " <button onclick='removeAlert(this)'>❌</button>";

  document.getElementById("alertList").appendChild(li);

  input.value = "";

  updateRisk();
}

// =======================
// 3. REMOVE ALERT
// =======================

function removeAlert(btn) {
  btn.parentElement.remove();
  updateRisk();
}

// =======================
// 4. UPDATE FARM STATUS
// =======================

function updateStatus() {
  const total = checkboxes.length;
  let checked = 0;

  checkboxes.forEach(box => {
    if (box.checked) checked++;
  });

  let statusText;

  if (checked === total) {
    statusText = "✅ Safe";
  } else if (checked >= total / 2) {
    statusText = "⚠️ Moderate Risk";
  } else {
    statusText = "❌ High Risk";
  }

  document.querySelector(".box:nth-child(3)").innerHTML =
    "<h2>📊 Farm Status</h2><p>" + statusText + "</p>";
}

// =======================
// 5. UPDATE RISK COUNT
// =======================

function updateRisk() {
  let alerts = document.querySelectorAll("#alertList li").length;

  document.getElementById("riskCount").innerText = alerts * 10;
}
// =======================
// 6. SAVE CARD DATA
// =======================

function saveData() {
  let total = document.getElementById("totalAnimals").value;
  let healthy = document.getElementById("healthyAnimals").value;
  let visitors = document.getElementById("visitors").value;


  localStorage.setItem("totalAnimals", total);
  localStorage.setItem("healthyAnimals", healthy);
  localStorage.setItem("visitors", visitors);



  updateRiskFromData();

  alert("Data Saved Successfully!");
}

// =======================
// 7. LOAD CARD DATA
// =======================

function loadData() {
  document.getElementById("totalAnimals").value =
    localStorage.getItem("totalAnimals") || 0;

  document.getElementById("healthyAnimals").value =
    localStorage.getItem("healthyAnimals") || 0;

  document.getElementById("visitors").value =
    localStorage.getItem("visitors") || 0;

  updateRiskFromData();
}

// =======================
// 8. AUTO CALCULATE RISK
// =======================

function updateRiskFromData() {
  let total = parseInt(document.getElementById("totalAnimals").value) || 0;
  let healthy = parseInt(document.getElementById("healthyAnimals").value) || 0;

  let risk = total - healthy;

  document.getElementById("riskCount").innerText = risk;
}

// =======================
// LOAD EVERYTHING
// =======================

window.onload = function () {
  loadData();
};
let chart;

// =======================
// 9. CREATE CHART
// =======================

// function createChart(total, healthy, risk) {
//   const ctx = document.getElementById("farmChart").getContext("2d");

//   if (chart) {
//     chart.destroy(); // refresh chart
//   }

//   chart = new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: ["Total", "Healthy", "At Risk"],
//       datasets: [{
//         label: "Farm Data",
//         data: [total, healthy, risk],
//       }]
//     },
//     options: {
//       responsive: true,
//     }
//   });
// }

// // =======================
// // UPDATE CHART
// // =======================

// function updateChartFromData() {
//   let total = parseInt(document.getElementById("totalAnimals").value) || 0;
//   let healthy = parseInt(document.getElementById("healthyAnimals").value) || 0;
//   let risk = total - healthy;

//   createChart(total, healthy, risk);
// }