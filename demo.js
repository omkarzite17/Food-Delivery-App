// Get the "Pay now" button and the radio inputs
const payNowButton = document.getElementById("payNowButton");
const codRadio = document.querySelector('input[value="COD"]');

// Add an event listener to the radio inputs to handle the "Pay now" button activation
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    if (codRadio.checked) {
      console.log("checked");
      payNowButton.disabled = false;
    } else {
      payNowButton.disabled = true;
    }
  });
});
