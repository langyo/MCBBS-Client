package net.mcbbs.client.fixer.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;

/**
 * @author InitAuther97
 */
public final class IoUtils {
    public static byte[] readFullyFrom(String url) throws IOException {
        URL uri = new URL(url);
        URLConnection connection = uri.openConnection();
        try (InputStream is = connection.getInputStream()) {
            return is.readAllBytes();
        }
    }

    public static boolean writeFullyTo(OutputStream out, byte[] data) throws IOException {
        out.write(data);
        out.flush();
        return true;
    }

    public static boolean writeFullyToAndClose(OutputStream outputStream, byte[] data) throws IOException {
        try (outputStream) {
            return writeFullyTo(outputStream, data);
        }
    }
}
