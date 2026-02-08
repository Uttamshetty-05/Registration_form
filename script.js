document.getElementById("regForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    // Clear previous errors
    document.querySelectorAll(".error").forEach(e => e.textContent="");

    // Name validation
    if (!/^[A-Za-z ]+$/.test(name)) {
        document.getElementById("nameErr").textContent =
        "Only letters allowed";
        valid = false;
    }

    // Username
    if (username.length < 4 || /\s/.test(username)) {
        document.getElementById("userErr").textContent =
        "Minimum 4 characters, no spaces";
        valid = false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("emailErr").textContent =
        "Invalid email format";
        valid = false;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
        document.getElementById("phoneErr").textContent =
        "Enter valid 10 digit phone number";
        valid = false;
    }

    // DOB validation (future date + 18+ age)
    const today = new Date();
    const dobDate = new Date(dob);

    if (!dob) {
        document.getElementById("dobErr").textContent =
        "Select date of birth";
        valid = false;
    }
    else if (dobDate > today) {
        document.getElementById("dobErr").textContent =
        "DOB cannot be a future date";
        valid = false;
    }
    else {
        let age = today.getFullYear() - dobDate.getFullYear();
        let m = today.getMonth() - dobDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (age < 18) {
            document.getElementById("dobErr").textContent =
            "You must be at least 18 years old";
            valid = false;
        }
    }

    // Address validation
    if (address.length < 10) {
        document.getElementById("addrErr").textContent =
        "Enter complete address";
        valid = false;
    }

    // Strong password
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
        document.getElementById("passErr").textContent =
        "8+ chars, upper, lower, number, special char required";
        valid = false;
    }

    // Confirm password
    if (password !== confirmPassword) {
        document.getElementById("confirmErr").textContent =
        "Passwords do not match";
        valid = false;
    }

    // Terms checkbox
    if (!terms) {
        document.getElementById("termsErr").textContent =
        "Accept terms & conditions";
        valid = false;
    }

    if (!valid) return;

    // Final registration summary
    document.getElementById("result").innerHTML =
        `<h2 style="color:green">Registration Successful ✔</h2>
        <hr>
        <b>Full Name:</b> ${name}<br>
        <b>Username:</b> ${username}<br>
        <b>Email:</b> ${email}<br>
        <b>Phone:</b> ${phone}<br>
        <b>Date of Birth:</b> ${dob}<br>
        <b>Address:</b> ${address}<br>
        <br>
        <b>Status:</b> Successfully Registered 🎉`;
});
