import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const token = jwt.sign("657c61fc217c69581d317557" , process.env.SECRET_TOKEN!)


export default token;
