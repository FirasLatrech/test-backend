// import { Request, Response, NextFunction } from "express";

// import { check, validationResult } from "express-validator";

// export function createValidationFor(route: string) {
//   switch (route) {
//     case "register":
//       return [
//         check("name")
//           .not()
//           .isEmpty()
//           .withMessage("name is required."),
      
//         check("phone").not().isEmpty().withMessage("phone is required.").isLength({ min: 8 }),
//         check("email").not().isEmpty().withMessage("email is required"),
//         check("password")
//           .isLength({ min: 6 })
//           .withMessage("Please enter a valid password ( min length is 6 )."),
//       ];
//     case "login":
//       return [
//         check("password")
//           .isLength({ min: 6 })
//           .withMessage("Please enter a valid password ( min length is 6 )."),
//       ];
//     case "chapter": 
//       return [
//         check("chapterName")
//           .isLength({min :3})
//           .withMessage("Please Chapter Name  ( min length is 3 )"),

//         check("subjectId")
//           .notEmpty()
//           .withMessage('Subject ID is required')
//           .isMongoId()
//           .withMessage('Invalid MongoDB ObjectId'),
//       ]
//     default:
//       return [];
//   }
// }

// export function checkValidationResult(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const result = validationResult(req);
//   if (result.isEmpty()) {
//     return next();
//   } 

//   res.status(422).json({
//     error: {
//       message: result.array({ onlyFirstError: true })[0].msg ,
//     },
//     listerrors: result.array(),
//   });
// }


import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validate;