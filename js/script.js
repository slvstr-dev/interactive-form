// Focus on name input on page load
const nameInput = document.getElementById("name");

nameInput.focus();

// Add display conditions to other job role input
const otherInput = document.getElementById("other-job-role");
const jobsSelect = document.getElementById("title");

otherInput.style.display = "none";

jobsSelect.addEventListener("change", (event) => {
    otherInput.style.display =
        event.target.value === "other" ? "inline-block" : "none";
});

// Add display conditions to design & color combinations
const colorSelect = document.getElementById("color");
const designSelect = document.getElementById("design");

colorSelect.disabled = true;

designSelect.addEventListener("change", (event) => {
    const colorOptions = colorSelect.children;
    const selectedDesign = event.target.value;

    for (let i = 0; i < colorOptions.length; i++) {
        let colorOptionTheme = colorOptions[i].dataset.theme;

        if (selectedDesign === colorOptionTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute("selected", true);
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].removeAttribute("selected");
        }
    }

    colorInput.disabled = false;
});

// Calculate total cost of selected activities
const activitiesFieldset = document.getElementById("activities");
const activitiesCosts = document.getElementById("activities-cost");
let totalCost = 0;

activitiesFieldset.addEventListener("change", (event) => {
    const cost = parseInt(event.target.dataset.cost);

    event.target.checked ? (totalCost += cost) : (totalCost -= cost);

    activitiesCosts.innerHTML = `Total: $${totalCost}`;
});

// Add display conditions to payment options with creditcard as default payment method
const paymentSelect = document.getElementById("payment");
const creditCardPayment = document.getElementById("credit-card");
const paypalPayment = document.getElementById("paypal");
const bitcoinPayment = document.getElementById("bitcoin");
const paymentList = [creditCardPayment, paypalPayment, bitcoinPayment];

paymentSelect.selectedIndex = 1;
paypalPayment.style.display = "none";
bitcoinPayment.style.display = "none";

paymentSelect.addEventListener("change", (event) => {
    const selectedPayment = event.target.value;

    for (let i = 0; i < paymentList.length; i++) {
        paymentList[i].style.display =
            selectedPayment === paymentList[i].id ? "block" : "none";
    }
});
