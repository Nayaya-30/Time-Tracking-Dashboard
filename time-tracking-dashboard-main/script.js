const titles = document.querySelectorAll('.txt span i');
const currentHrs = document.querySelectorAll('.txt h2');
const previousHrs = document.querySelectorAll('.txt p');
const timeFrames = document.querySelectorAll('.type span');

// Globalizing data
let data = [];

// Fetching the data from my local JSON file
async function fetchData() {
    try {
        const response = await fetch('./data.json');
        
        // If for some reason the file could not be fetched throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
        console.log(data);
        
        // Default preview on loading
        updateUI('daily'); 
    }
    // Catching default error
    catch (error) {
        console.error('Failed to load JSON:', error);
    }
}

// Updating the UI based on selected timeframe
function updateUI(selectedTimeframe) {
    data.forEach((item, i) => {
        titles[i].innerText = item.title;
        currentHrs[i].innerText = `${item.timeframes[selectedTimeframe].current}hrs`;
        console.log(item, i);

        let label = 'Yesterday';
        if (selectedTimeframe === 'weekly') label = 'Last Week';
        if (selectedTimeframe === 'monthly') label = 'Last Month';

        previousHrs[i].innerText = `${label} - ${item.timeframes[selectedTimeframe].previous}hrs`;
    });
}

// Adding click listeners on the timeframe spans
timeFrames.forEach(span => {
    span.addEventListener('click', () => {
        
        // Removing 'selected' class from all unclicked spans
        timeFrames.forEach(span => span.classList.remove('selected'));
        
        // Adding 'selected' class to a clicked span
        span.classList.add('selected');

        // Getting a timeframe from the clicked span's inner text
        const selected = span.innerText.toLowerCase();
        updateUI(selected);
    });
});

// Default calling to fetch
fetchData();