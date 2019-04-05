package net.mcbbs.client.fixer.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;

/**
 * @author InitAuther97
 */
public final class IOUtils {
    public static byte[] readFullyFrom(String url) throws IOException {
        URL URl = new URL(url);
        URLConnection connection = URl.openConnection();
        InputStream is = connection.getInputStream();
        return is.readAllBytes();
    }
    public static boolean writeFullyTo(OutputStream out,byte[] data) throws IOException {
        out.write(data);
        return true;
    }
}
