import express, { Request, Response } from 'express';
import  passport  from '../../../middlewares/facebook0Auth'; // Assurez-vous d'importer le fichier de configuration Passport

const router = express.Router();

// Route for initiating Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Route for handling callback from Facebook
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: 'http://localhost:3001/api/v1/login' }),
  (req: Request, res: Response) => {
    /*const { accessToken, refreshToken } = req.authInfo as { accessToken: string, refreshToken: string };
    res.json({
      status: 'success',
      message: 'Logged in successfully',
      accessToken,
      refreshToken
    });*/
    res.redirect('http://localhost:3001');
  }
);

export default router;