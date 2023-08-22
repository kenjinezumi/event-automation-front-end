export async function fetchIndustries() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/industries/");
      const jsonData = await response.json();
      const uniqueIndustries = jsonData.industries;

      return uniqueIndustries;
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  }

  export async function fetchFunctions() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/functions/");
      const jsonData = await response.json();
      const uniqueFunctions = jsonData.job_function;

      return uniqueFunctions;
    } catch (error) {
      console.error("Error fetching functions:", error);
    }
  }

  export async function fetchAccount() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/");
      const jsonData = await response.json();
      const uniqueAccounts = jsonData.account_id;

      return uniqueAccounts;
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }

  export async function fetchSeniority() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/seniority/");
      const jsonData = await response.json();
      const uniqueSeniority = jsonData.seniority;

      return uniqueSeniority;
    } catch (error) {
      console.error("Error fetching seniority", error);
    }
  }

  export async function fetchCountry() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/countries/");
      const jsonData = await response.json();
      const uniqueCountries = jsonData.country;

      return uniqueCountries;
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  }

  export async function fetchBdrs() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bdrs/");
      const jsonData = await response.json();
      const uniqueBdrs = jsonData.unique_bdr_id;

      return uniqueBdrs;
    } catch (error) {
      console.error("Error fetching bdrs", error);
    }
  }