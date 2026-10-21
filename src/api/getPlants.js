const HOUSEPLANTKEY = import.meta.env.VITE_HOUSEPLANTKEY;
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
