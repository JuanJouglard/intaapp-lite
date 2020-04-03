import ImagePicker from 'react-native-image-picker';

export class ImagePickerService {
	instance;

	options = {
		mediaType: 'photo',
		cameraType: 'back',
		rotation: 360,
		quality: 1,
		noData: true,
		maxWidth: 1920,
		maxHeigth: 1920,
	};

	static getInstance() {
		if (!this.instance) {
			this.instance = new ImagePickerService();
		}
		return this.instance;
	}

	resolveResponse = (resolve, reject) => response => {
		if (response.didCancel) {
			reject('User cancelled image picker');
		} else if (response.error) {
			reject('ImagePicker Error: ' + response.error);
		} else {
			resolve({
				uri: response.uri,
				width: response.width,
				height: response.height,
			});
		}
	};

	getImageFromCamera() {
		const result = new Promise((resolve, reject) => {
			ImagePicker.launchCamera(
				this.options,
				this.resolveResponse(resolve, reject),
			);
		});
		return result;
	}

	getImageFromGallery() {
		const result = new Promise((resolve, reject) => {
			ImagePicker.launchImageLibrary(
				this.options,
				this.resolveResponse(resolve, reject),
			);
		});
		return result;
	}
}
