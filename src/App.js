import FeaturedArcCarousel from './FeaturedArcCarousel';

const slides = [
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61ba68f33c9ac16401dad18a_maria_mercedes.png',
    title: 'Maria Mercedes',
    category: 'Novela',
    year: '2005',
    index: 0,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e73fce43264646fda2bd39_Me%20Robo%20Mi%20Vida.png',
    title: 'Me Robo Mi Vida',
    category: 'Novela',
    year: '2007',
    index: 1,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e73fceac05f3857b109887_Muerte%20En%20Buenos%20Aires.png',
    title: 'Muerte En Buenos Aires',
    category: 'Pelicula',
    year: '2008',
    index: 2,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e73fcfc58ab47375e6c5e7_Rubi.png',
    title: 'Rubi',
    category: 'Novela',
    year: '2009',
    index: 3,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e73fceb5bd4e104e39a84f_La%20Muerte%20De%20Marga%20Maier.png',
    title: 'La Muerte de Marga Maier',
    category: 'Novela',
    year: '2010',
    index: 4,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e73fcec098635686af928d_Teresa.png',
    title: 'Teresa',
    category: 'Novela',
    year: '2001',
    index: 5,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e73fcee748395ac11cae74_Solteras.png',
    title: 'Solteras',
    category: 'Novela',
    year: '2015',
    index: 6,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e746d847f416d695b2c55d_Enamorandome%20de%20Ramon.png',
    title: 'Enamorandome de Ramón',
    category: 'Novela',
    year: '2007',
    index: 7,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e73fce23f885433306f42f_La%20Chica%20que%20Limpia.png',
    title: 'La Chica Que Limpia',
    category: 'Novela',
    year: '2010',
    index: 8,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e73fceaf71ee0c37590c5a_Rescue%20Dawn.png',
    title: 'Rescue Dawn',
    category: 'Pelicula',
    year: '2001',
    index: 9,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e73fce95afa656220ffdfd_La%20Familia%20P.Luche.png',
    title: 'La Familia Peluche',
    category: 'Programa',
    year: '2006',
    index: 10,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61f02ace8aab3079b807b861_Amore%20Manchado.png',
    title: 'Amor Manchado',
    category: 'Novela',
    year: '2008',
    index: 11,
  },
  {
    imageUrl:
      'https://assets.website-files.com/61b0ce185c49285b8549f807/61e73fce6e40bb36e4c49d5c_Harsh%20Times.png',
    title: 'Harsh Times',
    category: 'Pelicula',
    year: '2011',
    index: 12,
  },
];

const App = () => {
  const carouselSlides = window.carouselSlides ? window.carouselSlides : [];

  return <FeaturedArcCarousel slides={slides} />;
};

export default App;
