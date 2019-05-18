document
    .querySelector("#emprescalc-form")
    .addEventListener("submit", function(e) {
        // Hide Results
        document.querySelector("#results").style.display = "none";

        // Show loader
        document.querySelector("#loading").style.display = "block";
        setTimeout(calculateResults, 2000);
        e.preventDefault();
    });

function calculateResults() {
    // UI Vars
    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");

    const principal = parseFloat(amount.value);
    const calculedInterest = parseFloat(interest.value) / 100 / 12;
    const calculedPayments = parseFloat(years.value) * 12;

    // calculete monthly payment
    const x = Math.pow(1 + calculedInterest, calculedPayments);
    const monthly = (principal * x * calculedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculedPayments).toFixed(2);
        totalInterest.value = (monthly * calculedPayments - principal).toFixed(
            2
        );
        // Show Results
        document.querySelector("#results").style.display = "block";

        // hide loading
        document.querySelector("#loading").style.display = "none";
    } else {
        document.querySelector("#loading").style.display = "none";
        showError("Por favor, cheque os dados inseridos");
    }
}
function showError(error) {
    // Create a div
    const errorDiv = document.createElement("div");

    // Get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    // Add class
    errorDiv.className = "alert alert-danger";

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Inset Error above Heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}
// Clear function
function clearError() {
    document.querySelector(".alert").remove();
}
