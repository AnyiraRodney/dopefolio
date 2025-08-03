// Sidebar Navigation
document.querySelectorAll(".sidebar li").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".sidebar li").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".section").forEach(el => el.classList.remove("active-section"));
    tab.classList.add("active");
    const target = tab.dataset.target;
    document.getElementById(target).classList.add("active-section");
  });
});

// Members Section
const memberForm = document.getElementById("member-form");
const memberList = document.getElementById("member-list");
let memberCount = 0;

memberForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("member-name").value.trim();
  if (name) {
    const li = document.createElement("li");
    li.textContent = name;
    memberList.appendChild(li);
    memberForm.reset();
    memberCount++;
    document.getElementById("total-members").textContent = memberCount;
  }
});

// Loans Section
const loanForm = document.getElementById("loan-form");
const loanList = document.getElementById("loan-list");
let totalLoans = 0;

loanForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("loan-member").value.trim();
  const amount = parseFloat(document.getElementById("loan-amount").value);
  if (name && !isNaN(amount)) {
    const li = document.createElement("li");
    li.textContent = `${name} borrowed Ksh ${amount}`;
    loanList.appendChild(li);
    loanForm.reset();
    totalLoans += amount;
    document.getElementById("total-loans").textContent = `Ksh ${totalLoans}`;
  }
});

// Contributions Section
const contributionForm = document.getElementById("contribution-form");
const contributionList = document.getElementById("contribution-list");
let totalContributions = 0;

contributionForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("contributor-name").value.trim();
  const amount = parseFloat(document.getElementById("contribution-amount").value);
  const date = document.getElementById("contribution-date").value;
  if (name && !isNaN(amount) && date) {
    const li = document.createElement("li");
    li.textContent = `${name} contributed Ksh ${amount} on ${date}`;
    contributionList.appendChild(li);
    contributionForm.reset();
    totalContributions += amount;
    document.getElementById("total-contributions").textContent = `Ksh ${totalContributions}`;
  }
});

// Tracker Section Dummy Data
const trackerStats = {
  totalMembers: 4,
  totalContributions: 3500,
  totalLoans: 5000,
};

const activityLog = [
  { date: "2025-08-01", member: "Alice", action: "Contribution", amount: 1500 },
  { date: "2025-08-01", member: "Brian", action: "Loan", amount: 5000 },
  { date: "2025-08-02", member: "Clara", action: "Contribution", amount: 2000 },
  { date: "2025-08-02", member: "David", action: "Loan Repayment", amount: 1000 },
];

function updateTracker() {
  document.getElementById("total-members").textContent = trackerStats.totalMembers;
  document.getElementById("total-contributions").textContent = `Ksh ${trackerStats.totalContributions}`;
  document.getElementById("total-loans").textContent = `Ksh ${trackerStats.totalLoans}`;

  const activityBody = document.getElementById("activity-log");
  activityBody.innerHTML = "";
  activityLog.forEach(({ date, member, action, amount }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${date}</td>
      <td>${member}</td>
      <td>${action}</td>
      <td>Ksh ${amount}</td>
    `;
    activityBody.appendChild(row);
  });
}
updateTracker();

// Theme Selector
document.getElementById("theme-select")?.addEventListener("change", (e) => {
  const theme = e.target.value;
  applyTheme(theme);
  localStorage.setItem("theme", theme);
});

// Save Settings Button
document.getElementById("save-settings-btn")?.addEventListener("click", () => {
  const theme = document.getElementById("theme-select").value;
  localStorage.setItem("theme", theme);
  applyTheme(theme);
  const msg = document.getElementById("settings-message");
  msg.textContent = "✅ Settings saved successfully!";
  setTimeout(() => (msg.textContent = ""), 2000);
});

// Apply saved theme
function applyTheme(theme) {
  document.body.className = theme === "dark" ? "dark-theme" : "";
}
applyTheme(localStorage.getItem("theme") || "light");
