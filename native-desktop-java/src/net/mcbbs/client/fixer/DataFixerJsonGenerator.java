/*
   Copyright 2019 langyo<langyo.china@gmail.com> and contributors

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */

package net.mcbbs.client.fixer;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import net.mcbbs.client.util.ExceptionUtils;
import net.mcbbs.client.util.FileInfo;
import net.mcbbs.client.util.MessageDigestUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author yinyangshi InitAuther97 Yaossg
 */
public class DataFixerJsonGenerator {

    private static final Gson GSON = new GsonBuilder().create();

    /**
     * generate the file-info json.
     *
     * @param downloadURL where to download the new file
     * @throws IOException when cannot write data.
     */
    public static void generate(String downloadURL) throws IOException {
        try {
            System.out.println(GSON.toJson(
                    generateFileInfos(downloadURL == null ? "http://langyo.github.io/MCBBS-Client/update.json" : downloadURL)));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    /**
     * generate all file information.
     *
     * @param downloadURL where to download the new file.
     * @return a List with all the file infos
     * @throws IOException              if failed to read file.
     * @throws NoSuchAlgorithmException if unable to find md5.
     */
    private static List<FileInfo> generateFileInfos(String downloadURL) throws IOException, NoSuchAlgorithmException {
        List<IOException> ioExceptions = new ArrayList<>();
        List<NoSuchAlgorithmException> noSuchAlgorithmExceptions = new ArrayList<>();
        List<FileInfo> infos = Files.walk(Paths.get(".")).parallel()
                .map(f -> {
                    try {
                        return new FileInfo(MessageDigestUtils.md5(Files.newInputStream(f)),
                                f.getFileName().toString(),
                                downloadURL.endsWith("/") ? downloadURL.concat(f.getFileName().toString()) :
                                        downloadURL.concat("/").concat(f.getFileName().toString()),
                                f.toAbsolutePath().toString());
                    } catch (NoSuchAlgorithmException e) {
                        noSuchAlgorithmExceptions.add(e);
                    } catch (IOException e) {
                        ioExceptions.add(e);
                    }
                    return null;
                })
                .collect(Collectors.toList());
        ExceptionUtils.throwAll(ioExceptions);
        ExceptionUtils.throwAll(noSuchAlgorithmExceptions);
        return infos;
    }

}
