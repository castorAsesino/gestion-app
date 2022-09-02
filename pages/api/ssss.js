import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getRol(req, res);
    case 'POST':
      return saveRol(req, res);
    case 'PUT':
      return updateUser();
    case 'DELETE':
      return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const getRol = async (req, res) => {
  try {
    const data = await prisma.rol.findMany();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const saveRol = async (req, res) => {
  try {
    const { body: data } = req;
    const newRol = await prisma.rol.create({ data });
    return res.status(201).json(newRol);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

async function sawveRol(req, res) {
  const body = req.body;
  try {
      const newEntry = await prisma.rol.create({
          data
      });
      return res.status(200).json(newEntry, {success: true});
  } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ error: "Error creating question", success:false });
  }
}


