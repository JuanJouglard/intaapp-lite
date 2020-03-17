package com.testubuntu.testnative;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import org.opencv.core.Core;

public class TestNativeModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext context;

    public TestNativeModule(@NonNull ReactApplicationContext reactContext) {
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
