export interface Patient {
  uuid: string;
  identifiers: Identifier[];
  display: string;
  person: {
    uuid: string;
    display: string;
    gender: string;
    age: number;
    birthdate: string;
    birthdateEstimated: boolean;
    dead: boolean;
    deathDate?: any;
    causeOfDeath?: any;
    preferredAddress: {
      address1: string;
      cityVillage: string;
      country: string;
      postalCode: string;
      stateProvince: string;
      countyDistrict: string;
    };
    attributes: any[];
    voided: boolean;
    birthtime?: any;
    deathdateEstimated: boolean;
    resourceVersion: string;
  };
  attributes: { value: string; attributeType: { uuid: string; display: string } }[];
  voided: boolean;
}

export interface Identifier {
  uuid: string;
  display: string;
}
