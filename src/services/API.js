const BASE_URL = "https://restcountries.com/v3.1";

export async function getAllCountries() {
  const response = await fetch(
    `${BASE_URL}/all?fields=name,flags,cca3`
  );
  return response.json();
}
