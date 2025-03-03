const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const signupform = document.querySelector("#sign-up-form");
const loginform = document.querySelector("#login-in-form");

window.addEventListener("DOMContentLoaded", function () {
  // Get the value of the "click" query parameter from the URL
  var urlParams = new URLSearchParams(window.location.search);
  var clickParam = urlParams.get("click");

  // Trigger the click event if the "click" query parameter is set to "true"
  if (clickParam === "true") {
    //   var targetButton = document.getElementById('targetButton');
    sign_up_btn.click();
  }
});

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function populateCities() {
  var stateDropdown = document.getElementById("state");
  var cityDropdown = document.getElementById("city");

  // Clear previous city options
  cityDropdown.innerHTML = "";

  // Get selected state
  var selectedState = stateDropdown.value;

  // Define city options for each state
  var cityOptions = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    Bihar: ["Patna", "Gaya", "Muzaffarpur"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  };

  // Populate city options based on selected state
  if (selectedState in cityOptions) {
    var cities = cityOptions[selectedState];
    for (var i = 0; i < cities.length; i++) {
      var option = document.createElement("option");
      option.text = cities[i];
      cityDropdown.add(option);
    }
  }
}
//signup-form-validation
function validateSignUpForm() {
  // Validation for First Name
  var firstName = document.getElementById("firstName").value;
  if (!/^[A-Za-z]+$/.test(firstName)) {
    alert("First Name should contain only alphabets.");
    return false;
  }

  // Validation for Last Name
  var lastName = document.getElementById("lastName").value;
  if (!/^[A-Za-z]+$/.test(lastName)) {
    alert("Last Name should contain only alphabets.");
    return false;
  }

  // Validation for Mail ID
  var mailId = document.getElementById("mailId").value;
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mailId
    )
  ) {
    alert("Mail ID should be alphanumeric.");
    return false;
  }

  // Validation for Password
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  if (
    password.length < 8 ||
    !/[a-zA-Z]/.test(password) ||
    !/\d/.test(password) ||
    !/\W/.test(password)
  ) {
    alert(
      "Password should be minimum 8 characters long and contain at least one alphabet, one digit, and one special character."
    );
    return false;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  // Validation for Mobile Number
  var mobileNumber = document.getElementById("mobileNumber").value;
  if (!/^\d+$/.test(mobileNumber)) {
    alert("Mobile Number should contain only numeric digits.");
    return false;
  }
  if (mobileNumber.length != 10) {
    alert("Mobile Number should contain 10 numeric digits.");
    return false;
  }

  // Validation for Address Line 1
  var addressLine1 = document.getElementById("addressLine1").value;
  if (!/^[a-zA-Z0-9\s,'-]*$/.test(addressLine1)) {
    alert("Address Line 1 should be alphanumeric.");
    return false;
  }

  // Validation for Address Line 2
  var addressLine2 = document.getElementById("addressLine2").value;
  if (!/^[a-zA-Z0-9\s,'-]*$/.test(addressLine2)) {
    alert("Address Line 2 should be alphanumeric.");
    return false;
  }

  // Validation for Pin Code
  var pinCode = document.getElementById("pinCode").value;
  if (!/^\d+$/.test(pinCode)) {
    alert("Pin Code should contain only numeric digits.");
    return false;
  }
  if (pinCode.length != 6) {
    alert("Pin Code should contain only 6 numeric digits.");
    return false;
  }
  return true;
}

signupform.addEventListener("submit", (event) => {
  if (validateSignUpForm() == true) {
    signupform.submit();
  } else {
    event.preventDefault();
  }
});

//login-form-validation
function validateLoginForm() {
  var email_number = document.getElementById("email_number").value;
  if (!/^(?:\d{10}|\w+@\w+\.\w{2,3})$/.test(email_number)) {
    alert("Please insert correct email or mobile number");
    return false;
  }
  var loginpassword = document.getElementById("loginpassword").value;
  if (
    loginpassword.length < 8 ||
    !/[a-zA-Z]/.test(loginpassword) ||
    !/\d/.test(loginpassword) ||
    !/\W/.test(loginpassword)
  ) {
    alert(
      "Password should be minimum 8 characters long and contain at least one alphabet, one digit, and one special character."
    );
    return false;
  }

  return true;
}

loginform.addEventListener("submit", (event) => {
  if (validateLoginForm() == true) {
    loginform.submit();
  } else {
    event.preventDefault();
  }
});
function alertFunction() {
  alert(
    "A link to reset the password will be sent to your registered email id. "
  );
}
