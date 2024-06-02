import Joi from '@hapi/joi';
import { JoiObjectId, JoiUrlEndpoint } from '../../../helpers/validator';

export default {
  createPost: Joi.object().keys({
    category: Joi.string().required(), // vente ou location
    action: Joi.string().required(),
    //images: Joi.array().items(Joi.string().uri()).required(),
    address: Joi.object().keys({
      Path: Joi.string().required(),} // Rendre le pays obligatoire
      ).optional(),
    //address: Joi.string().required(), // "maison" ou "véhicule"
    propertyType: Joi.string().required(),
    Name:Joi.string().required(),
    description: Joi.string().required(),
    Country: Joi.string().optional(),
    SalePrice: Joi.number().optional(),
    RentPrice: Joi.number().optional(),
    Space: Joi.number().optional(),
    availableDateforRent: Joi.string().optional(),
    selectedDates: Joi.string().optional(),
    verifCode : Joi.string().optional(),
    Mileage: Joi.number().optional(),
    Color: Joi.string().optional(),
    Condition: Joi.string().optional(),
    Transmission: Joi.string().optional(),
    displacementMoto: Joi.number().optional(),
    Vehiculedisplacement: Joi.number().optional(),
    Year: Joi.number().optional(),
    Marque: Joi.string().optional(),
    phone: Joi.string().required(),
    Model: Joi.string().optional(),
    below: Joi.number().optional(),
    above: Joi.number().optional(),
    FiscalPower: Joi.number().optional(),
    BodyType: Joi.string().optional(),
    Fuel: Joi.string().optional(),
    TruckType: Joi.string().optional(),
    OtherType: Joi.string().optional(), 
     
  }),
  updatePost: Joi.object().keys({
    action: Joi.string().optional(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    category: Joi.string().optional(), // vente ou location
    address: Joi.string().optional(), // "maison" ou "véhicule"
    propertyType: Joi.string().optional(),
    Name:Joi.string().optional(),
    isApproved:Joi.boolean().optional(),
    description: Joi.string().optional(),
    Country: Joi.string().optional(),
    SalePrice: Joi.number().optional(),
    RentPrice: Joi.number().optional(),
    Space: Joi.number().optional(),
    availableDateforRent: Joi.string().optional(),
    selectedDates: Joi.array().items(Joi.string()).optional(),
    Mileage: Joi.number().optional(),
    Color: Joi.string().optional(),
    Condition: Joi.string().optional(),
    Transmission: Joi.string().optional(),
    displacementMoto: Joi.number().optional(),
    Vehiculedisplacement: Joi.number().optional(),
    Year: Joi.number().optional(),
    Marque: Joi.string().optional(),
    Model: Joi.string().optional(),
    below: Joi.number().optional(),
    above: Joi.number().optional(),
    FiscalPower: Joi.number().optional(),
    BodyType: Joi.string().optional(),
    Fuel: Joi.string().optional(),
    TruckType: Joi.string().optional(),
    OtherType: Joi.string().optional(),  
  }),
  postID: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
};
