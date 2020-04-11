export const imageAdjusts = [
  {
    key: 0,
    title: 'Brillo',
    type: 'brightness',
    maximumValue: 100,
    minimumValue: -100,
    get defaultValue() {
      return (this.maximumValue + this.minimumValue) / 2;
    },
  },
  {
    key: 1,
    title: 'Saturacion',
    type: 'saturation',
    maximumValue: 2,
    minimumValue: 0,
    get defaultValue() {
      return (this.maximumValue + this.minimumValue) / 2;
    },
  },
  {
    key: 2,
    title: 'Contraste',
    type: 'contrast',
    maximumValue: 1.5,
    minimumValue: 0.5,
    get defaultValue() {
      return (this.maximumValue + this.minimumValue) / 2;
    },
  },
];
