/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts operations
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     PostRequestForm1:
 *       type: object
 *       properties:
 *         category: 
 *           type: string
 *           description: Category of RealState
 *         action: 
 *           type: string
 *           description: action of RealState              
 *         propertyType :
 *           type: string
 *           description: propertyType of RealState
 *         Country : 
 *           type: string
 *           description: Country 
 *         address :
 *           type: string
 *           description: address
 *         SalePrice :
 *           type: number
 *         RentPrice : 
 *           type: number
 *         description :
 *           type: string
 *           description: description of RealState
 *         Space :
 *           type: number
 *         Name :
 *           type: string
 *           description: owner's name
 *         email :
 *           type: string
 *           description: owner's email
 *         availableDateforRent:
 *           type: string
 *           description: available Date for Rent
 *         selectedDates :
 *           type: string
 *     PostRequestForm2:
 *       type: object
 *       properties:
 *         category: 
 *           type: string
 *           description: Category of RealState
 *         action: 
 *           type: string
 *           description: action of RealState              
 *         propertyType :
 *           type: string
 *           description: propertyType of RealState
 *         Mileage : 
 *           type: number 
 *         address :
 *           type: string
 *           description: address
 *         SalePrice :
 *           type: number
 *         RentPrice : 
 *           type: number
 *         description :
 *           type: string
 *           description: description of RealState
 *         Color :
 *           type: number
 *         Name :
 *           type: string
 *           description: owner's name
 *         email :
 *           type: string
 *           description: owner's email
 *         Condition:
 *           type: string
 *           description: available Date for Rent
 *         Transmission :
 *           type: string
 *         displacementMoto: 
 *           type: number
 *         Year:
 *           type: number
 *         Marque:
 *           type: string
 *         Model: 
 *           type: string
 *         FiscalPower:
 *           type: number
 *         BodyType:
 *           type: string
 *         Fuel:
 *           type: string
 *     PostRequest:
 *       oneOf:
 *         - $ref: '#/components/schemas/PostRequestForm1'
 *         - $ref: '#/components/schemas/PostRequestForm2'
 *     PostsResponse:
 *       oneOf:
 *         - $ref: '#/components/schemas/PostRequestForm1'
 *         - $ref: '#/components/schemas/PostRequestForm2'            
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostRequest'
 *     responses:
 *       200:
 *         description: Post is Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Post is Created successfully
 *                   example: Post is Created successfully
 */
/**
 * @swagger
 * /posts/all:
 *   get:
 *     summary: Get all posts
 *     description: Retrieves all posts based on optional query parameters.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Number of posts per page
 *       - in: query
 *         name: deleted
 *         schema:
 *           type: boolean
 *         description: Filter for deleted posts
 *     responses:
 *       200:
 *         description: All posts returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostsResponse'
 */
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     description: Retrieves a post by its ID.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostsResponse'
 *
 *   patch:
 *     summary: Update a post by ID
 *     description: Updates a post's details by its ID.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostRequest'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostsResponse'
 *
 *   delete:
 *     summary: Delete a post by ID
 *     description: Deletes a post by its ID.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Post deleted successfully
 */
