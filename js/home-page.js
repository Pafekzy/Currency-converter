// DOM Elements
const title = document.querySelector("header h1");
const form = document.getElementById("convertForm");
const fromCurrencyInput = document.getElementById("fromCurrency");
const amountInput = document.getElementById("amount");
const toCurrencyInput = document.getElementById("toCurrency");
const conversionResultDiv = document.getElementById("conversionResult");

// Glowing Animation for the Title
function animateTitleGlow() {
  let glowIndex = 0;
  const glowColors = ["#C0C0C0", "#FFFFFF", "#87CEEB"]; // Silver, White, Soft Blue
  setInterval(() => {
    title.style.textShadow = `
      0 0 15px ${glowColors[glowIndex]},
      0 0 30px ${glowColors[(glowIndex + 1) % glowColors.length]},
      0 0 45px ${glowColors[(glowIndex + 2) % glowColors.length]}`;
    glowIndex = (glowIndex + 1) % glowColors.length;
  }, 1000); // Changes glow color every second
}

// Currency Converter Logic
function convertCurrency(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  const fromCurrency = fromCurrencyInput.value.trim().toUpperCase();
  const amount = parseFloat(amountInput.value.trim());
  const toCurrency = toCurrencyInput.value.trim().toUpperCase();

  // Validate input values
  if (!fromCurrency || !toCurrency || isNaN(amount) || amount <= 0) {
    conversionResultDiv.textContent = "Please enter valid details for conversion.";
    conversionResultDiv.style.color = "red";
    conversionResultDiv.style.display = "block";
    conversionResultDiv.style.fontSize = "1.2em"; // Added size to match new theme
    conversionResultDiv.style.padding = "10px"; // Added padding for better visual appeal
    return;
  }

  // Exchange rates based on your assumption
  const exchangeRates = {
    USD: { NGN: 170, EUR: 8 }, // 1 USD = 170 NGN, 1 USD = 8 EUR
    NGN: { USD: 1 / 170, EUR: 8 / 170 }, // Conversion rates for NGN
    EUR: { USD: 1 / 8, NGN: 170 / 8 }, // Conversion rates for EUR
  };

  // Perform conversion
  if (
    exchangeRates[fromCurrency] &&
    exchangeRates[fromCurrency][toCurrency]
  ) {
    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    // Display the result
    conversionResultDiv.textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
    conversionResultDiv.style.color = "#87CEEB"; // Soft blue for success
    conversionResultDiv.style.display = "block";
    conversionResultDiv.style.fontSize = "1.5em"; // Larger text for result
    conversionResultDiv.style.padding = "15px"; // Added padding for visibility
  } else {
    // Handle unsupported currencies
    conversionResultDiv.textContent =
      "Currency conversion not supported for the selected currencies.";
    conversionResultDiv.style.color = "red";
    conversionResultDiv.style.display = "block";
    conversionResultDiv.style.fontSize = "1.2em"; // Consistent font size for error
    conversionResultDiv.style.padding = "10px"; // Added padding for better error visibility
  }
}

// Event Listener for Form Submission
form.addEventListener("submit", convertCurrency);

// Start the glowing animation
animateTitleGlow();
