function incrementCount(itemId, name, price) {
  var countField = document.getElementById(itemId + "-count");
  var count = parseInt(countField.value);
  countField.value = count + 1;

  // Update sessionStorage
  sessionStorage.setItem(name + "_price", price);
  sessionStorage.setItem(name + "_quantity", countField.value);
}

function decrementCount(itemId, name) {
  var countField = document.getElementById(itemId + "-count");
  var count = parseInt(countField.value);
  if (count > 0) {
    countField.value = count - 1;
    if (countField.value >= 1) {
      // Update sessionStorage
      localStorage.setItem(name + "_quantity", countField.value);
    } else {
      // Remove from sessionStorage
      sessionStorage.removeItem(name + "_quantity");
      sessionStorage.removeItem(name + "_price");
    }
  }
}
