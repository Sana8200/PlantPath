const HOUSEPLANTKEY = import.meta.env.VITE_HOUSEPLANTKEY;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;
const PROXY_KEY = import.meta.env.VITE_PROXY_KEY;
const USER_NUMBER = import.meta.env.VITE_USER_NUMBER;
const TREFLETOKEN = import.meta.env.VITE_TREFLETOKEN;
import { Plant } from "/src/model/plant.js";

export function getPlantByID(id) {
  const url = "https://house-plants2.p.rapidapi.com/id/" + id;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": HOUSEPLANTKEY,
      "x-rapidapi-host": "house-plants2.p.rapidapi.com",
    },
  };
  function gotResponseACB(response) {
    if (response.status != 200) {
      console.error("Invalid response gotten from API: ", response.status);
    }
    const json = response.json();
    return json;
  }

  try {
    return fetch(url, options).then(gotResponseACB);
  } catch (error) {
    console.error(error);
  }
}

export function doPlantSearchByQuery(query) {
  const url = "https://house-plants2.p.rapidapi.com/search?query=" + query;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": HOUSEPLANTKEY,
      "x-rapidapi-host": "house-plants2.p.rapidapi.com",
    },
  };
  function gotJSONACB(json) {
    const results = [];
    for (const [id, plantWrapper] of Object.entries(json)) {
      const plainPlant = plantWrapper.item;
      if (!plainPlant) continue;
      results.push(new Plant(plainPlant));
    }
    return results;
  }
  function gotResponseACB(response) {
    if (response.status != 200) {
      console.error("Invalid response gotten from API: ", response.status);
    }
    const json = response.json();
    return json;
  }

  try {
    return fetch(url, options).then(gotResponseACB).then(gotJSONACB);
  } catch (error) {
    console.error(error);
  }
}

export function doPlantSearchByCategory(category) {
  const url = "https://house-plants2.p.rapidapi.com/category/" + category;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": HOUSEPLANTKEY,
      "x-rapidapi-host": "house-plants2.p.rapidapi.com",
    },
  };
  function gotResponseACB(response) {
    if (response.status != 200) {
      console.error("Invalid response gotten from API: ", response.status);
    }
    const json = response.json();
    return json;
  }

  try {
    return fetch(url, options).then(gotResponseACB);
  } catch (error) {
    console.error(error);
  }
}

export function getAllCategories() {
  const url = "https://house-plants2.p.rapidapi.com/categories";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": HOUSEPLANTKEY,
      "x-rapidapi-host": "house-plants2.p.rapidapi.com",
    },
  };
  function mapObjectToStringCB(cat) {
    return cat.Category;
  }
  function gotJSONACB(json) {
    var catArray = json.map(mapObjectToStringCB);
    return catArray;
  }
  function gotResponseACB(response) {
    if (response.status != 200) {
      console.error("Invalid response gotten from API: ", response.status);
    }
    const json = response.json();
    return json;
  }

  try {
    return fetch(url, options).then(gotResponseACB).then(gotJSONACB);
  } catch (error) {
    console.error(error);
  }
}

export function getPlantFromTrefle(query) {
  const url =
    PROXY_URL +
    "https://trefle.io/api/v1/plants/search?token=" +
    TREFLETOKEN +
    "&q=" +
    query;
  const options = {
    headers: {
      "X-DH2642-Key": PROXY_KEY,
      "X-DH2642-Group": USER_NUMBER,
    },
  };
  function gotResponseACB(response) {
    if (response.status != 200) {
      console.error("Invalid response gotten from API: ", response.status);
      console.log(response);
    }
    const json = response.json();
    console.log(json);
    return json;
  }

  try {
    return fetch(url, options).then(gotResponseACB);
  } catch (error) {
    console.error(error);
  }
}
