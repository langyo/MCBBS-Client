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

package net.mcbbs.client.main.client.command;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import net.mcbbs.client.Constants;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class CommandParser {
    public Command parse(String command){
        JsonParser jp = Constants.DEFAULT_PARSER;
        JsonObject cmd = jp.parse(command).getAsJsonObject();
        return new Command(
                cmd.get("type").getAsString()
                ,cmd.get("module").getAsString(),
                cmd.get("namespace").getAsString(),
                cmd.get("method").getAsString(),
                StreamSupport
                        .stream(cmd.getAsJsonArray("args").spliterator(),false)
                        .map(JsonElement::getAsString)
                        .collect(Collectors.toList())
        );
    }
    public String format(Command command) {
       return command.toString();
   }

}
