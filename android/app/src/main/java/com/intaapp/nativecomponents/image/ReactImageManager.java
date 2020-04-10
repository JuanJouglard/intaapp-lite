package com.intaapp.nativecomponents.image;

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


    public ReactImageManager(ReactApplicationContext context) {
        mCallerContext = context;
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
    public void setBrightness(ReactImageView view, @Nullable int brightness) {
        //view.setSource(sources);
        Log.i("Brillo", brightness+"");
    }

    @ReactProp(name = "saturation")
    public void setSaturation(ReactImageView view, @Nullable int saturation) {
       // view.setSource(sources);
    }

    @ReactProp(name = "contrast")
    public void setContrast(ReactImageView view, @Nullable int contrast) {
        //view.setSource(sources);
    }

    @ReactProp(name = ViewProps.RESIZE_MODE)
    public void setResizeMode(ReactImageView view, @Nullable String resizeMode) {
        view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
    }


}
