/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email address
 *         password:
 *           type: string
 *           description: Minimum of 8 characters long ,The password must contain at least one lowercase letter, one uppercase letter and a number
 *     Signup:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name
 *         lastname:
 *           type: string
 *           description: The last name
 *         email:
 *           type: string
 *           description: Email address
 *         password:
 *           type: string
 *           description: Minimum of 8 characters long ,The password must contain at least one lowercase letter, one uppercase letter and a number
 *     RefreshToken:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: refresh token
 *     AccessToken:
 *       type: object
 *       required:
 *         - accessToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description: access token
 *     Tokens:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: access Token
 *         refreshToken:
 *           type: string
 *           description: refresh Token
 *     User:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name
 *         lastname:
 *           type: string
 *           description: The last name
 *         email:
 *           type: string
 *           description: Email address
 */

/**
 * @swagger
 * tags:
 *   name: Access
 *   description:  Access group
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Signup'
 *     tags: [Access]
 *     responses:
 *       200:
 *         description: Register Success
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   user:
 *                      $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Login'
 *     tags: [Access]
 *     responses:
 *       200:
 *         description: Login Success
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   user:
 *                      $ref: '#/components/schemas/User'
 *                   tokens:
 *                      $ref: '#/components/schemas/Tokens'
 *
 */

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Register
 *     tags: [Access]
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: refresh token
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/AccessToken'
 *     security:
 *      - bearerAuth: []
 *
 */
/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: Logout
 *     tags: [Access]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                      default: Logout success
 *
 *     security:
 *      - bearerAuth: []
 *
 */

/**
 * @swagger
 * /VerifycodeationCode:
 *   post:
 *     summary: send verification code 
 *     description: Sends a verification code to the user's email address.
 *     tags: [Access]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *     responses:
 *       200:
 *         description: Code de vérification envoyé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Code de vérification envoyé avec succès
 */

/**
 * @swagger
 * /verifyCode:
 *   post:
 *     summary: Verify Code
 *     description: 
 *     tags: [Access]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               verificationCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful email verification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Email verification successful
 */
/**


/**
 * @swagger
 * /resetPassword/{id}:
 *   put:
 *     summary: Reset password
 *     description: Reset user password using the provided token and user ID.
 *     tags: [Access]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Password updated successfully
 */
