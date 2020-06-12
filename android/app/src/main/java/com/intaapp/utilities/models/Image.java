package com.intaapp.utilities.models;

import com.facebook.react.bridge.ReadableArray;

public class Image {

    int height;
    int width;
    ReadableArray sources;

    public Image(int height, int width, ReadableArray sources) {
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

    public ReadableArray getSource() {
        return sources;
    }

}
