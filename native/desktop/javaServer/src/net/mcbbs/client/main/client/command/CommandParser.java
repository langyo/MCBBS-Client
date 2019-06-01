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

import com.google.common.collect.Maps;

import java.util.Map;

public class CommandParser {
    public Command parse(String command) {
        String[] strings = command.split(" ", 5);
        switch (strings[0]) {
            case "execute":
                String[] options = strings[4].replaceAll("--", " ").split(" ");
                Map<String, String> param = Maps.newHashMap();
                String[] buf;
                for (String option : options) {
                    buf = option.split("=", 2);
                    param.put(buf[0], buf[1]);
                }
                return new Command(strings[0], strings[1], strings[2], strings[3], param);
            default:
                return null;
        }
    }

    public CommandResult parseResult(String result) {
        String[] strings = result.split(" ", 5);
        if (!strings[0].contentEquals("data")) throw new IllegalArgumentException("result start with a non data type");

    }

    public String format(Command command) {
        return command.toString();
    }

    public String format(CommandResult result) {
        return result.toString();
    }

}
