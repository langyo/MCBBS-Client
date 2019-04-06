package net.mcbbs.client.fixer.util;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;

/**
 * @author InitAuther97 yinyangshi
 */
public final class IOUtils {

    public static URLConnection connect(String path) throws IOException {
        URL url = new URL(path);
        return url.openConnection();
    }

    public static InputStream from(String url) throws IOException {
        return connect(url).getInputStream();
    }

    public static OutputStream to(String url) throws IOException {
        return connect(url).getOutputStream();
    }

    public static IOStream ioStream(String url) throws IOException {
        return new IOStream(from(url), to(url));
    }

    public static IOStream ioStream(String in, String out) throws IOException {
        return new IOStream(from(in), to(out));
    }

    public static byte[] readFully(InputStream in) throws IOException {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream(); in) {
            int n;
            while (-1 != (n = in.read())) {
                baos.write(n);
            }
            return baos.toByteArray();
        }
    }


    public static byte[] readFullyFrom(String url) throws IOException {
        try (InputStream is = from(url)) {
            return readFully(is);
        }
    }

    public static boolean writeFullyToAndClose(OutputStream outputStream, byte[] data) throws IOException {
        try (outputStream) {
            outputStream.write(data);
            outputStream.flush();
        }
        return true;
    }

    public static IOStream bindStream(OutputStream out, InputStream in) throws IOException {
        return new IOStream(in, out);
    }

    public static final class IOStream implements Closeable, Flushable {
        private final InputStream in;
        private final OutputStream out;
        private boolean eof = false;

        public IOStream(final InputStream in, final OutputStream out) {
            this.in = in;
            this.out = out;
        }

        public int read() throws IOException {
            checkAccess();
            checkEOF();
            return in.read();
        }

        public void write(int bt) throws IOException {
            checkAccess();
            out.write(bt);
        }

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

        @Override
        public void flush() throws IOException {
            out.flush();
        }

        public void reset() throws IOException {
            checkAccess();
            in.reset();
        }

        public void transformAll() throws IOException {
            checkAccess();
            checkEOF();
            //noinspection StatementWithEmptyBody
            while (transformAByte()) ;
        }

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

        public void transformAllAndClose() throws IOException {
            transformAll();
            close();
        }
    }
}