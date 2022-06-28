import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
   
    switch (req.method) {
      case "GET":
        return await getProceso(req, res);
      case "POST":
        return await saveProceso(req, res);
      default:
        return res.status(400).send("Method not allowed");
    }
  }
  
  const getProceso = async (req, res) => {
    try {
      const results = await prisma.proceso.findMany();
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
  
  const saveProceso = async (req, res) => {
    try {
      const { body: data} = req;
      const newProceso = await prisma.proceso.create({data});
      return res.status(201).json(newProceso);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  