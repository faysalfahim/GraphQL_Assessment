# API Automation Script

This project automates the process of fetching country data using a GraphQL API, posting selected country details to a REST API, and saving the data to a CSV file. It includes robust error handling and uses JavaScript for implementation.

## Features

- Fetches data from a GraphQL API.
- Posts data to a REST API.
- Handles HTTP errors like **403 Forbidden** and **500 Internal Server Error** with logging and retry mechanisms.
- Saves country details into a CSV file.
- Fully automated workflow.

---

## Approach

### 1. Fetching Data
- The script queries the **Countries GraphQL API** to retrieve country data, including names, capitals, and currencies.

### 2. Posting Data
- The first country's details are posted to the REST API at `https://jsonplaceholder.typicode.com/posts` with the required payload format.

### 3. Error Handling
- **403 Forbidden**: Skips the request.
- **500 Internal Server Error**: Implements an exponential backoff retry mechanism.
- Logs all errors to the console.

### 4. Data Saving
- All fetched country data is saved to a CSV file named `countries.csv`.

### 5. Automation
- The script automates the entire workflow, chaining data fetching, processing, posting, and saving.

---

## Prerequisites

- **Node.js**: Ensure you have Node.js (v14 or above) installed on your system.
- **Dependencies**: The script uses `node-fetch` for API requests and `fs` for file handling.

---

## Installation and Usage

### 1. Clone or Copy the Script
Save the script as `script.js`.

### 2. Install Dependencies
Run the following command to install the required package:

```bash
npm install node-fetch@2
```

### 3. Run the Script
Execute the script using Node.js:

```bash
node script.js
```

---

## File Output

- The script generates a CSV file named `countries.csv` in the same directory, containing details of all fetched countries.

---

## Error Handling Details

1. **403 Forbidden**:
   - Skips the request and logs the error to the console.

2. **500 Internal Server Error**:
   - Implements an exponential backoff retry mechanism before reattempting the request.
   - Logs the error to the console if retries fail.

---

## Dependencies Used

- **node-fetch**: For making API requests.
- **fs**: For handling file operations.

---

## Example Workflow

1. Fetch data from the GraphQL API.
2. Post the first country's details to the REST API.
3. Save all country data to `countries.csv`.
4. Handle errors during the workflow with logging and retry mechanisms.

---

## Notes

- Ensure that your system has a stable internet connection while running the script.
- Modify the script as needed for additional functionality or custom requirements.
