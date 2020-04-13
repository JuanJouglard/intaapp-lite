package com.intaapp.nativecomponents.image;

import android.content.Context;
import android.content.ContextWrapper;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.ColorFilter;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Matrix;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.ViewManager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.generic.RootDrawable;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.views.image.ReactImageView;
import com.intaapp.utilities.ImageSaver;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class ReactImageManager extends SimpleViewManager<CustomImage> {

    ReactApplicationContext mCallerContext;
    float currentBright;
    float currentSat;
    float currentContrast;
    ImageSaver imgSaver;
    CustomImage view;


    public ReactImageManager(ReactApplicationContext context) {
        mCallerContext = context;
        currentBright = 0;
        currentContrast = 1;
        currentSat = 1;
        imgSaver = new ImageSaver(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "CustomImage";
    }

    @NonNull
    @Override
    protected CustomImage createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new CustomImage(reactContext, Fresco.newDraweeControllerBuilder(), null, mCallerContext);
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "onSave",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onSave")))
                .build();
    }

    @ReactProp(name = "src")
    public void setSrc(ReactImageView view, @Nullable ReadableArray sources) {
        view.setSource(sources);
    }

    @ReactProp(name = "brightness")
    public void setBrightness(ReactImageView view, @Nullable float brightness) {
        currentBright = brightness;
        view.setColorFilter(applyFilter(brightness,currentContrast,currentSat));
    }

    @ReactProp(name = "saturation")
    public void setSaturation(ReactImageView view, @Nullable float saturation) {
        currentSat = saturation;
        view.setColorFilter(applyFilter(currentBright,currentContrast,saturation));
    }

    @ReactProp(name = "contrast")
    public void setContrast(ReactImageView view, @Nullable float contrast) {
        currentContrast = contrast;
        view.setColorFilter(applyFilter(currentBright, contrast, currentSat));
    }

    @ReactProp(name = ViewProps.RESIZE_MODE)
    public void setResizeMode(ReactImageView view, @Nullable String resizeMode) {
        view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
    }

    @ReactProp(name = "saveImage")
    public void saveImage(CustomImage view, @Nullable boolean save) {
        Log.i("SAVEIMG", save+"");
        if (save) {
            view.getDrawable();
            Bitmap bmp = imgSaver.createBitmapFromView(view, 720,1280);
            FileOutputStream fos = null;
            try {
                fos = new FileOutputStream(new File(Environment.getExternalStorageDirectory().toString()+"/Pictures/IntaApp/test.png"));
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
            bmp.compress(Bitmap.CompressFormat.PNG,100,fos);
            view.triggerOnSaveEvent("test");
        }
    }


    private ColorMatrixColorFilter applyFilter(float brightness,float contrast,float saturation) {
        ColorMatrix satMatrix = new ColorMatrix();
        satMatrix.setSaturation(saturation);
        float[] satValues = satMatrix.getArray();

        ColorMatrix cm = new ColorMatrix();
        cm.set(new float[] {
                satValues[0]*contrast, satValues[1]*contrast, satValues[2]*contrast, satValues[3]*contrast,satValues[4]*contrast + brightness,
                satValues[5]*contrast, satValues[6]*contrast, satValues[7]*contrast, satValues[8]*contrast,satValues[9]*contrast + brightness,
                satValues[10]*contrast, satValues[11]*contrast, satValues[12]*contrast, satValues[13]*contrast,satValues[14]*contrast + brightness,
                satValues[15], satValues[16], satValues[17], satValues[18], satValues[19] });

        return new ColorMatrixColorFilter(cm);
    }



}
