const fetch = require('node-fetch'); 
const fs = require('fs'); 

// Step 1: Fetch data from GraphQL API
const fetchGraphQLData = async () => {
  const query = `
    query {
      countries {
        name
        capital
        currency
      }
    }
  `;

  try {
    // Making a POST request to the GraphQL API
    const response = await fetch('https://countries.trevorblades.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Specifying JSON content type
      body: JSON.stringify({ query }), // Sending the GraphQL query in the body
    });

    const data = await response.json(); 
    return data.data.countries;
  } catch (error) {
    console.error('Error fetching GraphQL data:', error); // Handle fetch errors
    throw error; // Rethrow the error for further handling
  }
};

// Step 2: Post data to REST API
const postToRestAPI = async (country) => {
  // Prepare the payload for the POST request
  const payload = {
    title: `Country: ${country.name}`, 
    body: `Capital: ${country.capital}, Currency: ${country.currency}`,
    userId: 1, // Dummy userId as required by the API
  };

  try {
    // Making a POST request to the REST API
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(payload), // Sending the payload in the body
    });

    const result = await response.json(); 
    console.log('POST Response:', result); 
  } catch (error) {
    console.error('Error posting to REST API:', error); // Handle POST errors
  }
};

// Step 3: Error Handling (simulate errors)
const handleErrors = async (simulateErrorType) => {
  try {
    if (simulateErrorType === 403) {
      // Handle 403 Forbidden error
      console.error('Error 403: Forbidden. Skipping request.');
    } else if (simulateErrorType === 500) {
      // Handle 500 Internal Server Error with exponential backoff
      console.log('Error 500: Retrying request...');
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
      console.log('Retry successful.');
    } else {
      throw new Error('Unexpected error occurred.');
    }
  } catch (error) {
    console.error('Error handled:', error.message); 
  }
};

// Step 4: Save data to a CSV file
const saveToCSV = (countries) => {
  const csvHeader = 'Country Name,Capital,Currency\n'; // CSV column headers
  const csvRows = countries
    .map((country) => `${country.name},${country.capital},${country.currency}`)
    .join('\n'); // Format data rows for CSV

  // Write the CSV content to a file
  fs.writeFileSync('countries.csv', csvHeader + csvRows, 'utf8');
  console.log('Saved countries to countries.csv');
};

// Step 5: Automate the Workflow
const automateWorkflow = async () => {
  try {
    
    const countries = await fetchGraphQLData();
    saveToCSV(countries);
    // Post one country's details to the REST API
    if (countries.length > 0) {
      await postToRestAPI(countries[0]); 
    }
  } catch (error) {
    console.error('Workflow error:', error);
  }
};

automateWorkflow();
