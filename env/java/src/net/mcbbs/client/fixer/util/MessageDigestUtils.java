package net.mcbbs.client.fixer.util;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author InitAuther97
 */
public final class MessageDigestUtils {
    /**
     * Utility used to encrypt data by MD5.
     *
     * @param plainText A text needed to encrypt.
     * @return A data encrypted by MD5.
     */
    public static String md5(String plainText) {
        byte[] secretBytes;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(plainText.getBytes());
            secretBytes = md.digest();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Cannot find MD5 MessageDigest!", e);
        }
        return new BigInteger(1, secretBytes).toString(16);
    }

    /**
     * Utility used to encrypt data in the specified stream by MD5.
     *
     * @param inputStream A stream with data needed to encrypt.
     * @return A data encrypted by MD5.
     */
    public static String md5(InputStream inputStream) throws NoSuchAlgorithmException, IOException {
        int bufferSize = 256 * 1024;
        DigestInputStream digestInputStream;
        digestInputStream = new DigestInputStream(inputStream, MessageDigest.getInstance("MD5"));
        byte[] buffer = new byte[bufferSize];
        //noinspection StatementWithEmptyBody
        while (digestInputStream.read(buffer) > 0) ;
        try {
            return new BigInteger(1, digestInputStream.getMessageDigest().digest()).toString(16);
        } finally {
            digestInputStream.close();
        }
    }
}
