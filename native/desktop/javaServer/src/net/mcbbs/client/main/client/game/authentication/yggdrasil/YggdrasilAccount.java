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

import net.mcbbs.client.main.client.game.authentication.Account;
import net.mcbbs.client.main.client.game.authentication.Authentication;
import net.mcbbs.client.main.client.game.authentication.AuthenticationException;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class YggdrasilAccount implements Account {
    @Nonnull
    @Override
    public String account() {
        return null;
    }

    @Nonnull
    @Override
    public String password() {
        return null;
    }

    @Override
    public Authentication signIn() throws AuthenticationException {
        return null;
    }

    @Nullable
    @Override
    public Authentication getAuthentication() {
        return null;
    }
}
