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

package net.mcbbs.client.main.client.game.authentication.yggdrasil;

import com.google.common.collect.Sets;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import net.mcbbs.client.Constants;
import net.mcbbs.client.main.client.game.Game;
import net.mcbbs.client.main.client.game.authentication.AuthController;
import net.mcbbs.client.main.client.game.authentication.Authentication;
import net.mcbbs.client.main.client.game.authentication.AuthenticationException;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class YggdrasilAuthentication implements Authentication<YggdrasilAccount> {

    private final YggdrasilAccount account;
    private String access_token;
    private Set<UserProfile> profiles = Sets.newHashSet();
    private UserProfile selected_profile;
    private User user;

    protected YggdrasilAuthentication(YggdrasilAccount account, JsonObject authInfo) {
        this.account = account;
        access_token = authInfo.get("accessToken").getAsString();
        Gson gson = Constants.DEFAULT_GSON;
        selected_profile = gson.fromJson(authInfo.get("selectedProfile"), YggdrasilUserProfile.class);
        user = gson.fromJson(authInfo.get("user"), YggdrasilUser.class);
        JsonArray array = authInfo.getAsJsonArray("availableProfiles");
        Iterator<JsonElement> elements = array.iterator();
        while (elements.hasNext()) {
            profiles.add(gson.fromJson(elements.next(), UserProfile.class));
        }
    }

    @Override
    public String accessToken() {
        return access_token;
    }

    @Override
    public String clientToken() {
        return Game.CLIENT_TOKEN.toString();
    }

    @Override
    public Set<UserProfile> profiles() {
        return profiles;
    }

    @Override
    public UserProfile selectedProfile() {
        return selected_profile;
    }

    @Override
    public void refresh() {
        try {
            Gson gson = Constants.DEFAULT_GSON;
            JsonObject refresh = AuthController.YGGDRASIL_AUTHENTICATION.refresh(access_token, Game.CLIENT_TOKEN.toString(), selected_profile.id(), selected_profile.name(), true);
            access_token = refresh.get("accessToken").getAsString();
            selected_profile = gson.fromJson(refresh.get("selectedProfile"), YggdrasilUserProfile.class);
        } catch (AuthenticationException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void destroy() {
        try {
            AuthController.YGGDRASIL_AUTHENTICATION.invalidate(access_token, Game.CLIENT_TOKEN.toString());
        } catch (AuthenticationException e) {
            e.printStackTrace();
        }
    }

    @Override
    public YggdrasilAccount getAccount() {
        return account;
    }

    @Override
    public User getUser() {
        return user;
    }

    public final class YggdrasilUser implements User {
        private final String id;
        private final Map<String, String> properties;

        public YggdrasilUser(String id, Map<String, String> properties) {
            this.id = id;
            this.properties = properties;
        }

        @Override
        public String id() {
            return id;
        }

        @Override
        public Map<String, String> properties() {
            return properties;
        }

        @Override
        public String getProperty(String key) {
            return properties.get(key);
        }
    }

    public final class YggdrasilUserProfile implements UserProfile {
        private final String id;
        private final String name;
        private final boolean legacy;

        public YggdrasilUserProfile(String id, String name, boolean legacy) {
            this.id = id;
            this.name = name;
            this.legacy = legacy;
        }

        @Override
        public String id() {
            return id;
        }

        @Override
        public String name() {
            return name;
        }

        @Override
        public boolean legacy() {
            return legacy;
        }
    }
}
