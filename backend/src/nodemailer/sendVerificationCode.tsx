import nodemailer from 'nodemailer';
import asyncHandler from '../helpers/asyncHandler';
import UserRepo from "../database/repository/UserRepos";
interface ValidationCodeCache {
    [key: string]: string; 
}

export const validationCodeCache: ValidationCodeCache = {};
export const sendVerificationCode = asyncHandler(async (req, res) => {
    try {
        //const { user_email } = req.body;
        const { user_email, request_type } = req.body;

        // Vérifier le type de demande
        if (request_type === 'signup') {
            // Vérifier si l'e-mail existe déjà pour l'inscription
            const userExists = await UserRepo.findByEmail( user_email );
            if (userExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use! Please try a different email!',
                });
                //ch
            }
        } else if (request_type === 'forgotpassword') {
            // Vérifier si l'e-mail existe pour la réinitialisation de mot de passe
            const userExists = await UserRepo.findByEmail( user_email );
            if (!userExists) {
                return res.status(400).json({
                    success: false,
                    message: 'This email is not associated with an account. Please check your email!',
                });
            }
        } else if (request_type === "profileSettings") {
            // Vérifier si l'e-mail existe pour la réinitialisation de mot de passe
            const userExists = await UserRepo.findByEmail(user_email);
            if (userExists) {
              return res.status(400).json({
                success: false,
                message: "Email already in use! Please try a different email!",
              });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Type de demande invalide.',
            });
        }

        // Générer le code de vérification
        function generateValidationCode() {
            return Math.random().toString(36).substring(2, 8).toUpperCase();
        }

        const validationCode = generateValidationCode();

        validationCodeCache[user_email] = validationCode;

        const mailOptions = {
            from: 'amoulabenyagoub2002@gmail.com',
            to: user_email,
            subject: 'Code de vérification',
            html: `
            <html>
            <body style="text-align: center; color: black;">
                <h1><strong>Action Required: One-Time Verification Code</strong></h1>
                <p style="font-size: 16px;">Thank you for your interest in our services.</p>
                <p style="font-size: 16px;">To proceed with the verification of your email address, we require you to enter the following one-time verification code:</p>
                <h2>${validationCode}</h2>
                <p style="font-size: 16px;">Please enter this code on the verification page to complete the process.</p>
                <p style="font-size: 16px;">If you encounter any issues or have questions, please don't hesitate to contact us at [Contact Information].</p>
            </body>
            </html>
               `,
        };

        // Envoyer l'e-mail
        await sendEmail(mailOptions);

        // Réponse réussie
        return res.status(200).json({
            success: true,
            message: 'Code de vérification envoyé avec succès.',
            verificationCode: validationCode,
        });
    } catch (error:any) {
        console.error('Erreur lors de l\'envoi du code de vérification :', error);
        return res.status(500).json({
            message: 'Erreur lors de l\'envoi du code de vérification.',
            error: error.message,
        });
    }
});

// Fonction pour envoyer l'e-mail
const sendEmail = async (mailOptions:any) => {
    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'amoulabenyagoub2002@gmail.com',
            pass: 'lzmrxgimpxjepuih',
        },
    });

    // Envoi de l'e-mail
    await transporter.sendMail(mailOptions);
};
