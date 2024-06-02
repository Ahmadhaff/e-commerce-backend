/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile operations
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: Firstname of the user
 *         lastname:
 *           type: string
 *           description: Lastname of the user
 *         profilePicUrl:
 *           type: string
 *           description: URL of the user's profile picture
 */

/**
 * @swagger
 * /profile/my:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile of the currently authenticated user.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 */
/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile
 *     description: Updates the profile of the currently authenticated user.
 *     tags: [Profile]
 *     parameters:
 *        - in: formData
 *          name: profilePicUrl
 *          type: file
 *          description: The profilePic to upload.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Updated first name of the user
 *               lastname:
 *                 type: string
 *                 description: Updated last name of the user
 *               profilePicUrl:
 *                 type: string
 *                 description: Updated profile picture URL of the user
 *               password:
 *                 type: string
 *                 description: Updated password of the user
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 */









