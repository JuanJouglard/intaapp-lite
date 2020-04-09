export const imageAdjusts = [
  {
    key: 0,
    title: 'Brillo',
    maximumValue: 100,
    minimumValue: 0,
    get defaultValue() {
      return (this.maximumValue + this.minimumValue) / 2;
    },
  },
  {
    key: 1,
    title: 'Saturacion',
    maximumValue: 1,
    minimumValue: 0,
    get defaultValue() {
      return (this.maximumValue + this.minimumValue) / 2;
    },
  },
  {
    key: 2,
    title: 'Contraste',
    maximumValue: 1,
    minimumValue: 0,
    get defaultValue() {
      return (this.maximumValue + this.minimumValue) / 2;
    },
  },
];
