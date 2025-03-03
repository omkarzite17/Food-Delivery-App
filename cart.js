// Cart.js

// Function to calculate the total price
function calculateTotalPrice() {
  let subtotal = 0;
  let deliveryCharger = 20;
  let EstTax = 0;
  let grandtotal = 0;
  let Total = [];
  // Iterate over the items in sessionStorage and calculate the total price
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key.endsWith("_price")) {
      const name = key.replace("_price", "");
      const quantity = sessionStorage.getItem(name + "_quantity");
      const price = sessionStorage.getItem(name + "_price");
      if (quantity && price) {
        subtotal += parseInt(quantity) * parseFloat(price);
      }
    }
  }
  EstTax += subtotal * 0.05;
  grandtotal += subtotal + EstTax + deliveryCharger;
  Total.push(subtotal);
  Total.push(deliveryCharger);
  Total.push(EstTax);
  Total.push(grandtotal);
  return Total;
}

// Function to render the cart items
function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  // Iterate over the items in sessionStorage and render them
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key.endsWith("_price")) {
      const name = key.replace("_price", "");
      const quantity = sessionStorage.getItem(name + "_quantity");
      const price = sessionStorage.getItem(name + "_price");
      if (quantity && price) {
        // Create a new cart item element
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        // Create elements for displaying the item details (name, quantity, price)
        const itemName = document.createElement("span");
        itemName.textContent = name;

        const itemQuantity = document.createElement("div");
        itemQuantity.className = "count-field";

        const qtyfield = document.createElement("input");
        qtyfield.type = "number";
        qtyfield.value = quantity;
        qtyfield.readOnly;

        const incrementbtn = document.createElement("button");
        incrementbtn.className = "btn";
        incrementbtn.textContent = "+";
        incrementbtn.addEventListener("click", function () {
          var count = parseInt(qtyfield.value);
          qtyfield.value = count + 1;

          // Update sessionStorage
          sessionStorage.setItem(name + "_quantity", qtyfield.value);
          // quantity += 1;
          // // Update sessionStorage
          // sessionStorage.setItem(name + "_quantity", quantity);
          renderCart();
        });
        const decrementbtn = document.createElement("button");
        decrementbtn.className = "btn";
        decrementbtn.textContent = "-";
        decrementbtn.addEventListener("click", function () {
          var count = parseInt(qtyfield.value);
          if (qtyfield.value >= 1) {
            qtyfield.value = count - 1;
          }
          // Update sessionStorage
          sessionStorage.setItem(name + "_quantity", qtyfield.value);
          renderCart();
        });
        itemQuantity.appendChild(decrementbtn);
        itemQuantity.appendChild(qtyfield);
        itemQuantity.appendChild(incrementbtn);
        // itemQuantity.addEventListener("change", () => {
        //   sessionStorage.setItem(name + "_quantity", itemQuantity.value);
        // });
        const PriceSec = document.createElement("div");
        PriceSec.className = "PriceSec";
        const itemPricePerQty = document.createElement("div");
        itemPricePerQty.className = "itemPricePerQty";
        itemPricePerQty.textContent = price;
        const itemPrice = document.createElement("div");
        itemPrice.className = "itemPrice";
        itemPrice.textContent = price * quantity;
        PriceSec.appendChild(itemPricePerQty);
        PriceSec.appendChild(itemPrice);
        // Create a button to remove the item from the cart
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
          sessionStorage.removeItem(name + "_quantity");
          sessionStorage.removeItem(name + "_price");
          renderCart();
        });

        // Append the elements to the cart item
        cartItem.appendChild(itemName);
        cartItem.appendChild(itemQuantity);
        cartItem.appendChild(PriceSec);
        cartItem.appendChild(removeButton);

        // Append the cart item to the cart container
        cartContainer.appendChild(cartItem);
      }
    }
  }

  // Calculate and display the total price
  let res = [];
  res = calculateTotalPrice();
  const subTotal = document.getElementById("sub-price");
  subTotal.textContent = `\u20B9 ${res[0].toFixed(2)}`;
  const delCharges = document.getElementById("delivery-charger");
  delCharges.textContent = `\u20B9 ${res[1].toFixed(2)}`;
  const estTax = document.getElementById("est-tax");
  estTax.textContent = `\u20B9 ${res[2].toFixed(2)}`;
  const grandTotal = document.getElementById("grand-price");
  grandTotal.textContent = `\u20B9  ${res[3].toFixed(2)}`;
  const grandPrice = document.getElementById("grand-price2");
  grandPrice.textContent = `\u20B9  ${res[3].toFixed(2)}`;
}

// Call the renderCart function to initially display the cart
renderCart();
function Displaypage2() {
  document.getElementById("page2").style.display = "block";
}
function Displaypage3() {
  document.getElementById("page3").style.display = "block";
}

var ct = document.getElementById("current-time"),
  cd = document.getElementById("current-date"),
  on = document.getElementById("orderNum");
const months = [
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
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function end_section() {
  var d = new Date();
  on.innerHTML = "<h1>" + "Order #" + d.getTime() + " </h1>";
  cd.innerHTML =
    d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  var hh = d.getHours();
  var AMPM = "";
  if (hh > 12) {
    AMPM = "PM";
    hh -= 12;
  } else {
    AMPM = "AM";
  }
  ct.innerHTML =
    hh + ":" + d.getMinutes() + " " + AMPM + " , " + days[d.getDay()];
}
end_section();
