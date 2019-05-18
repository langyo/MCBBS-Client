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

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import com.google.gson.stream.JsonWriter;
import net.mcbbs.client.util.IOUtils;

import java.io.IOException;
import java.io.StringWriter;

public enum AuthController implements IAuthController{
    YGGDRASIL_AUTH_CONTROLLER("https://authserver.mojang.com/"){
        private JsonObject did(JsonObject argument) throws AuthenticationException,IOException{
            JsonObject parsed = IOUtils.doPOST(serverAddress.concat("authenticate"), argument.getAsString(), "application/json", JsonObject.class);
            if(parsed.has("error")){
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
        public JsonObject authenticate(String name,String version,String username,String password,String clientToken,boolean requestUser) throws AuthenticationException {
            try {
                StringWriter stringWriter = new StringWriter();
                JsonWriter jsonWriter = new JsonWriter(stringWriter);
                jsonWriter.beginObject()
                        .name("agent")
                        .beginObject()
                        .name("name")
                        .value(name)
                        .name("version")
                        .value(version)
                        .endObject()
                        .name("username")
                        .value(username)
                        .name("password")
                        .value(password)
                        .name("clientToken")
                        .value(clientToken)
                        .name("requestUser")
                        .value(requestUser)
                        .endObject();
                JsonObject argument = parser.parse(stringWriter.toString()).getAsJsonObject();
                return did(argument);
            }catch (IOException e){
                throw new AuthenticationException("IOException:".concat(e.getMessage()),e);
            }
       }

        @Override
        public JsonObject refresh(String accessToken,String clientToken,String id,String name,boolean requestUser) throws AuthenticationException {
            try {
                StringWriter stringWriter = new StringWriter();
                JsonWriter jsonWriter = new JsonWriter(stringWriter);
                jsonWriter.beginObject()
                        .name("accessToken")
                        .value(accessToken)
                        .name("clientToken")
                        .value(clientToken)
                        .name("selectedProfile")
                        .beginObject()
                        .name("id")
                        .value(id)
                        .name("name")
                        .value(name)
                        .endObject()
                        .name("requestUser")
                        .value(requestUser)
                        .endObject();
                JsonObject argument = parser.parse(stringWriter.toString()).getAsJsonObject();
                return did(argument);
            }catch (IOException e){
                throw new AuthenticationException("IOException:".concat(e.getMessage()),e);
            }
        }

        @Override
        public boolean validate(String accessToken, String clientToken) throws AuthenticationException {
            try {
                StringWriter stringWriter = new StringWriter();
                JsonWriter jsonWriter = new JsonWriter(stringWriter);
                jsonWriter.beginObject()
                        .name("accessToken")
                        .value(accessToken)
                        .name("clientToken")
                        .value(clientToken)
                        .endObject();
                JsonObject argument = parser.parse(stringWriter.toString()).getAsJsonObject();
                return did(argument).getAsString().isEmpty();
            }catch (IOException e){
                throw new AuthenticationException("IOException:".concat(e.getMessage()),e);
            }
        }

        @Override
        public void signout(String username, String password) throws AuthenticationException {
            try {
                StringWriter stringWriter = new StringWriter();
                JsonWriter jsonWriter = new JsonWriter(stringWriter);
                jsonWriter.beginObject()
                        .name("username")
                        .value(username)
                        .name("password")
                        .value(password)
                        .endObject();
                JsonObject argument = parser.parse(stringWriter.toString()).getAsJsonObject();
                did(argument);
            }catch (IOException e){
                throw new AuthenticationException("IOException:".concat(e.getMessage()),e);
            }
        }

        @Override
        public void invalidate(String accessToken, String clientToken) throws AuthenticationException {
            try {
                StringWriter stringWriter = new StringWriter();
                JsonWriter jsonWriter = new JsonWriter(stringWriter);
                jsonWriter.beginObject()
                        .name("accessToken")
                        .value(accessToken)
                        .name("clientToken")
                        .value(clientToken)
                        .endObject();
                JsonObject argument = parser.parse(stringWriter.toString()).getAsJsonObject();
                did(argument);
            }catch (IOException e){
                throw new AuthenticationException("IOException:".concat(e.getMessage()),e);
            }
        }
    },
    AUTHLIB_AUTH_CONTROLLER(""){
        @Override
        public JsonObject authenticate(String name, String version, String username, String password, String clientToken, boolean requestUser) throws AuthenticationException {
            return null;
        }

        @Override
        public JsonObject refresh(String accessToken, String clientToken, String id, String name, boolean requestUser) throws AuthenticationException {
            return null;
        }

        @Override
        public boolean validate(String accessToken, String clientToken) throws AuthenticationException {
            return false;
        }

        @Override
        public void signout(String username, String password) throws AuthenticationException {

        }

        @Override
        public void invalidate(String accessToken, String clientToken) throws AuthenticationException {

        }
    },
    OFFLINE_AUTH_CONTROLLER(""){
        @Override
        public JsonObject authenticate(String name, String version, String username, String password, String clientToken, boolean requestUser) throws AuthenticationException {
            return null;
        }

        @Override
        public JsonObject refresh(String accessToken, String clientToken, String id, String name, boolean requestUser) throws AuthenticationException {
            return null;
        }

        @Override
        public boolean validate(String accessToken, String clientToken) throws AuthenticationException {
            return false;
        }

        @Override
        public void signout(String username, String password) throws AuthenticationException {

        }

        @Override
        public void invalidate(String accessToken, String clientToken) throws AuthenticationException {

        }
    };

    final JsonParser parser = new JsonParser();
    final String serverAddress;
    AuthController(String s) {
        serverAddress=s;
    }
}
