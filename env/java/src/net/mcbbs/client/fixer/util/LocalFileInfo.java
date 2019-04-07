package net.mcbbs.client.fixer.util;

/**
 * @author yinyangshi Yaossg InitAuther97
 */
public class LocalFileInfo {
    public final String name;
    public final String md5;
    public final String dest;

    public LocalFileInfo(String md5, String name, String dest) {
        this.name = name;
        this.dest = dest;
        this.md5 = md5;
    }
}
