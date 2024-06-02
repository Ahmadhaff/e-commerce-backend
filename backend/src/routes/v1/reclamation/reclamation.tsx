import authentication from '../../../auth/authentication';
import express from 'express';
//import validator, { ValidationSource } from '../../../helpers/validator';
//import schema from './schema';
import {
    createReclamation,
    getAllReclamations
    
  
} from '../../../controllers/reclamationController';

const router = express.Router();

router.use('/', authentication);
router.post("/createReclamation", createReclamation);
router.get("/getReclamation", getAllReclamations); 

export default router;
