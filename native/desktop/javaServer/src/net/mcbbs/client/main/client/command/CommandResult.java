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

public final class CommandResult {
    private final String type;
    private final String pkgName;
    private final String namespace;
    private final String method;
    private final String data;

    public CommandResult(String type, String pkgName, String namespace, String method, String data) {
        this.type = type;
        this.pkgName = pkgName;
        this.namespace = namespace;
        this.method = method;
        this.data = data;
    }

    public String getType() {
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

    public String getData() {
        return data;
    }
}
