import React, { useEffect, useState } from "react";

/**
 * Custom React hook for making fetch requests.
 *
 * @param {string|null} [initialPath=null] - The initial API endpoint to fetch data from. If null, no request is made until explicitly triggered.
 * @param {Object} [defaultOptions={}] - Default fetch options such as method, headers, and credentials.
 * @param {string} [defaultOptions.method="GET"] - The HTTP method (e.g., "GET", "POST", "PUT", etc.).
 * @param {Object} [defaultOptions.headers={"Content-Type": "application/json"}] - Headers to include in the request.
 * @param {string} [defaultOptions.credentials="include"] - Determines whether cookies should be sent with the request.
 *
 * @returns {Array} - An array containing:
 *   - `{Object}` response: The fetched data, loading state, and any errors.
 *     - `{any}` response.data - The JSON-parsed response data.
 *     - `{boolean}` response.loading - Whether the request is in progress.
 *     - `{string|null}` response.error - The error message if the request fails.
 *   - `{Function}` updateFetch - A function to trigger a new fetch request.
 *
 * @example
 * const [{ data, loading, error }, fetchData] = useFetch();
 *
 * useEffect(() => {
 *   fetchData("/api/users"); // Triggers a GET request
 * }, []);
 *
 * const handleSubmit = () => {
 *   fetchData("/auth/login", {
 *     method: "POST",
 *     body: JSON.stringify({ username, password }),
 *   });
 * };
 */

function useFetch(path = null, defaultOptions = {}) {
  const [urlPath, setUrlPath] = useState(path);
  const [baseUrl, setBaseUrl] = useState(null);
  const [options, setOptions] = useState({
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...defaultOptions,
    credentials: "include",
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (!urlPath || !shouldFetch) return;

    const fetchUrl = baseUrl ? baseUrl : import.meta.env.VITE_FETCH_URL;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${fetchUrl}${urlPath}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlPath, options, baseUrl]);

  const updateFetch = (newPath, newOptions = {}, url = null) => {
    setUrlPath(newPath);
    setOptions((prevOptions) => {
      // needed to remove "credentials" from TheDogAPI call(s)
      // TODO: may need to find a better way to handle headers
      if (newOptions.headers && "x-api-key" in newOptions.headers) {
        delete prevOptions.credentials
      }
      return {
        ...prevOptions,
        ...newOptions,
      };
    });
    setBaseUrl(url);
    setShouldFetch(true);
  };
  return [{ data, loading, error }, updateFetch];
}

export default useFetch;
