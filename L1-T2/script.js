// Task 1: Change button color on click
function changeColor() {
    const button = document.getElementById('colorButton');
    // Generate random RGB color
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    button.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Task 2: Show greeting based on current time
function showGreeting() {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning! ☀️";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon! 🌤️";
    } else {
        greeting = "Good Evening! 🌙";
    }

    alert(greeting);
}

// Task 3: Simple addition calculator
function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultDiv = document.getElementById('result');

    // Check if both inputs are valid numbers
    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#ffebee';
        resultDiv.style.borderLeft = '4px solid #f44336';
        resultDiv.textContent = 'Please enter valid numbers!';
        return;
    }

    const sum = num1 + num2;
    resultDiv.style.display = 'block';
    resultDiv.style.backgroundColor = '#e8f5e9';
    resultDiv.style.borderLeft = '4px solid #4CAF50';
    resultDiv.textContent = `Result: ${num1} + ${num2} = ${sum}`;
}