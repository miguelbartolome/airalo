# Airalo Coding Exercise

This repository contains the unibet/baseball tests for the QA Automation Engineer Interview Task using Playwright. 

## Table of Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Testing Approach](#testing-approach)

## Installation

1. **Install dependencies**

    Ensure you have [Node.js](https://nodejs.org/) installed. Then run:

    ```bash
    npm install
    ```
    
2. **Install Playwright**

    Install Playwright and its browser binaries:

    ```bash
    npx playwright install
    ```

3. **Install dotenv**

    Install the dotenv package to manage environment variables:

    ```bash
    npm install dotenv
    ```

4. **Create .env file**

Duplicate the .env.example file and rename it to .env. Then, add your client_id and client_secret to the new .env file.

## Running Tests

### Running All Tests

To run all tests, use:

```bash
npx playwright test
```

## Testing Approach

### UI Testing

Before beginning any automation, I take the time to understand the application's overall structure. This helps in visualizing the testing approach effectively.

The Japan-specific test is categorized under the local e-SIM test suite, which allows for easy expansion to other countries if necessary. The Page Object Model (POM) is utilized to enhance reusability and simplify future maintenance.

Tests are conducted in both UI and headless modes across different browsers to ensure consistent application behavior. Currently, the focus is on desktop views, and mobile view testing is not included.

### API Testing

Token retrieval is centralized in a beforeAll hook, ensuring that the token is available for all test scenarios. This approach keeps the tests cleaner and reduces redundancy. If token retrieval fails (e.g., due to missing environment variables), the entire test suite halts immediately. This prevents unnecessary requests and ensures that testing is conducted under valid conditions.