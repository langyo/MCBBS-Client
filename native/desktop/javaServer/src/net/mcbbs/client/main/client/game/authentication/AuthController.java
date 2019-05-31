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

package net.mcbbs.client.main.client.game.authentication;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonWriter;
import net.mcbbs.client.util.IOUtils;

import java.io.IOException;
import java.io.StringWriter;

public enum AuthController {
    INSTANCE;
    public static final YggdrasilAuthentication YGGDRASIL_AUTHENTICATION = INSTANCE.new YggdrasilAuthentication();
    public final class YggdrasilAuthentication implements IMojangAuthController{
        public static final String SERVER_ADDRESS = "authserver.mojang.com/";
        private JsonObject did(JsonObject argument, String method) throws AuthenticationException, IOException {
            JsonObject parsed = IOUtils.doPOST(SERVER_ADDRESS.concat(method), argument.getAsString(), "application/json", JsonObject.class);
            if (parsed.has("error")) {
                throw new AuthenticationException(
                        parsed.get("error").getAsString()
                                .concat(":")
                                .concat(parsed.get("cause").getAsString())
                                .concat(":")
                                .concat(parsed.get("errorMessage").getAsString())
                );
            }
            return parsed;
        }

        @Override
        public JsonObject authenticate(String name, int version, String username, String password, String clientToken, boolean requestUser) throws AuthenticationException {
            try {
                JsonObject jsonObject = new JsonObject();
                JsonObject agent = new JsonObject();
                agent.addProperty("name",name);
                agent.addProperty("version",version);
                jsonObject.add("agent",agent);
                jsonObject.addProperty("username",username);
                jsonObject.addProperty("password",password);
                jsonObject.addProperty("clientToken",clientToken);
                jsonObject.addProperty("requestUser",requestUser);
                return did(jsonObject, "authenticate");
            } catch (IOException e) {
                throw new AuthenticationException("IOException:".concat(e.getMessage()), e);
            }
        }

        @Override
        public JsonObject refresh(String accessToken, String clientToken, String id, String name, boolean requestUser) throws AuthenticationException {
            try {
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("accessToken",accessToken);
                jsonObject.addProperty("clientToken",clientToken);
                JsonObject selectedProfile = new JsonObject();
                selectedProfile.addProperty("id",id);
                selectedProfile.addProperty("name",name);
                jsonObject.add("selectedProfile",selectedProfile);
                jsonObject.addProperty("requestUser",requestUser);
                return did(jsonObject, "refresh");
            } catch (IOException e) {
                throw new AuthenticationException("IOException:".concat(e.getMessage()), e);
            }
        }

        @Override
        public boolean validate(String accessToken, String clientToken) throws AuthenticationException {
            try {
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("accessToken",accessToken);
                jsonObject.addProperty("clientToken",clientToken);
                return did(jsonObject, "validate").getAsString().isEmpty();
            } catch (IOException e) {
                throw new AuthenticationException("IOException:".concat(e.getMessage()), e);
            }
        }

        @Override
        public void signout(String username, String password) throws AuthenticationException {
            try {
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("username",username);
                jsonObject.addProperty("password",password);
                StringWriter stringWriter = new StringWriter();
                did(jsonObject, "signout");
            } catch (IOException e) {
                throw new AuthenticationException("IOException:".concat(e.getMessage()), e);
            }
        }

        @Override
        public void invalidate(String accessToken, String clientToken) throws AuthenticationException {
            try {
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("accessToken",accessToken);
                jsonObject.addProperty("clientToken",clientToken);
                did(jsonObject, "invalidate");
            } catch (IOException e) {
                throw new AuthenticationException("IOException:".concat(e.getMessage()), e);
            }
        }
    }

    public final class AuthlibInjectorAuthController {

    }
    final JsonParser parser = new JsonParser();
}
