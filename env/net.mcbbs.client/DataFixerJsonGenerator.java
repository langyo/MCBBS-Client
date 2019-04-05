package net.mcbbs.client;

import com.google.gson.stream.JsonWriter;
import net.mcbbs.client.util.MessageDigestUtils;

import java.io.*;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

public class DataFixerJsonGenerator {
    public static void generate(String downloadURL) throws IOException {
        StringWriter stringWriter = new StringWriter();
        JsonWriter writer = new JsonWriter(stringWriter);
        writer.beginArray();
        try {
            for (FileInfo info : generateFileInfos(downloadURL==null?"http://langyo.github.io/MCBBS-Client/update.json":downloadURL)) {
                writer.beginObject();
                writer.name(info.name);
                writer.beginObject();
                writer.name("md5");
                writer.value(info.md5);
                writer.name("path");
                writer.value(info.path);
                writer.endObject();
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        writer.endArray();
        System.out.println(stringWriter.toString());
    }

    private static FileInfo[] generateFileInfos(String downloadURL) throws IOException, NoSuchAlgorithmException {
        List<FileInfo> infos = new ArrayList<>();
        File[] files = new File(".").listFiles();
        for(File f:files){
            infos.add(new FileInfo(MessageDigestUtils.md5(new FileInputStream(f)),f.getName(),downloadURL.endsWith("/")?downloadURL.concat(f.getName()):downloadURL.concat("/").concat(f.getName())));
        }
        return (FileInfo[])infos.toArray();
    }

    private static class FileInfo {
        public final String name;
        public final String md5;
        public final String path;

        public FileInfo(String md5, String filename, String s1) {
            this.name = filename;
            this.md5 = md5;
            this.path = s1;
        }
    }
}
