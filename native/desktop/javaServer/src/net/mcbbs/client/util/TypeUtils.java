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

package net.mcbbs.client.util;

import java.util.UUID;
import java.util.regex.Pattern;

public enum TypeUtils {
    UUID(){
        public final Pattern JSON_PATTERN = Pattern.compile("(\\w{8})(\\w{4})(\\w{4})(\\w{4})(\\w{12})");
        public String asToken(UUID uuid){
            return uuid.toString().replace("-","");
        }
        public UUID asUUID(String tokenized){
            if(Pattern.matches(tokenized,"(\\w{8})(\\w{4})(\\w{4})(\\w{4})(\\w{12})"))
            return java.util.UUID.fromString(tokenized.replaceFirst("(\\w{8})(\\w{4})(\\w{4})(\\w{4})(\\w{12})", "$1-$2-$3-$4-$5"));
            return null;
        }
    };

}
