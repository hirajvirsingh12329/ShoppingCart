
export interface City {
  code: string;
  name: string;
  countryCode: string;
}


export interface Country {
  code: string;
  name: string;
}

export interface Employee {
  firstname: string;
  lastname: string;
  country: string;
  city: string;
  gender: string;
  pincode: string;
  married:boolean;
  dateOfBirth:Date;
  address:string;
  empId:string
}