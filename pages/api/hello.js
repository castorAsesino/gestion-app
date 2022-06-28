// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';


/* export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
} */


export default async function handler(req, res) {

    const prisma = new PrismaClient();
    if(req.method === 'GET'){
      const results = await prisma.proceso.findMany();
      return res.status(200).json(results);
      //res.status(200).json(results);
    }
  
    //return res.status(200).json(results);
 
}


