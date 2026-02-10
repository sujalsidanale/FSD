// ================================
// Email Validation + Live Update
// ================================
document.getElementById("email").addEventListener("keyup", function () {

    let email = this.value;
    let regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let msg = document.getElementById("emailMsg");

    // Validation Message
    if (email === "") {
        msg.textContent = "";
    }
    else if (regex.test(email)) {
        msg.textContent = "Valid Email Address ✔";
        msg.style.color = "green";
    }
    else {
        msg.textContent = "Invalid Email Address ✖";
        msg.style.color = "red";
    }

    // Live Save to Session (Optional)
    sessionStorage.setItem("userEmail", email);

    // Update Display
    readData();
});


// ================================
// Password Strength Checker
// ================================
document.getElementById("password").addEventListener("keyup", checkStrength);

function checkStrength() {

    let password = document.getElementById("password").value;
    let strengthMsg = document.getElementById("strengthMsg");

    if (password.length === 0) {
        strengthMsg.textContent = "";
        return;
    }

    if (password.length < 6) {
        strengthMsg.textContent = "Weak Password";
        strengthMsg.className = "strength weak";
    }
    else if (password.match(/[A-Za-z]/) && password.match(/[0-9]/)) {
        strengthMsg.textContent = "Medium Password";
        strengthMsg.className = "strength medium";
    }
    else if (password.match(/[A-Za-z]/) && password.match(/[0-9]/) &&
             password.match(/[@$!%*#?&]/)) {
        strengthMsg.textContent = "Strong Password";
        strengthMsg.className = "strength strong";
    }
}


// ================================
// Save Button Function
// ================================
function saveData() {

    let email = document.getElementById("email").value;

    // Save Cookie
    document.cookie = "userEmail=" + email + "; path=/";

    // Save Session
    sessionStorage.setItem("userEmail", email);

    // Refresh Display
    readData();
}


// ================================
// Get Cookie Function (FIX)
// ================================
function getCookie(name) {

    let cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {

        let parts = cookies[i].split("=");

        if (parts[0] === name) {
            return parts[1];
        }
    }

    return "";
}


// ================================
// Display Cookie + Session Data
// ================================
function readData() {

    // Show Cookie Value Properly
    let cookieValue = getCookie("userEmail");

    if (cookieValue === "") {
        document.getElementById("cookieData").textContent = "No cookies found";
    }
    else {
        document.getElementById("cookieData").textContent =
            "userEmail = " + cookieValue;
    }

    // Show Session Value
    let sessionValue = sessionStorage.getItem("userEmail");

    document.getElementById("sessionData").textContent =
        sessionValue || "No session data";
}


// ================================
// Clear Button Function
// ================================
function clearData() {

    // Delete Cookie
    document.cookie =
        "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear Session
    sessionStorage.removeItem("userEmail");

    // Clear Inputs
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    // Clear Messages
    document.getElementById("emailMsg").textContent = "";
    document.getElementById("strengthMsg").textContent = "";

    // Refresh Display
    readData();
}


// ================================
// Load Data on Page Start
// ================================
readData();
