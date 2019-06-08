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

package net.mcbbs.client.plugin.minecraft.game;

public class InvalidGameException extends Exception {
    public InvalidGameException() {
    }

    public InvalidGameException(String msg) {
        super(msg);
    }

    public InvalidGameException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public InvalidGameException(Throwable cause) {
        super(cause);
    }
}
