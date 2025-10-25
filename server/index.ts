import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  //  write  Prisma Client queries here
  /* const allAuto = await prisma.auto.findMany()
  console.log(allAuto) */
 await prisma.auto.create({
    data: {
      // vin_id is auto-generated, do NOT set it if it's serial
      vin: '3C6UR5HL2JJ123456',
      make: 'Dodge',
      model: 'RAM9000',
      vehicle_year: 2016,
      miles: 54000,
      owner_id: 4,
    },
  })

  const allAuto = await prisma.auto.findMany();
  console.dir(allAuto, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  // write to a database

 /*async function main() {
   const newAuto = await prisma.auto.create({
    data: {
      // vin_id is auto-generated, do NOT set it if it's serial
      vin: '3C6UR5HL2GG123456',
      make: 'Dodge',
      model: 'RAM2500',
      vehicle_year: 2016,
      miles: 54000,
      owner_id: 4,
      created_at: new Date('2025-10-11T14:18:32.000Z'),
      updated_at: new Date('2025-10-11T14:18:32.000Z'),
    },
  })

  const allAuto = await prisma.auto.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allAuto, { depth: null })
} */
