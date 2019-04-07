package net.mcbbs.client.fixer.util;

/**
 * @author yinyangshi
 * plain class to store file's information
 */
public class FileInfo {
    public final String name;
    public final String md5;
    public final String path;
    @SuppressWarnings("WeakerAccess // yys: wtf is this")
    public final String dest;

    public FileInfo(String md5, String name, String path, String dest) {
        this.name = name;
        this.md5 = md5;
        this.path = path;
        this.dest = dest;
    }
}
