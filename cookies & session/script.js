// Email Validation
document.getElementById("email").addEventListener("keyup", function () {
    let email = this.value;
    let regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let msg = document.getElementById("emailMsg");

    if (email === "") {
        msg.textContent = "";
    } else if (regex.test(email)) {
        msg.textContent = "Valid Email Address ✔";
        msg.style.color = "green";
    } else {
        msg.textContent = "Invalid Email Address ✖";
        msg.style.color = "red";
    }
});

// Password Strength Checker
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

// Save data to Cookie and Session
function saveData() {
    let email = document.getElementById("email").value;

    // Cookie
    document.cookie = "userEmail=" + email + ";path=/";

    // Session Storage
    sessionStorage.setItem("userEmail", email);

    readData();
}

// Read Cookie and Session
function readData() {
    document.getElementById("cookieData").textContent =
        document.cookie || "No cookies found";

    document.getElementById("sessionData").textContent =
        sessionStorage.getItem("userEmail") || "No session data";
}

// Load saved data on page load
readData();
