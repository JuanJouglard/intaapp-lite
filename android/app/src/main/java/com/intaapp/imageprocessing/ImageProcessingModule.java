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
import java.util.List;

import android.util.Base64;
import android.util.Log;

import com.intaapp.imageprocessing.ImageProcessingOperations;

public class ImageProcessingModule extends ReactContextBaseJavaModule {

    private ReadableArray firstLower,firstUpper, secondLower,secondUpper;
    private ImageProcessingOperations imageProcessingOperations;

    public ImageProcessingModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        imageProcessingOperations = new ImageProcessingOperations();
    }

    @NonNull
    @Override
    public String getName() {
        return "NativeOpenCV";
    }

    @ReactMethod
    public void processImage(String fileUri, ReadableArray firstRange, ReadableArray secondRange, Promise promise) {

        try {
            setRanges(firstRange,secondRange);
            ByteArrayOutputStream imageBase64  = imageProcessingOperations.getBase64Image(fileUri,getReactApplicationContext(),firstLower,firstUpper,secondLower,secondUpper);
            String imageLocation = imageProcessingOperations.getImageLocation(imageBase64);
            WritableMap resultMap = imageProcessingOperations.createResultMap(imageLocation);
            promise.resolve(resultMap);

        } catch (Exception e) {
            promise.reject("OpenCv","Error processing image in java module");
            e.printStackTrace();
        }

    }

    @ReactMethod
    public  void adjustImage(String imageBase64, String sliderType, int changedValue) {
        Log.i("ADJUSTIMG BRILLO", sliderType);

    }

    private void setRanges(ReadableArray firstRange, ReadableArray secondRange) {
        firstLower = firstRange.getArray(0);
        firstUpper = firstRange.getArray(1);
        secondLower = secondRange.getArray(0);
        secondUpper = secondRange.getArray(1);
    }


}
