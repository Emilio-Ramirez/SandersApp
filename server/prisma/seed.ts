import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const POST_TITLES = [
  'Agua Limpia para Todos',
  'Manantial de Esperanza',
  'Recolección de Vida',
  'Cosechando Agua, Cosechando Futuro',
  'Agua Pura en Comunidad',
  'Aguas de Cambio',
  'Proyecto Fuente de Vida',
  'Unidos por el Agua',
  'Clara Corriente',
  'El Manantial Solidario',
  'Almacenes de Vida',
  'Oasis Urbano',
  'Agua para el Pueblo',
  'Suma Agua, Resta Sed',
  'Construyendo Ríos de Esperanza',
  'Lluvia de Solidaridad',
  'Ríos Limpios, Vidas Saludables',
  'Gotas de Vida',
  'Cuencas de Solidaridad',
  'Misión Agua Pura',
  'Aqua Fund México',
  'Agua del Mañana',
  'Corriente Vital',
  'Juntos por Agua Limpia'
];

async function main() {
  for (let i = 0; i < POST_TITLES.length; i++) {
    await prisma.proyecto.create({
      data: {
        nombre: POST_TITLES[i],
        descripcion: faker.lorem.paragraph(),
        proveedor: {
          create: {
            nombre: faker.company.name(),
            contacto: faker.person.fullName(),
            telefono: faker.phone.number(),
            email: faker.internet.email(),
            producto_especifico: faker.commerce.product(),
          },
        },
        costo_total: new Prisma.Decimal(parseFloat(faker.commerce.price({ min: 1000, max: 10000, dec: 2, symbol: '$' } ))), 
        fecha_inicio: faker.date.past(),
        fecha_fin: faker.date.future(),
        link_ubicacion: faker.internet.url(),
        estado_trazabilidad: faker.helpers.objectValue({
          status: 'Iniciado',
          pasos: [
            { paso: 1, descripcion: 'Análisis' },
            { paso: 2, descripcion: 'Diseño' }
          ],
        }),
        estadisticas: {
          create: {
            personas_ayudadas: faker.number.int(5000),
            agua_proporcionada: new Prisma.Decimal(faker.number.float({ min: 1000, max: 10000 })),
            fecha: faker.date.past(),
          },
        },
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
