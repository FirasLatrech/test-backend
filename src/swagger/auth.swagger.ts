/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 * /api/v0/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               token: <user_token>
 *               refrechToken: <refresh_token>
 *               data:
 *                 user:
 *                   _id: <user_id>
 *                   name: John Doe
 *                   email: john@example.com
 *       '4xx':
 *         description: Bad request or user already exists
 *         content:
 *           application/json:
 *             example:
 *               status: fail
 *               message: Please provide valid credentials
 */
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 * /api/v0/auth/login:
 *   post:
 *     summary: User login
 *     description: Login with the provided credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               token: <user_token>
 *               refrechToken: <refresh_token>
 *       '4xx':
 *         description: Invalid credentials or user not found
 *         content:
 *           application/json:
 *             example:
 *               status: fail
 *               message: Incorrect email or password
 */