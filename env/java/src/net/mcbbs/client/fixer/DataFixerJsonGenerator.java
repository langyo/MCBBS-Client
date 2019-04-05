package net.mcbbs.client.fixer;

import com.google.gson.stream.JsonWriter;
import net.mcbbs.client.fixer.util.MessageDigestUtils;

import java.io.IOException;
import java.io.StringWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author yinyangshi InitAuther97
 */
public class DataFixerJsonGenerator {
    public static void generate(String downloadURL) throws IOException {
        StringWriter stringWriter = new StringWriter();
        JsonWriter writer = new JsonWriter(stringWriter);
        writer.beginArray();
        try {
            for (FileInfo info : generateFileInfos(downloadURL == null ? "http://langyo.github.io/MCBBS-Client/update.json" : downloadURL)) {
                writer.beginObject();
                writer.name(info.name);
                writer.beginObject();
                writer.name("md5");
                writer.value(info.md5);
                writer.name("path");
                writer.value(info.path);
                writer.name("dest");
                writer.value(info.dest);
                writer.endObject();
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        writer.endArray();
        System.out.println(stringWriter.toString());
    }

    private static List<FileInfo> generateFileInfos(String downloadURL) throws IOException, NoSuchAlgorithmException {
        List<IOException> ioEs = new ArrayList<>();
        List<NoSuchAlgorithmException> noAlgorithmEs = new ArrayList<>();
        var infos = Files.walk(Paths.get(".")).parallel()
                .map(f -> {
                    try {
                        return new FileInfo(
                                MessageDigestUtils.md5(Files.newInputStream(f)),
                                f.getFileName().toString(),
                                downloadURL.endsWith("/") ? downloadURL.concat(f.getFileName().toString()) :
                                        downloadURL.concat("/").concat(f.getFileName().toString()),
                                f.toAbsolutePath().toString());
                    } catch (NoSuchAlgorithmException e) {
                        noAlgorithmEs.add(e);
                    } catch (IOException e) {
                        ioEs.add(e);
                    }
                    return null;
                })
                .collect(Collectors.toList());
        if (ioEs.isEmpty() && noAlgorithmEs.isEmpty()) {
            return infos;
        } else {
            if (ioEs.isEmpty()) {
                throw noAlgorithmEs.get(0);
            } else {
                throw ioEs.stream().reduce((e, e2) -> {
                    e.addSuppressed(e2);
                    return e;
                }).get();
            }
        }
    }

    private static class FileInfo {
        private final String name;
        private final String md5;
        private final String path;
        private final String dest;

        private FileInfo(String md5, String filename, String s1, String dest) {
            this.name = filename;
            this.md5 = md5;
            this.path = s1;
            this.dest = dest;
        }
    }
}
