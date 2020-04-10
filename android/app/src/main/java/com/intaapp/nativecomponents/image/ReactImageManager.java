package com.intaapp.nativecomponents.image;

import android.graphics.ColorFilter;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Matrix;
import android.util.Log;
import android.view.ViewManager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.views.image.ReactImageView;

import java.util.List;

public class ReactImageManager extends SimpleViewManager<ReactImageView> {

    ReactApplicationContext mCallerContext;
    ColorMatrix currentBright;
    ColorMatrix currentSat;
    ColorMatrix currentContrast;

    public ReactImageManager(ReactApplicationContext context) {
        mCallerContext = context;
        currentBright = new ColorMatrix();
        currentSat = new ColorMatrix();
        currentContrast = new ColorMatrix();
    }

    @NonNull
    @Override
    public String getName() {
        return "CustomImage";
    }

    @NonNull
    @Override
    protected ReactImageView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new ReactImageView(reactContext, Fresco.newDraweeControllerBuilder(), null, mCallerContext);
    }

    @ReactProp(name = "src")
    public void setSrc(ReactImageView view, @Nullable ReadableArray sources) {
        Log.d("ReadableA",sources.toString());
        view.setSource(sources);
    }

    @ReactProp(name = "brightness")
    public void setBrightness(ReactImageView view, @Nullable float brightness) {
        currentBright.reset();
        currentBright.set(new float[] {
                1, 0, 0, 0, brightness,
                0, 1, 0, 0, brightness,
                0, 0, 1, 0, brightness,
                0, 0, 0, 1, 0 });
        currentBright.postConcat(currentSat);
        currentBright.postConcat(currentContrast);
        view.setColorFilter(new ColorMatrixColorFilter(currentBright));
    }

    @ReactProp(name = "saturation")
    public void setSaturation(ReactImageView view, @Nullable float saturation) {
        //currentSat.reset();
        currentSat.setSaturation(saturation);
        currentSat.postConcat(currentBright);
        currentSat.postConcat(currentContrast);
        view.setColorFilter(new ColorMatrixColorFilter(currentSat));
    }

    @ReactProp(name = "contrast")
    public void setContrast(ReactImageView view, @Nullable float contrast) {
        currentContrast.reset();
        currentContrast.set(new float[] {
                contrast, 0, 0, 0, 0,
                0, contrast, 0, 0, 0,
                0, 0, contrast, 0, 0,
                0, 0, 0, contrast, 0 });
        currentContrast.postConcat(currentBright);
        currentContrast.postConcat(currentSat);
        view.setColorFilter(new ColorMatrixColorFilter(currentContrast));
    }

    @ReactProp(name = ViewProps.RESIZE_MODE)
    public void setResizeMode(ReactImageView view, @Nullable String resizeMode) {
        view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
    }


}
