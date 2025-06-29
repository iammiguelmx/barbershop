export type Service = {
  id: string;
  name: string;
  price: number;
  duration: number;
  image: string;
};

export const services: Service[] = [
  {
    id: 'classic',
    name: 'Corte clásico',
    price: 180,
    duration: 30,
    image: '/img/classic.jpg',
  },
  {
    id: 'fade',
    name: 'Skin Fade',
    price: 220,
    duration: 45,
    image: '/img/fade.jpg',
  },
  {
    id: 'beard',
    name: 'Arreglo de barba',
    price: 150,
    duration: 20,
    image: '/img/beard.jpg',
  },
];
