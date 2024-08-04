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

    Install dotenv:

    ```bash
    npm install dotenv
    ```

4. **Create .env**

1. Duplicate the .env.example file as .env
2. Add your client_id and client_secret

## Running Tests

### Running All Tests

To run all tests, use:

```bash
npx playwright test
```

## Testing Approach

Understanding the application's structure.
Flow of the test case.
Works on ui, headless and different browsers.
Tests were only done on desktop view and mobile was not considered.


The Japan specific test is categorized under the local e-sim test to allow for expansion to other countries if necessary. POM (Page Object Model) is used for the Home Page and Country Page to allow for reusability and maintainability. The API testing

placed getting the token in a beforeall hook, centralizes the token retrieval logic, making your tests cleaner and easier to maintain

If the token retrieval fails (e.g., due to missing environment variables), the test suite will halt immediately, avoiding further unnecessary requests

This ensures the token is available for all test cases