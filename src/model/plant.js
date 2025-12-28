

export class Plant { 
    constructor(plantData){
        this.id = plantData["id"];
        this.commonName = plantData["Common name"] || "Unkown name";
    }
}