/**
 * @swagger
 * tags:
 *   name: Chapters
 *   description: Operations related to chapters
 * /api/v0/chapter:
 *   get:
 *     summary: Get all chapters
 *     description: Retrieve a list of all chapters
 *     tags: [Chapters]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               result: 2
 *               data:
 *                 chapters:
 *                   - _id: 1
 *                     chapterName: Chapter 1
 *                   - _id: 2
 *                     chapterName: Chapter 2
 *   post:
 *     summary: Create a new chapter
 *     description: Create a new chapter with the provided data
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chapterName:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Chapter created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 chapter:
 *                   _id: 3
 *                   chapterName: New Chapter
 *       '4xx':
 *         description: Bad request or unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: fail
 *               message: Please provide valid data
 * /chapters/{chapterId}:
 *   get:
 *     summary: Get a specific chapter by ID
 *     description: Retrieve details of a specific chapter
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: chapterId
 *         required: true
 *         description: ID of the chapter
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 chapter:
 *                   _id: 1
 *                   chapterName: Chapter 1
 *       '404':
 *         description: Chapter not found
 *         content:
 *           application/json:
 *             example:
 *               status: fail
 *               message: Chapter not found
 *   put:
 *     summary: Update a chapter by ID
 *     description: Update details of a specific chapter
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chapterId
 *         required: true
 *         description: ID of the chapter
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chapterName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Chapter updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 chapter:
 *                   _id: 1
 *                   chapterName: Updated Chapter 1
 *       '404':
 *         description: Chapter not found
 *         content:
 *           application/json:
 *             example:
 *               status: fail
 *               message: Chapter not found
 *       '4xx':
 *         description: Bad request or unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: fail
 *               message: Please provide valid data
 *   delete:
 *     summary: Delete a chapter by ID
 *     description: Delete a specific chapter
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chapterId
 *         required: true
 *         description: ID of the chapter
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Chapter deleted successfully
 *       '404':
 *         description: Chapter not found
 *         content:
 *           application/json:
 *             example:
 *               status: fail
 *               message: Chapter not found
 *       '4xx':
 *         description: Bad request or unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: fail
 *               message: Please provide valid data
 */
