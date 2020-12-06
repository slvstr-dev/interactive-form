 // Step 3
 const nameInput = document.getElementById("name");

 nameInput.focus();

 // Step 4
 const jobsInput = document.getElementById("title");
 const otherInput = document.getElementById("other-job-role");

 jobsInput.addEventListener("change", event => {
     other.style.display = event.target.value === "other" ?
         "inline-block" :
         "none";
 });

 otherInput.style.display = "none";

 // Step 5
 const colorInput = document.getElementById("color");
 const designInput = document.getElementById("design");

 colorInput.disabled = true;

 designInput.addEventListener("change", event => {
     console.dir(event.target);
     const selectedDesign = event.target.value;
     const colorOptions = colorInput.querySelectorAll("[data-theme]");

     for (let i = 0; i < colorOptions.length; i++) {
         colorOptions[i].hidden = colorOptions[i].dataset.theme === selectedDesign;
     }

     colorInput.disabled = false;
 });