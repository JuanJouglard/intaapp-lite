package com.intaapp.imageprocessing;

import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.opencv.android.Utils;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import android.util.Base64;

public class ImageProcessingModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext context;

    public ImageProcessingModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "NativeOpenCV";
    }

    @ReactMethod
    public void processImage(String fileUri, Promise promise) {


        try {
            Bitmap img = Bitmap.createBitmap(MediaStore.Images.Media.getBitmap(getReactApplicationContext().getContentResolver(), Uri.parse(fileUri)));
            Mat mat= new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC4);
            Utils.bitmapToMat(img,mat);

            Mat result = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
            Imgproc.cvtColor(mat,result,Imgproc.COLOR_RGB2GRAY);

            //Conversion to Base64
            Bitmap resultImg= img;
            Utils.matToBitmap(result,resultImg);

            ByteArrayOutputStream imgBase64 = new ByteArrayOutputStream();
            resultImg.compress(Bitmap.CompressFormat.PNG,100,imgBase64);

            byte[] array = imgBase64.toByteArray();

            String str = Base64.encodeToString(array,Base64.DEFAULT);

            promise.resolve(str);
            
        } catch (IOException e) {
            promise.reject("OpenCv","Cannot read processed image from memory");
            e.printStackTrace();
        }

    }

    private String getFilePath(Uri uri) {
        String[] projection = {MediaStore.Images.Media.DATA};

        Cursor cursor = getReactApplicationContext().getContentResolver().query(uri, projection, null, null, null);
        if (cursor != null) {
            cursor.moveToFirst();

            int columnIndex = cursor.getColumnIndex(projection[0]);
            String picturePath = cursor.getString(columnIndex); // returns null
            cursor.close();
            return picturePath;
        }
        return null;
    }


}
