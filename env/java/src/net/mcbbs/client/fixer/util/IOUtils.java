package net.mcbbs.client.fixer.util;

import javax.annotation.Nonnull;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;

/**
 * @author InitAuther97 yinyangshi
 */
public final class IOUtils {
    /**
     * Utility used to get a {@code java.net.URLConnection} to the specified address.
     * @param path target to connect
     * @return A connection to the specified address.
     * @throws IOException if giving a invalid path or failed to open a connection or connection timed out.
     */
    public static URLConnection connect(String path) throws IOException {
        URL url = new URL(path);
        return url.openConnection();
    }

    /**
     * Utility used to get a {@code java.io.InputStream} linked to the specified address
     * @param url target to connect
     * @return A {@code java.io.InputStream} that reads the data from the specified address
     * @throws IOException if giving a invalid path or failed to open a connection or a stream or connection timed out.
     */
    public static InputStream from(String url) throws IOException {
        return connect(url).getInputStream();
    }

    /**
     * Utility used to get a {@code java.io.OutputStream} linked to the specified address
     * @param url target to connect
     * @return A {@code java.io.InputStream} that reads the data from the specified address
     * @throws IOException if giving a invalid path or failed to open a connection or a stream or connection timed out.
     */
    public static OutputStream to(String url) throws IOException {
        return connect(url).getOutputStream();
    }

    /**
     * Utility used to get a {@code net.mcbbs.client.fixer.util.IOUtils.IOStream} from the specified address
     * @param url target to connect
     * @return A {@code net.mcbbs.client.fixer.util.IOUtils.IOStream} that contains a {@code java.io.InputStream} and a {@code java.io.OutputStream} linked to the specified address
     * @throws IOException if giving a invalid path,failed to open a connection or a stream or connection timed out.
     */
    public static IOStream ioStream(String url) throws IOException {
        return new IOStream(from(url), to(url));
    }
    /**
     * Utility used to get a {@code net.mcbbs.client.fixer.util.IOUtils.IOStream} from the specified address
     * @param in target that {@code java.io.InputStream} connects to
     * @param out target that {@code java.io.OutputStream} connects to
     * @return A {@code net.mcbbs.client.fixer.util.IOUtils.IOStream} that contains a {@code java.io.InputStream} and a {@code java.io.OutputStream} linked to the specified address
     * @throws IOException if giving a invalid path,failed to open a connection or a stream or connection timed out.
     */
    public static IOStream ioStream(String in, String out) throws IOException {
        return new IOStream(from(in), to(out));
    }

    /**
     * Utility used to read all datas from a stream synchronously.
     * @param in a {@code java.io.InputStream}
     * @return Data from the specified stream.
     * @throws IOException if failed to read data or the connection timed out
     */
    public static byte[] readFully(InputStream in) throws IOException {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream(); in) {
            int n;
            while (-1 != (n = in.read())) {
                baos.write(n);
            }
            return baos.toByteArray();
        }
    }

    /**
     * Utility used to read all datas from a url synchronously.
     * @param url target to read data.
     * @return Data from the specified url.
     * @throws IOException if failed to open a stream,read data or the connection timed out
     */
    public static byte[] readFullyFrom(String url) throws IOException {
        try (InputStream is = from(url)) {
            return readFully(is);
        }
    }

    /**
     * Utility used to write all data to a specified {@code java.io.OutputStream}
     * @param outputStream target to write to
     * @param data Data to write
     * @return if write successfully
     * @throws IOException if failed to write data or the connection timed out
     */
    public static boolean writeFullyToAndClose(OutputStream outputStream, byte[] data) throws IOException {
        try (outputStream) {
            outputStream.write(data);
            outputStream.flush();
        }
        return true;
    }

    /**
     * Utility used to bind a {@code java.io.InputStream} and a {@code java.io.OutputStream} to a utility {@code net.mcbbs.client.fixer.util.IOUtils.IOStream}.
     * @param out a {@code java.io.OutputStream}
     * @param in a {@code java.io.InputStream}
     * @return a {@code net.mcbbs.client.fixer.util.IOUtils.IOStream} with two streams bound together
     * @throws IOException if failed to write data or the connection timed out
     */
    public static IOStream bindStream(OutputStream out, InputStream in) throws IOException {
        return new IOStream(in, out);
    }

    /**
     * An utility class used to bind {@code java.io.InputStream} and {@code java.io.OutputStream}.
     * @author InitAuther97
     */
    public static final class IOStream implements Closeable, Flushable {
        private final InputStream in;
        private final OutputStream out;
        private boolean eof = false;
        public IOStream(final InputStream in, final OutputStream out) {
            this.in = in;
            this.out = out;
        }

        /**
         * Read a byte from the stream.
         * @return a byte read from the stream.
         * @throws IOException if failed to read data or the connection timed out
         */
        public int read() throws IOException {
            checkAccess();
            checkEOF();
            return in.read();
        }

        /**
         * Write a byte to the stream.
         * @throws IOException if failed to write data or the connection timed out
         */
        public void write(int bt) throws IOException {
            checkAccess();
            out.write(bt);
        }

        /**
         * Transform a byte from the {@code java.io.InputStream} to the {@code java.io.OutputStream}.
         * @return if transform successfully
         * @throws IOException if failed to write data or the connection timed out
         */
        public boolean transformAByte() throws IOException {
            checkAccess();
            checkEOF();
            int result = in.read();
            if (result != -1) {
                out.write(result);
                return true;
            } else {
                eof = true;
                return false;
            }
        }

        /**
         * Flush the stream.
         * @throws IOException if failed to write data or the connection timed out
         */
        @Override
        public void flush() throws IOException {
            out.flush();
        }
        /**
         * Reset the stream.
         * @throws IOException if failed to write data or the connection timed out
         */
        public void reset() throws IOException {
            checkAccess();
            in.reset();
        }

        /**
         * Transform all the data from the {@code java.io.InputStream} to the {@code java.io.OutputStream}.
         * @return if transform successfully
         * @throws IOException if failed to write data or the connection timed out
         */
        public void transformAll() throws IOException {
            checkAccess();
            checkEOF();
            //noinspection StatementWithEmptyBody
            while (transformAByte()) ;
        }

        /**
         * Transform all the data from the {@code java.io.InputStream} to the {@code java.io.OutputStream} and close the stream.
         * @return if transform successfully
         * @throws IOException if failed to write data or the connection timed out or failed to close the stream.
         */
        public void transformAllAndClose() throws IOException {
            transformAll();
            close();
        }

        /**
         * Close the stream
         * @throws IOException if failed to close the stream.
         */
        @Override
        public void close() throws IOException {
            IOException error = null;
            try {
                in.close();
            } catch (IOException e) {
                error = e;
            }
            try {
                out.close();
            } catch (IOException e) {
                if (error == null) {
                    error = e;
                } else {
                    error.addSuppressed(e);
                }
                throw error;
            }
            if (error != null) {
                throw error;
            }
        }

        private void checkAccess() throws IOException {
            if (in == null || out == null) {
                throw new IOException("Stream is not available.");
            }
        }

        private void checkEOF() throws IOException {
            if (eof) {
                throw new IOException("InputStream reaches the end of the file.");
            }
        }

    }
}