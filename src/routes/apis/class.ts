
import { Router } from "express";
import { config } from "../../config/config";
const router = Router();

router.get(
  "/",
 
  (req,res,next)=>{
    res.status(200).json({
      status : 'succes',
      data : "Kas7"
    })
    next()
  }
);
 

export { router as classe };
