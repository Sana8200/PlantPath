import { makeAutoObservable } from "mobx";

// Class for Plant data storing and calculations
export class Plant {
  constructor(plantData) {
    this.id = plantData["id"];
    this.commonName = plantData["Common name"] || "Unkown name";
    this.latinName = plantData["Latin name"] || "Unkown latin name";
    this.family = plantData["Family"];
    this.lightTolered = plantData["Light tolered"] || null;
    this.lightIdeal = plantData["Light ideal"] || null;
    this.img = plantData["Img"]?.replace("http://", "https://") || null;
    this.watering = plantData["Watering"] || null;
    this.wateringIntervalDays =
      plantData["wateringIntervalDays"] || this.getWateringIntervalDays();
    this.quantity = plantData["quantity"] || 1;
    this.pruning = plantData["Pruning"] || null;
    this.sunConditions = this.getPlantSunConditions();

    makeAutoObservable(this);
  }

  changeQuantity(n) {
    this.quantity += n;
  }

  // Helper function for extractLuxFromString
  extractLuxMinAndMaxNumber(numbers, text) {
    const luxValues = numbers.map((n) => parseInt(n.replace(/,/g, "")));
    let min, max;

    if (text.includes("to")) {
      min = Math.min(luxValues[0], luxValues[1]);
      max = Math.max(luxValues[0], luxValues[1]);
      return { min: min, max: max };
    } else if (text.includes("Less than")) {
      return { min: 0, max: max };
    } else {
      return { min: min || 0, max: max || 0 };
    }
  }

  // Helper function for extractLuxFromString
  parseLuxNumberToSunString(lux) {
    if (lux < 500) return "almost no light ☁️";
    if (lux < 5000) return "little sun 🌥️ ";
    if (lux < 20000) return "medium sun 🌤️";
    return "a lot of sun ☀️";
  }

  // Helper function for getPlantSunConditions
  extractLuxFromString(ligthTolerance, ligthIdeal) {
    const numbers = (ligthTolerance || "").match(/\d{1,3}(?:,\d{3})*/g);
    const ligthIdealNumbers = (ligthIdeal || "").match(/\d{1,3}(?:,\d{3})*/g);

    if (!numbers && !ligthIdealNumbers) {
      return null;
    }

    let luxTolerance = this.extractLuxMinAndMaxNumber(numbers, ligthTolerance);
    const luxTolerancemin = this.parseLuxNumberToSunString(luxTolerance.min);
    const luxTolerancemax = this.parseLuxNumberToSunString(luxTolerance.max);
    luxTolerance =
      luxTolerancemin == luxTolerancemax
        ? luxTolerancemin
        : `${luxTolerancemin} to ${luxTolerancemax}`;

    let luxIdeal = this.extractLuxMinAndMaxNumber(
      ligthIdealNumbers,
      ligthIdeal
    );
    const luxIdealmin = this.parseLuxNumberToSunString(luxIdeal.min);
    const luxIdealmax = this.parseLuxNumberToSunString(luxIdeal.max);
    luxIdeal =
      luxIdealmin == luxIdealmax
        ? luxIdealmin
        : `${luxIdealmin} to ${luxIdealmax}`;

    return { luxTolerance, luxIdeal };
  }

  // Gets the sun conditions by parsing the string data of the plant
  getPlantSunConditions() {
    const lightTolerance = this.lightTolered;
    const lighIdeal = this.lightIdeal;

    if (!lightTolerance || !lighIdeal) {
      // TODO if one is missing
      return "Sun conditions unknown 🌱";
    }
    const luxInfo = this.extractLuxFromString(lightTolerance, lighIdeal);

    if (!luxInfo) {
      return "Sun conditions unknown 🌱";
    }

    const { luxTolerance, luxIdeal } = luxInfo;

    if (luxTolerance == luxIdeal) {
      return "This plant thrives in " + luxIdeal;
    }

    return (
      "This plant tolerates " + luxTolerance + " and thrives in " + luxIdeal
    );
  }

  getWateringIntervalDays() {
    const wateringText = this.watering.toLowerCase();
    let wateringFrequency = null;

    if (
      wateringText.includes("must not dry") &&
      wateringText.includes("keep moist")
    )
      wateringFrequency = 2; // keep moist
    else if (
      wateringText.includes("keep moist") &&
      wateringText.includes("can dry")
    )
      wateringFrequency = 4; // can dry a bit
    else if (
      wateringText.includes("half dry") &&
      wateringText.includes("can dry")
    )
      wateringFrequency = 7; // half dry
    else if (
      wateringText.includes("must dry") &&
      wateringText.includes("only when dry")
    )
      wateringFrequency = 12; // water only when dry
    else wateringFrequency = 7; // default once a week

    return wateringFrequency;
  }

  get pruningInfo() {
    if (!this.pruning) {
      return null;
    }

    const pruning = this.pruning.toLowerCase();
    let pruningString = null;

    if (pruning.includes("never")) {
      pruningString = "Does not need pruning";
    }
    if (pruning.includes("if needed")) {
      pruningString = "Prune if needed";
    }

    return pruningString;
  }

  makeSaveableObject() {
    return {
      id: this.id,
      commonName: this.commonName,
      latinName: this.latinName,
      family: this.family,
      lightTolered: this.lightTolered,
      lightIdeal: this.lightIdeal,
      img: this.img,
      watering: this.watering,
      quantity: this.quantity,
      wateringIntervalDays: this.wateringIntervalDays,
      pruning: this.pruning,
      sunConditions: this.sunConditions,
    };
  }
}
