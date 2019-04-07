package net.mcbbs.client.fixer;

import com.google.common.collect.Maps;
import com.google.gson.*;
import com.google.gson.stream.JsonReader;
import net.mcbbs.client.fixer.util.FileInfo;
import net.mcbbs.client.fixer.util.IOUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;

/**
 * @author yinyangshi InitAuther97 Yaossg
 */
public class DataFixer {

    private static final Gson GSON = new GsonBuilder().create();

    private JsonReader pullMD5Json(String loc) throws IOException {
        return new JsonReader(new BufferedReader(new InputStreamReader(IOUtils.from(loc == null ? "http://langyo.github.io/MCBBS-Client/update.json" : loc))));
    }

    public void fixUpData(String loc, String root, boolean fixUpCodes, boolean fixUpResources) throws IOException {
        try (JsonReader jr = pullMD5Json(loc)) {
            JsonParser jp = new JsonParser();
            JsonElement je = jp.parse(jr);
            JsonArray array = je.getAsJsonArray();
            Map<String, FileInfo> fileMD5 = Maps.newHashMap();
            for (JsonElement element : array) {
                FileInfo info = GSON.fromJson(element, FileInfo.class);
                fileMD5.put(info.name, info);
            }
            // TODO new File() loves you!
            Path rootPath = Paths.get(
                    Objects.requireNonNull(new File("..").getParentFile()
                            .listFiles((dir, name) -> name.contentEquals("scripts")))[0].getAbsolutePath(),
                    "scripts"
            );

            Iterator<Path> iterator = Files.walk(rootPath, FileVisitOption.FOLLOW_LINKS)
                    .filter(path -> fileMD5.keySet().contains(path.getFileName().toString()))
                    .filter(t -> fileMD5.values()
                            .stream()
                            .map(fileInfo -> fileInfo.md5)
                            .noneMatch(p -> p.equals(t.toString()))
                    ).iterator();
            while (iterator.hasNext()) {
                Path next = iterator.next();
                IOUtils.bindStream(
                        Files.newOutputStream(next),
                        IOUtils.from(fileMD5.get(next.getFileName().toString()).path)
                ).transformAllAndClose();
            }
        }
    }
}
