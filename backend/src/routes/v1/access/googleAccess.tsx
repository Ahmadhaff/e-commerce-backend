import express, { Request, Response } from 'express';
import  passport  from '../../../middlewares/google0Auth'; // Assurez-vous d'importer le fichier de configuration Passport

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for handling callback from Google
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3001/api/v1/login' }),
   (req: Request, res: Response) => {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3001');
  }
);


export default router;





