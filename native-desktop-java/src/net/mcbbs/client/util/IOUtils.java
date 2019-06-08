package net.mcbbs.client.util;

import com.google.gson.JsonElement;
import net.mcbbs.client.Constants;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.util.Map;

/**
 * @author InitAuther97 yinyangshi Yaossg
 */
public final class IOUtils {
    /**
     * get a {@link java.net.URLConnection} to the specified address.
     *
     * @param path target to connect
     * @return A connection to the specified address.
     * @throws IOException if giving a invalid path or failed to open a connection or connection timed out.
     */
    public static URLConnection connect(String path, String method) throws IOException {
        URL url = new URL(path);
        URLConnection connection = url.openConnection();
        if (connection instanceof HttpURLConnection) {
            ((HttpURLConnection) connection).setRequestMethod(method);
        }
        connection.setUseCaches(false);
        connection.setDoInput(true);
        connection.setDoOutput(true);
        connection.setConnectTimeout(15000);
        connection.setReadTimeout(15000);
        return connection;
    }

    /**
     * get a {@link java.io.InputStream} linked to the specified address
     *
     * @param url target to connect
     * @return A {@link java.io.InputStream} that reads the data from the specified address
     * @throws IOException if giving a invalid path or failed to open a connection or a stream or connection timed out.
     */
    public static InputStream from(String url) throws IOException {
        return connect(url, "").getInputStream();
    }

    /**
     * get a {@link java.io.OutputStream} linked to the specified address
     *
     * @param url target to connect
     * @return A {@link java.io.InputStream} that reads the data from the specified address
     * @throws IOException if giving a invalid path or failed to open a connection or a stream or connection timed out.
     */
    public static OutputStream to(String url) throws IOException {
        return connect(url, "").getOutputStream();
    }

    /**
     * get a {@link net.mcbbs.client.util.IOStream} from the specified address
     *
     * @param url target to connect
     * @return A {@link net.mcbbs.client.util.IOStream} that contains a {@link java.io.InputStream} and a {@link java.io.OutputStream} linked to the specified address
     * @throws IOException if giving a invalid path,failed to open a connection or a stream or connection timed out.
     */
    public static IOStream ioStream(String url) throws IOException {
        return new IOStream(from(url), to(url));
    }

    /**
     * get a {@link net.mcbbs.client.util.IOStream} from the specified address
     *
     * @param in  target that {@link java.io.InputStream} connects to
     * @param out target that {@link java.io.OutputStream} connects to
     * @return A {@link net.mcbbs.client.util.IOStream} that contains a {@link java.io.InputStream} and a {@link java.io.OutputStream} linked to the specified address
     * @throws IOException if giving a invalid path,failed to open a connection or a stream or connection timed out.
     */
    public static IOStream ioStream(String in, String out) throws IOException {
        return new IOStream(from(in), to(out));
    }

    /**
     * read all datas from a stream synchronously.
     *
     * @param in a {@link java.io.InputStream}
     * @return Data from the specified stream.
     * @throws IOException if failed to read data or the connection timed out
     */
    public static byte[] readAll(InputStream in) throws IOException {
        ByteArrayOutputStream bytesOut = new ByteArrayOutputStream();
        //max temp: 32kb
        byte[] temp = new byte[32 * 1024];
        int len;
        while (-1 != (len = in.read(temp))) {
            bytesOut.write(temp, 0, len);
        }
        return bytesOut.toByteArray();
    }

    /**
     * read all datas from a url synchronously.
     *
     * @param url target to read data.
     * @return Data from the specified url.
     * @throws IOException if failed to open a stream,read data or the connection timed out
     */
    public static byte[] readAllFrom(String url) throws IOException {
        try (InputStream is = from(url)) {
            return readAll(is);
        }
    }

    /**
     * write all data to a specified {@link java.io.OutputStream}
     *
     * @param outputStream target to write to
     * @param data         Data to write
     * @return if write successfully
     * @throws IOException if failed to write data or the connection timed out
     */
    public static boolean writeAll(OutputStream outputStream, byte[] data) throws IOException {
        outputStream.write(data);
        outputStream.flush();
        return true;
    }

    /**
     * combine a {@link java.io.InputStream} and a {@link java.io.OutputStream} to a utility {@link net.mcbbs.client.util.IOStream}.
     *
     * @param out a {@link java.io.OutputStream}
     * @param in  a {@link java.io.InputStream}
     * @return a {@link net.mcbbs.client.util.IOStream} with two streams combined together
     */
    public static IOStream combine(OutputStream out, InputStream in) {
        return new IOStream(in, out);
    }

    public static <T> T doGET(String url, Class<T> type) throws IOException {
        URLConnection connection = connect(url, "GET");
        String result = new String(readAll(connection.getInputStream()), Charset.forName("UTF-8"));
        if (type.isAssignableFrom(String.class)) {
            //stupid,shut up!
            //noinspection unchecked
            return (T) result;
        } else if (type.isAssignableFrom(JsonElement.class)) {
            //stupid,shut up!
            //noinspection unchecked
            return (T) Constants.DEFAULT_PARSER.parse(result);
        }
        throw new IOException("Unexpected data type found!");
    }

    public static <T> T doPOST(String url, Map<String, String> params, String contentType, Class<T> type) throws IOException {
        StringBuilder sb = new StringBuilder();
        if (params != null) {
            for (Map.Entry<String, String> e : params.entrySet())
                sb.append(e.getKey()).append("=").append(e.getValue()).append("&");
            sb.deleteCharAt(sb.length() - 1);
        }
        return doPOST(url, sb.toString(), contentType, type);
    }

    public static <T> T doPOST(String url, String params, String contentType, Class<T> type) throws IOException {
        URLConnection connection = connect(url, "POST");
        byte[] bytes = params.getBytes(Charset.forName("UTF-8"));
        connection.setRequestProperty("Content-Type", contentType + "; charset=utf-8");
        connection.setRequestProperty("Content-Length", "" + bytes.length);
        try (OutputStream os = connection.getOutputStream()) {
            writeAll(os, bytes);
        }
        String result = new String(readAll(connection.getInputStream()), Charset.forName("UTF-8"));
        if (result.isEmpty() || result.replaceAll(" ", "").isEmpty()) result = "{}";
        if (type.isAssignableFrom(String.class)) {
            //stupid,shut up!
            //noinspection unchecked
            return (T) result;
        } else if (type.isAssignableFrom(JsonElement.class)) {
            //stupid,shut up!
            //noinspection unchecked
            return (T) Constants.DEFAULT_PARSER.parse(result);
        }
        throw new IOException("Unexpected data type found!");
    }
}