package com.intaapp.utilities;

import android.graphics.Bitmap;
import android.os.Environment;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

public class StorageSave {

    public String saveToExternalStorage(Bitmap bmp) {
        FileOutputStream fos = null;
        
        String directoryName = Environment.getExternalStorageDirectory().toString()+"/Pictures/IntaApp/";
        File directory = new File(directoryName);
        if (! directory.exists()){
            directory.mkdir();
        }
        
        String uri = directoryName+System.currentTimeMillis()+".png";
        try {
            fos = new FileOutputStream(new File(uri));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        bmp.compress(Bitmap.CompressFormat.PNG,100,fos);
        return uri;
    }
}
