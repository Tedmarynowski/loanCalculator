// Listen for submit
document.getElementById('loan-form').addEventListener('submit' , function(e){
    // Hide Results
    document.getElementById('results').style.display = 'none';
   
    // Show loader
    document.getElementById('loading').style.display = 'block';
   
    // After loader has been shown we want to calculate the results after 2 seconds then hide the loader again
    setTimeout(calculateResults, 1500);



    e.preventDefault();
});

// Calculate Results
function calculateResults() {

    // UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    // Form validation
    if (isFinite(monthly)) {
        // Sets the monthly payment section to the monthly calc. Fixes the decimal points to 2
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Show the results div and hide loader
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';

    }else {
        showError('Please check your inputs');

    }

}


// Show Error 
function showError(error){
    
    // Hide results and hide loader
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';


    //Create a div element
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add classes to div
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
   errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds (milliseconds)
    setTimeout(clearError, 3000);

}

// Clear Error function
function clearError(){
    document.querySelector('.alert').remove();
}