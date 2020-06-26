export class ImageModel {
  constructor(data, height, width, uri = null) {
    (this.data = data),
      (this.height = height),
      (this.width = width),
      (this.uri = uri);
  }

  getUri() {
    return this.uri;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getData() {
    return this.data;
  }

  setUri(uri) {
    this.uri = uri;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  setData(data) {
    this.data = data;
  }

  getSource() {
    if (this.uri) {
      return this.uri;
    } else {
      return `data:image/png;base64,${this.data}`;
    }
  }

  get shouldRotate() {
    return this.width < this.height;
  }

  clone() {
    return new ImageModel(this.data, this.height, this.width, this.uri);
  }
}
