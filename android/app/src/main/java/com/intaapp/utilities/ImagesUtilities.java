package com.intaapp.utilities;

import android.graphics.Bitmap;
import android.graphics.Canvas;

import android.util.Log;
import android.view.View;

import org.opencv.android.Utils;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Rect;

public class ImagesUtilities {
    private Bitmap bitmap;

    public  Bitmap createBitmapFromView( View view, int width, int height) {
        float cropWidth = 0;
        float cropHeight = 0;
        float factor = 1;
        float x;
        float y;

        Canvas canvas = createCanvas(view);
        view.draw(canvas);

        Log.i("SIZES","BITMAP: "+bitmap.getWidth()+"-"+bitmap.getHeight());
        Mat aux = new Mat(bitmap.getHeight(),bitmap.getWidth(), CvType.CV_8UC4);
        Utils.bitmapToMat(bitmap,aux);

        Log.i("SIZES","CONDITION"+(((float)width)/aux.width()) +" - "+ (((float)height)/aux.height()));
        if ((((float)width)/aux.width()) > (((float)height)/aux.height())) {
            Log.i("SIZES", "PRIMER CASO");
            cropWidth = aux.width();
            factor = width / cropWidth;
            cropHeight = height / factor;
        }
        else {
            Log.i("SIZES", "SEGUNDO CASO");
            cropHeight = aux.height();
            factor = height / cropHeight;
            cropWidth = width / factor;
        }

        x = aux.width() /2 - cropWidth/2;
        y = aux.height()/2 - cropHeight/2;


        return getCroppedImageAsBitmap(x,y,cropWidth,cropHeight,aux);
    }

    private Canvas createCanvas(View view) {
        bitmap = Bitmap.createBitmap(view.getWidth(),view.getHeight(), Bitmap.Config.ARGB_8888);
        return new Canvas(bitmap);
    }

    private Bitmap getCroppedImageAsBitmap(float x, float y, float cropWidth, float cropHeight, Mat aux ) {
        Rect roi = new Rect((int)x,(int)y,(int)cropWidth,(int)cropHeight);
        Mat cropped = new Mat(aux,roi);
        Bitmap result = Bitmap.createBitmap(cropped.width(),
                cropped.height(), Bitmap.Config.ARGB_8888);
        Utils.matToBitmap(cropped,result);
        return result;
    }
}
