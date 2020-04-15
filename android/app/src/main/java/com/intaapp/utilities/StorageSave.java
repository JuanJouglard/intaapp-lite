package com.intaapp.utilities;

import android.graphics.Bitmap;
import android.os.Environment;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

public class StorageSave {



    public String saveToExternalStorage(Bitmap bmp) {
        FileOutputStream fos = null;
        String uri = Environment.getExternalStorageDirectory().toString()+"/Pictures/IntaApp/test.png";
        try {
            fos = new FileOutputStream(new File(uri));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        bmp.compress(Bitmap.CompressFormat.PNG,100,fos);
        return uri;
    }
}
