const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const paymentSelect = document.getElementById("payment");
const creditCardPayment = document.getElementById("credit-card");
const activitiesBox = document.getElementById("activities-box");
const checkboxInputs = document.querySelectorAll("input[type='checkbox']");

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
});

// Listen for focus, blur and change events on checkboxes
for (let i = 0; i < checkboxInputs.length; i++) {
    // Improve focus state visibility of checkboxes
    checkboxInputs[i].addEventListener("focus", (event) => {
        event.target.parentElement.classList.add("focus");
    });

    checkboxInputs[i].addEventListener("blur", (event) => {
        event.target.parentElement.classList.remove("focus");
    });

    // Prevent registration of conflicting activities
    checkboxInputs[i].addEventListener("change", (event) => {
        disableConflictingActivities(event.target);
    });
}

// Conditionally display payment options with creditcard as default payment method
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
    validateNameInput();
});

// Validate form after submit event
form.addEventListener("submit", (event) => {
    if (
        !validateNameInput() &&
        !validateEmailInput() &&
        !validateActivitiesInput() &&
        !validateCreditCardInput()
    ) {
        event.preventDefault();
    }
});

// Helper function for checking if the selected activity will conflict with other actitivies
const disableConflictingActivities = (selectedActivity) => {
    const selectedDateTime = selectedActivity.dataset.dayAndTime;

    for (let i = 0; i < checkboxInputs.length; i++) {
        const currentDateTime = checkboxInputs[i].dataset.dayAndTime;

        if (
            checkboxInputs[i] !== selectedActivity &&
            currentDateTime === selectedDateTime
        ) {
            if (selectedActivity.checked) {
                checkboxInputs[i].disabled = true;
                checkboxInputs[i].parentElement.classList.add("disabled");
            } else {
                checkboxInputs[i].disabled = false;
                checkboxInputs[i].parentElement.classList.remove("disabled");
            }
        }
    }
};

// Helper functions for validation of name, email, activities and creditcard inputs
const validateNameInput = () => {
    const nameValue = nameInput.value;
    const nameValidation = nameValue.match(/^\D+$/);
    const nameHint = document.getElementById("name-hint");

    return validationHintToggle(nameValidation, nameInput, nameHint);
};

const validateEmailInput = () => {
    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value;
    const emailValidation = emailValue.match(/^\w+@\w+[\.\D]+$/);
    const emailHint = document.getElementById("email-hint");

    return validationHintToggle(emailValidation, emailInput, emailHint);
};

const validateActivitiesInput = () => {
    const selectedActivities = activitiesBox.querySelectorAll(
        "input[type='checkbox']:checked"
    );
    const activitiesValidation = selectedActivities.length > 0;
    const activitiesHint = document.getElementById("activities-hint");

    return validationHintToggle(
        activitiesValidation,
        activitiesBox,
        activitiesHint
    );
};

const validateCreditCardInput = () => {
    const isCreditCardPayment = paymentSelect.value === "credit-card";

    if (!isCreditCardPayment) {
        return true;
    } else {
        const cardNumberValue = document.getElementById("cc-num").value;
        const zipCodeValue = document.getElementById("zip").value;
        const cvvCodeValue = document.getElementById("cvv").value;
        const creditCardValidation =
            cardNumberValue.match(/^\d{13,16}$/) &&
            zipCodeValue.match(/^\d{5}$/) &&
            cvvCodeValue.match(/^\d{3}$/);
        const creditCardHints = [
            document.getElementById("cc-hint"),
            document.getElementById("zip-hint"),
            document.getElementById("cvv-hint"),
        ];

        return validationHintToggle(
            creditCardValidation,
            creditCardPayment,
            creditCardHints
        );
    }
};

// Helper function for form validation hint toggle
const validationHintToggle = (validation, checkedElement, validationHint) => {
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
