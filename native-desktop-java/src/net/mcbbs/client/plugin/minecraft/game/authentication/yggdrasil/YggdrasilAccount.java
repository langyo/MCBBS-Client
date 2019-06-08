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

package net.mcbbs.client.plugin.minecraft.game.authentication.yggdrasil;

import com.google.gson.JsonObject;
import net.mcbbs.client.plugin.minecraft.game.Game;
import net.mcbbs.client.plugin.minecraft.game.authentication.Account;
import net.mcbbs.client.plugin.minecraft.game.authentication.AuthController;
import net.mcbbs.client.plugin.minecraft.game.authentication.AuthenticationException;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class YggdrasilAccount implements Account {
    private String account;
    private String password;
    private YggdrasilAuthentication authentication;

    public static YggdrasilAccount getAccount(String user, String pass) {
        assert user != null && pass != null;
        YggdrasilAccount account = new YggdrasilAccount();
        account.account = user;
        account.password = pass;
        return account;
    }

    @Nonnull
    @Override
    public String account() {
        return account;
    }

    @Nonnull
    @Override
    public String password() {
        return password;
    }

    /**
     * Authenticate with info in Account.
     *
     * @return Authentication result.
     * @throws AuthenticationException when Authenticating failed.
     */
    @Override
    public YggdrasilAuthentication signIn() throws AuthenticationException {
        JsonObject object = AuthController.YGGDRASIL_AUTHENTICATION.authenticate("Minecraft", 1, account, password, Game.CLIENT_TOKEN.toString(), true);
        YggdrasilAuthentication auth = new YggdrasilAuthentication(this, object);
        return (authentication = auth);
    }

    @Nullable
    @Override
    public YggdrasilAuthentication getAuthentication() {
        return authentication;
    }
}
