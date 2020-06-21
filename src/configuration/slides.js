export const slides = [
  {
    key: 's1',
    title: 'Bienvenidos',
    text:
      'Esta app te ayudará a determinar el porcentaje de cubrimiento que presenta un suelo',
    image: null,
    backgroundColor: '#3395ff',
  },
  {
    key: 's2',
    title: 'Elegir imagen',
    text:
      'Podrá seleccionar una imagen desde la galería o tomar una en el momento utilizando la cámara',
    image: require('../guided-tour/assets/Home.jpg'),
    backgroundColor: '#DB6C79',
  },
  {
    key: 's3',
    title: 'Porcentajes',
    text:
      'En esta vista podrá observar que procentaje del suelo esta cubierto con vegetacion viva, muerta o se encuentra sin cubrir',
    image: require('../guided-tour/assets/Percentages2.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Imagen procesada',
    text:
      'En esta sección podrá observar que partes de la imagen han sido detectadas por la app como vegetación. Los sectores que aparecen en negro son detectados como suelo desnudo. También tendrá la opción de observar la imagen original.',
    image: require('../guided-tour/assets/ProcessedImage.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 's5',
    title: 'Ajustes',
    text:
      'Aquí podrá modificar el brillo, saturacion y contraste de la imagen, con el fin de poder mejorarla. Luego de presionar "Confirmar", se realiza nuevamente el procesamiento de la misma.',
    image: require('../guided-tour/assets/Adjustment.jpg'),
    backgroundColor: '#ED4D6E',
  },
];

