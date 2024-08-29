import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

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

export const posts = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.number.int(9999),
  comment: faker.number.int(9999),
  share: faker.number.int(9999),
  favorite: faker.number.int(9999),
  author: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));
