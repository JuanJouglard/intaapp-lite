package com.intaapp.imageprocessing;

import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;

import org.opencv.android.Utils;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.Scalar;
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
    public void processImage(String fileUri, ReadableArray firstRange, ReadableArray secondRange, Promise promise) {


        try {
            ReadableArray firstLower = firstRange.getArray(0);
            ReadableArray firstUpper = firstRange.getArray(1);
            ReadableArray secondLower = secondRange.getArray(0);
            ReadableArray secondUpper = secondRange.getArray(1);
            Bitmap img = Bitmap.createBitmap(MediaStore.Images.Media.getBitmap(getReactApplicationContext().getContentResolver(), Uri.parse(fileUri)));
            Mat mat= new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC4);
            Utils.bitmapToMat(img,mat);

            Mat result = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
            Mat firstMask = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
            Mat secondMask = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
            Mat finalMask = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
            Imgproc.cvtColor(mat,result,Imgproc.COLOR_RGB2HSV);

            //Core.inRange(result,new Scalar(55,50,20),new Scalar(143,255,255),maskFinal);
            Core.inRange(result,
                    new Scalar(firstLower.getInt(0),firstLower.getInt(1),firstLower.getInt(2)),
                    new Scalar(firstUpper.getInt(0),firstUpper.getInt(1),firstUpper.getInt(2)),
                    firstMask);

            Core.inRange(result,
                    new Scalar(secondLower.getInt(0),secondLower.getInt(1),secondLower.getInt(2)),
                    new Scalar(secondUpper.getInt(0),secondUpper.getInt(1),secondUpper.getInt(2)),
                    secondMask);

            Core.add(firstMask,secondMask,finalMask);
            int nonZero = Core.countNonZero(firstMask);
            double percentage = nonZero*100/(img.getHeight()*img.getWidth());

            int nonZero2 = Core.countNonZero(secondMask);
            double percentage2 = nonZero*100/(img.getHeight()*img.getWidth());
            //Conversion to Base64

            Core.bitwise_and(mat,mat,result,finalMask);
            Bitmap resultImg= img;
            Utils.matToBitmap(result,resultImg);

            ByteArrayOutputStream imgBase64 = new ByteArrayOutputStream();
            resultImg.compress(Bitmap.CompressFormat.PNG,100,imgBase64);

            byte[] array = imgBase64.toByteArray();

            String str = Base64.encodeToString(array,Base64.DEFAULT);
            WritableMap wm = Arguments.createMap();
            wm.putString("img",str);
            wm.putDouble("percentage",percentage);
            promise.resolve(wm);
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
