package com.intaapp.nativecomponents.image;

import android.content.Context;

import androidx.annotation.Nullable;

import com.facebook.drawee.controller.AbstractDraweeControllerBuilder;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.image.GlobalImageLoadListener;
import com.facebook.react.views.image.ReactImageView;

public class CustomImage extends ReactImageView {

    public CustomImage(Context context, AbstractDraweeControllerBuilder draweeControllerBuilder, @Nullable GlobalImageLoadListener globalImageLoadListener, @Nullable Object callerContext) {
        super(context, draweeControllerBuilder, globalImageLoadListener, callerContext);
    }

    public void triggerOnSaveEvent(String uri) {
        WritableMap args = Arguments.createMap();
        args.putString("uri",uri);
        ((ReactContext)getContext()).getJSModule(RCTEventEmitter.class).receiveEvent(getId(),"onSave",args);
    }
}
