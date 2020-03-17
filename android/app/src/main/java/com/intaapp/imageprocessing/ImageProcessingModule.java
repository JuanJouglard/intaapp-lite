package com.intaapp.imageprocessing;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import org.opencv.core.Core;

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
    public void test(Promise promise) {
        Core.useIPP();
        promise.resolve("Good");
    }
}
