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

    public static String md5(InputStream inputStream) throws NoSuchAlgorithmException, IOException {
        int bufferSize = 256 * 1024;
        DigestInputStream digestInputStream = null;
        // 拿到一个MD5转换器（同样，这里可以换成SHA1）
        digestInputStream = new DigestInputStream(inputStream, MessageDigest.getInstance("MD5"));
        byte[] buffer = new byte[bufferSize];
        while (digestInputStream.read(buffer) > 0) ;
        try {
            return new BigInteger(1, digestInputStream.getMessageDigest().digest()).toString(16);
        } finally {
            digestInputStream.close();
        }
    }
}
