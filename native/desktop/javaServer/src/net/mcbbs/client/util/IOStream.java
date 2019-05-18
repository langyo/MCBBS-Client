package net.mcbbs.client.util;

import java.io.*;

/**
 * Combine {@code java.io.InputStream} and {@code java.io.OutputStream}.
 *
 * @author InitAuther97 Yaossg
 */
public final class IOStream implements Closeable, Flushable {
    private final InputStream in;
    private final OutputStream out;
    private boolean eof = false;

    public IOStream(InputStream in, OutputStream out) {
        this.in = in;
        this.out = out;
    }

    /**
     * Read a byte from the stream.
     *
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
     *
     * @throws IOException if failed to write data or the connection timed out
     */
    public void write(int bt) throws IOException {
        checkAccess();
        out.write(bt);
    }

    /**
     * Transform a byte from the {@code java.io.InputStream} to the {@code java.io.OutputStream}.
     *
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
     *
     * @throws IOException if failed to write data or the connection timed out
     */
    @Override
    public void flush() throws IOException {
        out.flush();
    }

    /**
     * Reset the stream.
     *
     * @throws IOException if failed to write data or the connection timed out
     */
    public void reset() throws IOException {
        checkAccess();
        in.reset();
    }

    /**
     * Transform all the data from the {@code java.io.InputStream} to the {@code java.io.OutputStream}.
     *
     * @throws IOException if failed to write data or the connection timed out
     */
    public void transformAll() throws IOException {
        checkAccess();
        checkEOF();
        //noinspection StatementWithEmptyBody
        IOUtils.writeAll(out,IOUtils.readAll(in));
    }

    /**
     * Transform all the data from the {@code java.io.InputStream} to the {@code java.io.OutputStream} and close the stream.
     *
     * @throws IOException if failed to write data or the connection timed out or failed to close the stream.
     */
    public void transformAllAndClose() throws IOException {
        transformAll();
        close();
    }

    /**
     * Close the stream
     *
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
