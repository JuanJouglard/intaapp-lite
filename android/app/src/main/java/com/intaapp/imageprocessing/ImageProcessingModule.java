package com.intaapp.imageprocessing;

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
    public void processImage(String fileUri, ReadableArray lowerBound, ReadableArray upperBound, Promise promise) {


        try {
            Bitmap img = Bitmap.createBitmap(MediaStore.Images.Media.getBitmap(getReactApplicationContext().getContentResolver(), Uri.parse(fileUri)));
            Mat mat= new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC4);
            Utils.bitmapToMat(img,mat);

            Mat result = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
            Mat maskFinal = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
            Imgproc.cvtColor(mat,result,Imgproc.COLOR_RGB2HSV);

            //Core.inRange(result,new Scalar(55,50,20),new Scalar(143,255,255),maskFinal);
            Core.inRange(result,
                    new Scalar(lowerBound.getInt(0),lowerBound.getInt(1),lowerBound.getInt(2)),
                    new Scalar(upperBound.getInt(0),upperBound.getInt(1),upperBound.getInt(2)),
                    maskFinal);

            Core.bitwise_and(mat,mat,result,maskFinal);
            int nonZero = Core.countNonZero(maskFinal);
            double percentage = nonZero*100/(img.getHeight()*img.getWidth());
            //Conversion to Base64
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
}
