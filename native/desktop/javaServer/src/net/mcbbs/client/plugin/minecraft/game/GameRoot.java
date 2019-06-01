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

package net.mcbbs.client.plugin.minecraft.game;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import net.mcbbs.client.main.client.command.CommandDispatcher;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class GameRoot implements IGameRoot {
    private final Path configJson;
    private final Game.Type gameType;
    private final Path assetsIndex;
    private final Path libraryIndex;
    private final Path nativeIndex;
    private final Path gameJar;

    protected GameRoot(@Nonnull Path configJson) throws IOException, InvalidGameException {
        this.configJson = configJson;
        JsonParser jsonParser = new JsonParser();
        JsonObject parsed = jsonParser.parse(Files.newBufferedReader(configJson)).getAsJsonObject();
        if (parsed.has("inheritsFrom") || !parsed.get("mainClass").getAsString().contentEquals("net.minecraft.client.main.Main")) {
            String id = parsed.get("id").getAsString();
            if (id.contains("fabric")) gameType = Game.Type.FABRIC;
            else if (id.contains("forge")) gameType = Game.Type.FORGE;
            else if (id.contains("optifine")) gameType = Game.Type.OPTIFINE;
                //else if(id.contains("modloader"))gameType = Game.Type.MODLOADER;
            else throw new InvalidGameException("Unable to identity game type:".concat(id));
        } else gameType = Game.Type.VANILLA;
        CommandDispatcher.DISPATCHER.send("");
        assetsIndex = null;
        libraryIndex = null;
        nativeIndex = null;
        gameJar = null;
    }

    @Override
    public Game.Type gameType() {
        return gameType;
    }

    @Override
    public Path assetsIndex() {
        return assetsIndex;
    }

    @Override
    public Path libraryIndex() {
        return libraryIndex;
    }

    @Override
    public Path nativeIndex() {
        return nativeIndex;
    }

    @Override
    public Path gameJar() {
        return gameJar;
    }

    @Override
    public Path configJson() {
        return configJson;
    }

    @Override
    public boolean checkLibrary() throws IOException {
        return false;
    }

    @Override
    public boolean checkAssets() throws IOException {
        return false;
    }


}
