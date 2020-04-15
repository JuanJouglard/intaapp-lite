package com.intaapp.utilities.models;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;

public class Image {

    int height;
    int width;
    WritableArray sources;

    public Image(int height, int width, WritableArray sources) {
        this.height = height;
        this.width = width;
        this.sources = sources;
    }

    public int getHeight() {
        return height;
    }

    public int getWidth() {
        return width;
    }

    public WritableArray getSource() {
        return sources;
    }

}
