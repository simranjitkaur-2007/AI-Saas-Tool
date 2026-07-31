import { neon } from '@neondatabase/serverless'
const sql = neon(process.env.DATABASE);

export default sql