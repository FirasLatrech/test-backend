import mongoose from "mongoose";
import {config} from '../config/config'
import logger from './logger'

async function connect(){
  const dbUrl = config.database.DATABASE_URL

try {
  await mongoose.connect(dbUrl)
  logger.info('Connected to DB ✨ ⚡️')
} catch (error) {
  logger.error('Could not connect to  db 👺')
    process.exit(1)
  
}
  
}
export default connect