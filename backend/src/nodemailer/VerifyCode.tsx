import asyncHandler from '../helpers/asyncHandler';
import {validationCodeCache} from '../nodemailer/sendVerificationCode';

export const verifyCode = asyncHandler(async (req, res) => {
    const { user_email, verificationCode } = req.body;

    try {
        // Récupérer le code de validation précédemment stocké
        const storedValidationCode = validationCodeCache[user_email];

        if (storedValidationCode && storedValidationCode === verificationCode) {
            // Supprimer le code de validation du cache après utilisation
            delete validationCodeCache[user_email];

            // Effectuer la validation réussie et procéder à la mise à jour des données dans la base de données

            console.log('Email validation successful!');
            return res.status(200).json({
                success: true,
                message: 'Email validation successful!',
            });
        } else {
            console.error('Échec de la validation de l\'e-mail : code invalide ou expiré.');
            return res.status(400).json({
                success: false,
                message: 'Invalid verification code!',
            });
        }
    } catch (error: any) {
        console.error('Erreur lors de la vérification de l\'e-mail :', error);
        return res.status(500).json({
            message: 'Erreur lors de la vérification de l\'e-mail.',
            error: error.message,
        });
    }
});
