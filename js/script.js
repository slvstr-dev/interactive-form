// Variables used in multiple functions
const nameInput = document.getElementById("name");
const nameHint = document.getElementById("name-hint");
const activitiesBox = document.getElementById("activities-box");
const activityInputs = document.querySelectorAll("input[type='checkbox']");
const paymentSelect = document.getElementById("payment");
let isValidActivity = false;

// Focus on name input on page load
nameInput.focus();

// Conditionally display other job role input
const otherJobInput = document.getElementById("other-job-role");
const jobsSelect = document.getElementById("title");

otherJobInput.style.display = "none";

jobsSelect.addEventListener("change", (event) => {
    otherJobInput.style.display =
        event.target.value === "other" ? "inline-block" : "none";
});

// Conditionally display design & color combinations
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

    colorSelect.disabled = false;
});

// Calculate total cost of selected activities
const activitiesCost = document.getElementById("activities-cost");
let totalCost = 0;

activitiesBox.addEventListener("change", (event) => {
    const cost = parseInt(event.target.dataset.cost);

    event.target.checked ? (totalCost += cost) : (totalCost -= cost);

    activitiesCost.innerHTML = `Total: $${totalCost}`;

    isValidActivity = !isValidActivity;
});

// Listen for focus, blur and change events on checkboxes
for (let i = 0; i < activityInputs.length; i++) {
    // Improve focus state visibility of checkboxes
    activityInputs[i].addEventListener("focus", (event) => {
        event.target.parentElement.classList.add("focus");
    });

    activityInputs[i].addEventListener("blur", (event) => {
        event.target.parentElement.classList.remove("focus");
    });

    // Prevent registration of conflicting activities
    activityInputs[i].addEventListener("change", (event) => {
        disableConflictingActivities(event.target);
    });
}

// Conditionally display payment options with creditcard as default payment method
const creditCardPayment = document.getElementById("credit-card");
const paypalPayment = document.getElementById("paypal");
const bitcoinPayment = document.getElementById("bitcoin");

paymentSelect.selectedIndex = 1;
paypalPayment.style.display = "none";
bitcoinPayment.style.display = "none";

paymentSelect.addEventListener("change", (event) => {
    const paymentMethods = [creditCardPayment, paypalPayment, bitcoinPayment];
    const selectedPayment = event.target.value;

    for (let i = 0; i < paymentMethods.length; i++) {
        paymentMethods[i].style.display =
            paymentMethods[i].id === selectedPayment ? "block" : "none";
    }
});

// Validate name input after key up event
nameInput.addEventListener("keyup", () => {
    const isValidName = nameInput.value.match(/^\D+$/);

    // Conditionally set content of name hint
    if (nameInput.value.length !== 0 && !nameInput.value.match(/^\D+$/)) {
        nameHint.innerHTML = "Name field can only accept letters";
    } else {
        nameHint.innerHTML = "Name field cannot be blank";
    }

    toggleValidationHint(isValidName, nameInput, nameHint);
});

// Validate form after submit event
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const emailHint = document.getElementById("email-hint");
const activitiesHint = document.getElementById("activities-hint");

form.addEventListener("submit", (event) => {
    const isValidName = nameInput.value.match(/^\D+$/);
    const isValidEmail = emailInput.value.match(/^\w+@\w+\.\D+$/);
    const isValidCreditCard = validateCreditCardInput();
    const isValidForm =
        isValidName && isValidEmail && isValidActivity && isValidCreditCard;

    toggleValidationHint(isValidName, nameInput, nameHint);
    toggleValidationHint(isValidEmail, emailInput, emailHint);
    toggleValidationHint(isValidActivity, activitiesBox, activitiesHint);

    if (!isValidForm) {
        event.preventDefault();
    }
});

// Helper function for checking if the selected activity will conflict with other actitivies
const disableConflictingActivities = (selectedActivity) => {
    const selectedDateTime = selectedActivity.dataset.dayAndTime;

    for (let i = 0; i < activityInputs.length; i++) {
        const currentDateTime = activityInputs[i].dataset.dayAndTime;

        if (
            activityInputs[i] !== selectedActivity &&
            currentDateTime === selectedDateTime
        ) {
            if (selectedActivity.checked) {
                activityInputs[i].disabled = true;
                activityInputs[i].parentElement.classList.add("disabled");
            } else {
                activityInputs[i].disabled = false;
                activityInputs[i].parentElement.classList.remove("disabled");
            }
        }
    }
};

// Helper function for validating credit card input fields
const cardNumberInput = document.getElementById("cc-num");
const cardNumberHint = document.getElementById("cc-hint");
const zipCodeInput = document.getElementById("zip");
const zipCodeHint = document.getElementById("zip-hint");
const cvvCodeInput = document.getElementById("cvv");
const ccvCodeHint = document.getElementById("cvv-hint");

const validateCreditCardInput = () => {
    const isValidCardNumber = cardNumberInput.value.match(/^\d{13,16}$/);
    const isValidZipCode = zipCodeInput.value.match(/^\d{5}$/);
    const isValidCcvCode = cvvCodeInput.value.match(/^\d{3}$/);

    if (paymentSelect.value !== "credit-card") {
        return true;
    } else {
        toggleValidationHint(
            isValidCardNumber,
            cardNumberInput,
            cardNumberHint
        );
        toggleValidationHint(isValidZipCode, zipCodeInput, zipCodeHint);
        toggleValidationHint(isValidCcvCode, cvvCodeInput, ccvCodeHint);

        return isValidCardNumber && isValidZipCode && isValidCcvCode;
    }
};

// Helper function for validation hint toggle
const toggleValidationHint = (validation, checkedElement, validationHint) => {
    if (validation) {
        checkedElement.parentElement.classList.add("valid");
        checkedElement.parentElement.classList.remove("not-valid");

        if (Array.isArray(validationHint)) {
            for (let i = 0; i < validationHint.length; i++) {
                validationHint[i].style.display = "none";
            }
        } else {
            validationHint.style.display = "none";
        }

        return true;
    }

    checkedElement.parentElement.classList.add("not-valid");
    checkedElement.parentElement.classList.remove("valid");

    if (Array.isArray(validationHint)) {
        for (let i = 0; i < validationHint.length; i++) {
            validationHint[i].style.display = "inline";
        }
    } else {
        validationHint.style.display = "inline";
    }
};
