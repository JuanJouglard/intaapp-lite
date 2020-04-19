package com.intaapp.utilities;

import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Canvas;

import android.util.Log;
import android.util.TypedValue;
import android.view.View;

import org.opencv.android.Utils;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Rect;

public class ImagesUtilities {


    public  Bitmap createBitmapFromView( View view, int width, int height) {
        float cropWidth = 0;
        float cropHeight = 0;
        float factor = 1;
        float x;
        float y;

        Log.i("SIZES", "ORIGINAL: "+width+"-"+ "-" +height);



        //ERASE
        Log.i("SIZES","VIEW: "+view.getWidth()+"--"+view.getHeight());
        //--------------
        Bitmap bitmap = Bitmap.createBitmap(view.getWidth(),
                view.getHeight(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        view.draw(canvas);


        Log.i("SIZES","BITMAP: "+bitmap.getWidth()+"-"+bitmap.getHeight());
        Mat aux = new Mat(bitmap.getHeight(),bitmap.getWidth(), CvType.CV_8UC4);
        Utils.bitmapToMat(bitmap,aux);


        if (width > height) {
            cropWidth = aux.width();
            factor = width / cropWidth;
            cropHeight = height / factor;
        }
        else {
            cropHeight = aux.height();
            factor = height / cropHeight;
            cropWidth = width / factor;
        }


        x = aux.width() /2 - cropWidth/2;
        y = aux.height()/2 - cropHeight/2;

        Log.i("SIZES","Factor: "+factor);
        Log.i("SIZES","CROP: "+cropWidth+"--"+cropHeight);



        Rect roi = new Rect((int)x,(int)y,(int)cropWidth,(int)cropHeight);
        Mat cropped = new Mat(aux,roi);
        Bitmap result = Bitmap.createBitmap(cropped.width(),
                cropped.height(), Bitmap.Config.ARGB_8888);
        Utils.matToBitmap(cropped,result);
        return result;
    }

    private int convertDpToPixels(float dp) {
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,
                dp, Resources.getSystem().getDisplayMetrics()));
    }
}
