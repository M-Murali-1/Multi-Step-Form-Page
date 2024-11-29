let counter = 1;
let ctr = 0;
let totalPrice = 9;
let planSelected = "Arcade";
let value = 0;

const planData = {
  Arcade: [9, 90],
  Advanced: [12, 120],
  Pro: [15, 150],
};
const addonData = {
  "Online service": [1, 10],
  "Large storage": [2, 20],
  "Customizable profile": [2, 20],
};
const displayName = ["Monthly", "Yearly"];
const monthOrYear = ["/mo", "/yr"];
const monthOrYearTotal = ["month", "year"];
const dollar = "&dollar;";
const Headings = [
  "",
  "Personal info",
  "Select your plan",
  "Pick add-ons",
  "Finishing up",
  "",
];
const paragraphData = [
  "",
  "Please provide your name, email address, and phone number.",
  "You have the option of monthly or yearly billing.",
  "Add-ons help enhance your gaming experience.",
  "Double-check everything looks OK before confirming.",
  "",
];

let selectedAddons = {};

//Selecting the next and the prevoius button
const nextButton = document.getElementById("next-btn");
const perviousButton = document.getElementById("goback-btn");

// Selecting the mobile buttons
const nextButtonMobile = document.getElementById("next-btn-mobile");
const perviousButtonMobile = document.getElementById("goback-btn-mobile");

// Selecting the toggle button for switching monthly to yearly
const selectorBar = document.querySelector(".selector-bar");

// Selecting the monthly and yearly data for hiding
const monthlyData = document.querySelectorAll(".monthly-data");
const yearlyData = document.querySelectorAll(".yearly-data");

//Selecting plan name and the plan price for the final step
const planName = document.querySelector(".plan-name");
const planPrice = document.querySelector(".plan-price");

// Select all plans cards
const arcade = document.querySelector(".icon-arcade");
const advanced = document.querySelector(".icon-advanced");
const pro = document.querySelector(".icon-pro");

//Selecting the link change used to move to step-2
const changeLink = document.querySelector(".change");

// Selecting the addon for colning and adding
const addOn = document.querySelector(".individualAddon");

//Selecting the total price container.
const totalPriceContainer = document.querySelector(".total-price-container");

//Applying the event listner to the next and previous  button
nextButton.addEventListener("click", moveForward);
perviousButton.addEventListener("click", moveBackward);

//Applying the event listners of the next and previous buttons of the mobile view.
nextButtonMobile.addEventListener("click", moveForward);
perviousButtonMobile.addEventListener("click", moveBackward);

// Add event listeners to Plan cards --> Here the hanndle plan click will takes 2 parameters
// 1 for enabling the remaining for the disabling them

arcade.addEventListener("click", handlePlanClick(arcade, [advanced, pro]));
advanced.addEventListener("click", handlePlanClick(advanced, [arcade, pro]));
pro.addEventListener("click", handlePlanClick(pro, [arcade, advanced]));
selectorBar.addEventListener("click", monthYearly);

//Adding the event lister for the change link.
changeLink.addEventListener("click", step2Jump);

//Code for moving forward to the next step.
function moveForward() {
  if (counter == 1) {
    formValidation();
    if (ctr != 3) {
      return;
    }
    perviousButton.classList.replace("d-none", "d-block");
    perviousButton.parentNode.classList.replace(
      "justify-content-end",
      "justify-content-between"
    );
    perviousButtonMobile.classList.replace("d-none", "d-block");
    perviousButtonMobile.parentNode.classList.replace(
      "justify-content-end",
      "justify-content-between"
    );
  }
  //If no plan is selected in the step-2 then don't move further
  if (counter == 2 && planSelected == "") {
    alert("Select Some Plan..!");
    return;
  }

  counter++;

  //Updating the addons and next-button as confirm step-4
  if (counter == 4) {
    updateTotalAddons();
    nextButton.innerHTML = "Confirm";
    nextButtonMobile.innerHTML = "Confirm";
  }
  if (counter <= 4) {
    let presentStep = document.querySelector(`.step-${counter}`);
    presentStep.firstElementChild.classList.replace("text-white", "active");

    let prevoiusStep = document.querySelector(`.step-${counter - 1}`);
    prevoiusStep.firstElementChild.classList.replace("active", "text-white");
  }
  if (counter == 5) {
    //Removing the next button in the last step
    nextButton.parentNode.classList.replace("d-flex", "d-none");
    nextButtonMobile.parentNode.classList.replace("d-flex", "d-none");
  }

  //Changing the container text for every step.
  let containerData = document.querySelector(".container-data");
  containerData.firstElementChild.innerHTML = Headings[counter];
  containerData.lastElementChild.innerHTML = paragraphData[counter];

  //Step-wise container Manipulation
  let stepPresentContainer = document.querySelector(
    `.step-${counter}-container`
  );
  stepPresentContainer.classList.replace("d-none", "d-flex");
  let stepPreviousContainer = document.querySelector(
    `.step-${counter - 1}-container`
  );
  stepPreviousContainer.classList.replace("d-flex", "d-none");
}

//Code for moving backward for every step.
function moveBackward() {
  counter--;
  //Updating the content data for every step
  let containerData = document.querySelector(".container-data");
  containerData.firstElementChild.innerHTML = Headings[counter];
  containerData.lastElementChild.innerHTML = paragraphData[counter];
  //Hiding the goback button in the step-1
  if (counter == 1) {
    perviousButton.classList.replace("d-block", "d-none");
    perviousButton.parentNode.classList.replace(
      "justify-content-between",
      "justify-content-end"
    );
    perviousButtonMobile.classList.replace("d-block", "d-none");
    perviousButtonMobile.parentNode.classList.replace(
      "justify-content-between",
      "justify-content-end"
    );
  }
  //Changing the step containers
  let stepPresentContainer = document.querySelector(
    `.step-${counter}-container`
  );
  stepPresentContainer.classList.replace("d-none", "d-flex");
  let stepPreviousContainer = document.querySelector(
    `.step-${counter + 1}-container`
  );
  stepPreviousContainer.classList.replace("d-flex", "d-none");

  //Changing the numbering state when moving backward.
  let presentStep = document.querySelector(`.step-${counter}`);
  presentStep.firstElementChild.classList.replace("text-white", "active");
  let prevoiusStep = document.querySelector(`.step-${counter + 1}`);
  prevoiusStep.firstElementChild.classList.replace("active", "text-white");

  if (counter != 4) {
    nextButton.innerHTML = "Next Step";
    nextButtonMobile.innerHTML = "Next Step";
  }

  //Removing all the added addons in the final pricing when mmoved backward.
  if (counter == 3) {
    for (let i = 0; i < Object.keys(selectedAddons).length; i++) {
      addOn.parentNode.removeChild(addOn.parentNode.lastElementChild);
    }
  }
}

//Switching the monthly and the yearly plans
let selectedName;
function monthYearly() {
  //If value=0 --> Monthly else Yearly.
  value = (value + 1) % 2;

  if (value == 1) {
    console.log("Yearly");
    selectorBar.classList.replace(
      "justify-content-start",
      "justify-content-end"
    );
    toggling(monthlyData, yearlyData);
  } else {
    selectorBar.classList.replace(
      "justify-content-end",
      "justify-content-start"
    );
    toggling(yearlyData, monthlyData);
  }

  //Toggling of the switch in step-2
  selectorBar.parentNode.firstElementChild.classList.toggle("text-secondary");
  selectorBar.parentNode.lastElementChild.classList.toggle("text-secondary");

  updatePlan();
}

//Function for toggling for the monthly data and the yearly data whenever the button is toggled.
function toggling(hide, display) {
  for (let itr = 0; itr < hide.length; itr++) {
    hide[itr].classList.replace("d-block", "d-none");
    display[itr].classList.replace("d-none", "d-block");
  }
}

// Toggle function for switching plans if selected before now deselected otherwise it will be selected.
function togglePlan(selectedPlan, ...otherPlans) {
  selectedPlan.classList.toggle("selected");
  otherPlans.forEach((plan) => plan.classList.remove("selected"));

  planSelected = selectedPlan.classList.contains("selected")
    ? selectedPlan.dataset.plan
    : "";
    //Updating the plan after the checking or unchecking some plan
  updatePlan();
}

//Handle function for selecting one plan and deselecting if any other plans are selected.
//Used for all the plan containers.
function handlePlanClick(plan, otherPlans) {
  return () => togglePlan(plan, ...otherPlans);
}
//Selecting all the checkboxes in the document
let inputElements = document.querySelectorAll("input[type='checkbox']");

//Applying the change event listner for every time when we change the state of the checkbox.
inputElements.forEach((checkbox) => {
  checkbox.addEventListener("change", function (event) {
    checkbox.parentNode.parentNode.classList.toggle("selected");
    console.log(addonData[checkbox.dataset.addon][value]);
    if (selectedAddons[checkbox.dataset.addon] === undefined) {
      selectedAddons[checkbox.dataset.addon] =
        addonData[checkbox.dataset.addon][value];
    } else {
      delete selectedAddons[checkbox.dataset.addon];
    }
    console.log(selectedAddons);
  });
});

//Adding the content in the final step
// Updating the plan details every time
function updatePlan() {

  //Updating the plan name
  selectedName = `${planSelected}(${displayName[value]})`;
  planName.innerHTML = selectedName;

  //Updating the plan price
  selectedPlanPrice = `${dollar}${planData[planSelected][value]}${monthOrYear[value]}`;
  console.log(selectedPlanPrice);
  planPrice.innerHTML = selectedPlanPrice;

  //Updating the total price
  totalPrice = planData[planSelected][value];
  console.log(totalPrice);
}

//Updating addons in the final page
function updateTotalAddons() {
  if (Object.keys(selectedAddons).length > 0) {
    addOn.parentNode.classList.remove("d-none");
  }
  let newAddon;
  for (addonName in selectedAddons) {
    newAddon = addOn.cloneNode(true);
    newAddon.classList.replace("d-none", "d-flex");
    newAddon.firstElementChild.innerHTML = addonName;
    newAddon.lastElementChild.innerHTML = `+${dollar}${addonData[addonName][value]}${monthOrYear[value]}`;
    addOn.parentNode.appendChild(newAddon);

    //updating the total price for every addon
    totalPrice += addonData[addonName][value];
  }

  // Updating the total price after adding all the addons
  totalPriceContainer.firstElementChild.innerHTML = `Total (per ${monthOrYearTotal[value]})`;
  totalPriceContainer.lastElementChild.innerHTML = `+${dollar}${totalPrice}${monthOrYear[value]}`;
}

//Jumping from the page 4 to page 2 when clicked on the change link.
function step2Jump() {
  moveBackward();
  moveBackward();
}

// Applying the form validations using the js
function formValidation() {
  ctr = 0;
  let form = document.querySelectorAll(".form-control");

  form.forEach((inputBox) => {
    console.log(inputBox);
    console.log(inputBox.value, inputBox.value !== "");
    if (inputBox.value !== "") {
      ctr++;
      if (inputBox.classList.contains("border-danger")) {
        inputBox.classList.replace("border-danger", "items");
        inputBox.parentNode.firstElementChild.lastElementChild.classList.replace(
          "d-block",
          "d-none"
        );
      }
    } else {
      inputBox.parentNode.firstElementChild.lastElementChild.classList.replace(
        "d-none",
        "d-block"
      );
      inputBox.classList.replace("items", "border-danger");
    }
  });
}
