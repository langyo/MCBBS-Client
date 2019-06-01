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

import com.google.gson.JsonObject;
import net.mcbbs.client.Constants;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import static net.mcbbs.client.Constants.*;
public class Command {
    private static final CommandParser DEFAULT_CPARSER = new CommandParser();
    private final CommandType type;
    private final String pkgName;
    private final String namespace;
    private final String method;
    private final List<String> args;
    public Command(CommandType type, String pkgName, String namespace, String method, List<String> args, UUID taskId){
        this.type = type;
        this.pkgName = pkgName;
        this.namespace = namespace;
        this.method = method;
        this.args = args==null? Collections.emptyList() :args;
    }

    public CommandType getType() {
        return type;
    }

    public String getPkgName() {
        return pkgName;
    }

    public String getNamespace() {
        return namespace;
    }

    public String getMethod() {
        return method;
    }

    public List<String> getArgs() {
        return args;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(type).append(" ").append(pkgName).append(" ").append(namespace).append(" ").append(method);
        for(String key:args){
            sb.append(" ").append(key);
        }
        return sb.toString();
    }

    public String asJson(){
        return DEFAULT_CPARSER.format(this);
    }

    public JsonObject asGJson(){
        return DEFAULT_PARSER.parse(asJson()).getAsJsonObject();
    }
}
