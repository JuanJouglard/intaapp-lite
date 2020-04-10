export const imageAdjusts = [
  {
    key: 0,
    title: 'Brillo',
    type: 'brightness',
    maximumValue: 100,
    minimumValue: 0,
    get defaultValue() {
      return (this.maximumValue + this.minimumValue) / 2;
    },
  },
  {
    key: 1,
    title: 'Saturacion',
    type: 'saturation',
    maximumValue: 1,
    minimumValue: 0,
    get defaultValue() {
      return (this.maximumValue + this.minimumValue) / 2;
    },
  },
  {
    key: 2,
    title: 'Contraste',
    type: 'contrast',
    maximumValue: 1,
    minimumValue: 0,
    get defaultValue() {
      return (this.maximumValue + this.minimumValue) / 2;
    },
  },
];
