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

public interface IMojangAuthController {

    /**
     * Send authentication request to server.
     * @param name Game name, force to 'Minecraft'
     * @param version Yggdrasil version
     * @param username Account
     * @param password Password of account
     * @param clientToken Token generated for distinguish client.
     * @param requestUser give true;Otherwise,it will not appear in request.
     * @return message used to
     * @throws AuthenticationException If problem found or authentication failed.
     */
    JsonObject authenticate(String name, int version, String username, String password, String clientToken, boolean requestUser) throws AuthenticationException;

    /**
     *
     * @param accessToken Access token given by server.
     * @param clientToken Token generated for distinguishing client.
     * @param id
     * @param name
     * @param requestUser
     * @return
     * @throws AuthenticationException
     */
    JsonObject refresh(String accessToken, String clientToken, String id, String name, boolean requestUser) throws AuthenticationException;

    boolean validate(String accessToken, String clientToken) throws AuthenticationException;

    void signout(String username, String password) throws AuthenticationException;

    void invalidate(String accessToken, String clientToken) throws AuthenticationException;
}
