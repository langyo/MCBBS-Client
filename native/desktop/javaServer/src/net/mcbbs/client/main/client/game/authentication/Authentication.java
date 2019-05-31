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

import java.util.Map;
import java.util.Set;

public interface Authentication {
    interface UserProfile{
        String id();
        String name();
        boolean legacy();
    }
    interface User{
        String id();
        Map<String,String> properties();
    }
    /**
     * {
     *     "accessToken": "random access token",      // hexadecimal
     *     "clientToken": "client identifier",        // identical to the one received
     *     "availableProfiles": [                     // only present if the agent field was received
     *         {
     *             "id": "profile identifier",        // hexadecimal
     *             "name": "player name",
     *             "legacy": true or false            // In practice, this field only appears in the response if true. Default to false.
                    *         }
     *     ],
     *     "selectedProfile": {                       // only present if the agent field was received
     *         "id": "uuid without dashes",
     *         "name": "player name",
     *         "legacy": true or false
                    *     },
     *     "user": {                                  // only present if requestUser was true in the request payload
     *         "id": "user identifier",               // hexadecimal
     *         "properties": [
     *             {
     *                 "name": "preferredLanguage",   // might not be present for all accounts
     *                 "value": "en"                  // Java locale format (https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#toString--)
                        *             },
     *             {
     *                 "name": "twitch_access_token", // only present if a twitch account is associated (see https://account.mojang.com/me/settings)
     *                 "value": "twitch oauth token"  // OAuth 2.0 Token; alphanumerical; e.g. https://api.twitch.tv/kraken?oauth_token=[...]
                        *                                                // the Twitch API is documented here: https://github.com/justintv/Twitch-API
     *             }
     *         ]
     *     }
     * }
     * @throws AuthenticationException If problem found or authentication failed.
     */
    String accessToken();

    String clientToken();

    Set<UserProfile> profiles();

    UserProfile selectedProfile();

    void refresh();

    void destroy();

    Account getAccount();
}
