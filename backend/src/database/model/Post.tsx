import { model, Schema, Document } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import User from './User';

// Définition des enums
export enum MaisonPropertyTypes {
  
  apartment = "Apartment",
  villa = "Villa",
  house = "House",
  office = "Office",
  building = "Building",
  townhouse = "Townhouse",
  shop = "Shop",
  garage = "Garage",
}

export enum VehiculePropertyTypes {
  Motos = "Motos",
  Vehicle = "Vehicle",
  Truck = "Truck",
  Other = "Other",
}
export enum ColorEnum {
  Blue = "Blue",
  White = "White",
  Black = "Black",
  Red = "Red",
  Green = "Green",
  Autre = "Autre"
}

export enum ConditionEnum {
  Nouveau= "Nouveau",
  WithMileage= "With Mileage",
  Unpaid= "Unpaid",
  RS= "RS",
  MissingPieces= "Missing pieces"

}

export enum TransmissionEnum {
  Automatic= "Automatic",
  Manual= "Manual",
  SemiAutomatic = "Semi-automatic"
}

type BrandModels = { [brand: string]: string[] };

export const brandsWithModels: BrandModels = {
  Toyota: ["Corolla", "Camry", "RAV4", "Highlander", "Prius", "Hilux"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit", "HR-V"],
  Ford: ["Fiesta", "Focus", "Mustang", "Explorer", "F-150", "Ranger"],
  Chevrolet: ["Silverado", "Malibu", "Equinox", "Tahoe", "Camaro", "Trailblazer"],
  Nissan: ["Altima", "Sentra", "Leaf", "Maxima", "Rogue", "Navara"],
  BMW: ["3 Series", "5 Series", "X5", "X3", "M3", "X6"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "A-Class"],
  Audi: ["A4", "A6", "Q5", "Q7", "TT", "Q3"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Jetta", "Beetle", "Polo"],
  Subaru: ["Outback", "Forester", "Impreza", "Legacy", "Crosstrek", "XV"],
  Peugeot: ["208", "308", "508", "2008", "3008", "5008"],
  Citroen: ["C3", "C4", "C5 Aircross", "Berlingo", "C3 Picasso"],
  Renault: ["Clio", "Megane", "Kadjar", "Talisman", "Duster", "Captur"],
  Fiat: ["500", "Panda", "Punto", "Tipo", "500X", "Doblo"],
  Hyundai: ["i10", "i20", "i30", "Tucson", "Santa Fe", "Elantra"],
  Kia: ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "Soul"],
  Dacia: ["Sandero", "Logan", "Duster", "Lodgy", "Stepway"],
  Skoda: ["Fabia", "Octavia", "Superb", "Kodiaq", "Karoq"],
};

export enum BodyTypeEnum {
  Compacte= 'Compacte',
  Berline='Berline',
  Cabriolet='Cabriolet',
  X4 = '4X4',
  Monospace='Monospace',
  Utilitaire='Utilitaire',
  PickUp='PickUp',
  Autre='Autre',
}
export enum AutreTypeEnum {
  Forklift = 'Forklift',
  ConstructionMachine = 'ConstructionMachine',
  Trailer = 'Trailer',
  AgriculturalVehicle = 'AgriculturalVehicle',
}
export enum FuelEnum {
  Essence = 'Essence',
  Diesel = 'Diesel',
  Hybride = 'Hybride',
  Electric = 'Electric'
}

export enum TruckTypesEnum {
  Bus = 'Bus',
  Truck = 'Truck',
  SemiTrailerTruck = 'SemiTrailerTruck',
}

export enum StatusEnum {
  UnRent = 'UnRent',
  Rented = 'Rented',
  Bought = 'Bought',
  Sell = 'Sell',
}

export type CategoryType = 'realEstate' | 'vehicle'| '';
export type ActionType = 'rent' | 'sell'| '';  

export default interface Post extends Document {
  _id: string;
  category: CategoryType, // "maison" ou "véhicule"
  action: ActionType, // vente ou location
  propertyType: MaisonPropertyTypes | VehiculePropertyTypes;
  Country?: string;
  address: string;
  SalePrice?: number; 
  RentPrice?: number;
  author: User;
  isApproved?: boolean;
  description: string;
  phone: string;
  Space?: number;
  Name: string;
  availableDateforRent: string,
  selectedDates?: string,
  images: object,
  //images: File[];
  Mileage?: number
  Color?: ColorEnum
  Condition?: ConditionEnum
  Transmission?: TransmissionEnum
  displacementMoto?: number
  Vehiculedisplacement?: number
  Year?: number
  Marque: string
  Model: string
  below?: number
  above?: number
  FiscalPower: number
  BodyType: BodyTypeEnum
  Fuel: FuelEnum
  TruckType: TruckTypesEnum
  OtherType?: AutreTypeEnum 
  verifCode:string
  Status?: StatusEnum
  createdAt?: Date;
  updatedAt?: Date;
  //imagePath?: string;
}

  
const schema = new Schema({
  category: {
     type: Schema.Types.String,
     enum: ['realEstate', 'vehicle'] 
  },
  action: {
     type: Schema.Types.String, 
     enum: ['rent', 'sell']
  },
  propertyType: {
     type: Schema.Types.String, 
     enum:[...Object.values(MaisonPropertyTypes), ...Object.values(VehiculePropertyTypes)] 
  },
  author: { 
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  },
  isApproved: {
    type: Schema.Types.Boolean, 
    default: false, 
  },
  Country: { 
    type: Schema.Types.String, 
  },
  //verifCode: {type: Schema.Types.String,},
  address: { type: Schema.Types.String,  },
  SalePrice: { type: Schema.Types.Number },
  RentPrice: { type: Schema.Types.Number },
  description: { type: Schema.Types.String, },
  Space: { type: Schema.Types.Number },
  Name: { type: Schema.Types.String },

  availableDateforRent: { type: Schema.Types.String},
  selectedDates: { type: Schema.Types.String},
  //images: { type:[String]},
  images: { Path: { type: Schema.Types.String }},
  Mileage: { type: Schema.Types.Number },
  Color: { type:Schema.Types.String, enum: Object.values(ColorEnum) },
  Condition: { type: Schema.Types.String, enum: Object.values(ConditionEnum) },
  Transmission: { type: Schema.Types.String, enum: Object.values(TransmissionEnum) },
  displacementMoto: { type: Schema.Types.Number },
  Vehiculedisplacement: { type: Schema.Types.Number },
  Year: { type: Schema.Types.Number },
  Marque: { type: Schema.Types.String },
  Model: { type: Schema.Types.String },
  //images: { type: [Schema.Types.String] },
  phone: { type: Schema.Types.String },
  //images: { type: Schema.Types.String },
  below: { type: Schema.Types.Number },
  above: { type: Schema.Types.Number },
  FiscalPower: { type: Schema.Types.Number },
  BodyType: { type: Schema.Types.String, enum: Object.values(BodyTypeEnum) },
  Fuel: { type: Schema.Types.String, enum: Object.values(FuelEnum) },
  TruckType: { type: Schema.Types.String, enum: Object.values(TruckTypesEnum) },
  OtherType : {type: Schema.Types.String},
  Status: { type: Schema.Types.String, enum: Object.values(StatusEnum) },
  createdAt: {
    type: Schema.Types.Date,
    required: true,
    select: false,
  },
  updatedAt: {
    type: Schema.Types.Date,
    required: true,
    select: false,
  },
  deletedAt: {
    type: Schema.Types.Date,
    select: true,
  },
  
});

schema.plugin(mongoosePagination);
export const PostModel = model<Post, Pagination<Post>>('Post', schema, 'posts');




