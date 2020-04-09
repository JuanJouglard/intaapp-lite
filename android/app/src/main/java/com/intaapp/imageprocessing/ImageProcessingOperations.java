package com.intaapp.imageprocessing;

import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Base64;

import org.opencv.android.Utils;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Scalar;
import org.opencv.imgproc.Imgproc;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;

public class ImageProcessingOperations {

    private double percentageGreen, percentageYellow;
    private Mat mat,result,firstMask,secondMask,finalMask;

    public ByteArrayOutputStream getBase64Image(String fileUri, ReactApplicationContext context, ReadableArray firstLower, ReadableArray firstUpper, ReadableArray secondLower, ReadableArray secondUpper) throws IOException {
        Bitmap img = Bitmap.createBitmap(MediaStore.Images.Media.getBitmap(context.getContentResolver(), Uri.parse(fileUri)));
        mat = convertBitmapToMat(img);
        initializeMasks(img);
        getMasks(firstLower,firstUpper,secondLower,secondUpper);
        percentageGreen = getPercentage(img,firstMask);
        percentageYellow = getPercentage(img,secondMask);

        Core.add(firstMask,secondMask,finalMask);

        return convertToBase64(img);

    }

    public String getImageLocation(ByteArrayOutputStream imageBase64 ) {
        byte[] array = imageBase64.toByteArray();
        return Base64.encodeToString(array,Base64.DEFAULT);
    }

    public WritableMap createResultMap(String imageLocation) {
        WritableMap wm = Arguments.createMap();
        wm.putString("img",imageLocation);
        wm.putDouble("percentageGreen",percentageGreen);
        wm.putDouble("percentageYellow",percentageYellow);
        return wm;
    }

    private Mat convertBitmapToMat(Bitmap img) {
        Mat mat= new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC4);
        Utils.bitmapToMat(img,mat);
        return mat;
    }

    private void initializeMasks(Bitmap img) {
        result = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
        firstMask = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
        secondMask = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
        finalMask = new Mat(img.getHeight(),img.getWidth(), CvType.CV_8UC1);
        Imgproc.cvtColor(mat,result,Imgproc.COLOR_RGB2HSV);
    }

    private void getMasks(ReadableArray firstLower,ReadableArray firstUpper, ReadableArray secondLower, ReadableArray secondUpper) {
        Core.inRange(result,
                new Scalar(firstLower.getInt(0),firstLower.getInt(1),firstLower.getInt(2)),
                new Scalar(firstUpper.getInt(0),firstUpper.getInt(1),firstUpper.getInt(2)),
                firstMask);

        Core.inRange(result,
                new Scalar(secondLower.getInt(0),secondLower.getInt(1),secondLower.getInt(2)),
                new Scalar(secondUpper.getInt(0),secondUpper.getInt(1),secondUpper.getInt(2)),
                secondMask);
    }

    private double getPercentage(Bitmap img, Mat mask) {
        int nonZero = Core.countNonZero(mask);
        return nonZero*100/(img.getHeight()*img.getWidth());
    }

    private ByteArrayOutputStream convertToBase64(Bitmap img) {
        Core.bitwise_and(mat,mat,result,finalMask);
        Utils.matToBitmap(result, img);

        ByteArrayOutputStream imgBase64 = new ByteArrayOutputStream();
        img.compress(Bitmap.CompressFormat.PNG,100,imgBase64);

        return imgBase64;
    }


}
