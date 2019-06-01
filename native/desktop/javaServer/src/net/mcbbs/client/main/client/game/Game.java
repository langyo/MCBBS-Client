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

package net.mcbbs.client.main.client.game;

import com.google.common.annotations.Beta;
import com.google.common.collect.Maps;
import org.shanerx.mojang.Mojang;

import java.util.Collections;
import java.util.Map;
import java.util.UUID;

public final class Game {
    public static final Mojang MOJANG = new Mojang();
    public static final UUID CLIENT_TOKEN = UUID.randomUUID();
    private static boolean INITIALIZED = false;

    static {
        init();
    }

    public static void init() {
        if (INITIALIZED) throw new IllegalStateException("Has already initialized:n.m.c.m.client.game.Game");
        MOJANG.connect();
        INITIALIZED = true;
    }

    public static Map<String, String> servicesStatus() {
        Map<String, String> result = Maps.newHashMap();
        for (Mojang.ServiceType type : Mojang.ServiceType.values()) {
            result.put(type.toString(), MOJANG.getStatus(type).name().replaceAll("_", ".").toLowerCase());
        }
        return Collections.unmodifiableMap(result);
    }

    public enum Type {
        VANILLA,
        FORGE,
        @Deprecated MODLOADER,
        OPTIFINE,
        @Beta FABRIC
    }
}
