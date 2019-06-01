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

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import net.mcbbs.client.api.plugin.command.CommandResult;
import net.mcbbs.client.main.client.command.task.CommandTask;
import net.mcbbs.client.main.client.net.WSClient;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.FutureTask;

import static net.mcbbs.client.Constants.DEFAULT_PARSER;

public final class CommandDispatcher {
    public static final ExecutorService SERVICE = Executors.newFixedThreadPool(16);
    public static final CommandDispatcher DISPATCHER = new CommandDispatcher();
    public static final List<CommandTask> TASKS = Lists.newArrayList();

    private CommandDispatcher() {
    }

    public final void dispatchAsync(Command command) {
        switch (command.getType()) {
            case EXECUTE:
                CommandTask ct = new CommandTask(command,UUID.randomUUID()).callback(arg-> {
                    CommandResult result = (CommandResult) arg.get("result");
                    UUID taskid = (UUID) arg.get("taskId");
                    JsonObject jsonObject = result.getCommand().asGJson();
                    JsonArray array = jsonObject.getAsJsonArray("args");
                    array.add("id="+UUID.randomUUID());
                    for(Object thing:result.getResult()){
                        array.add(thing.toString());
                    }
                    jsonObject.remove("args");
                    jsonObject.add("args",array);
                    WSClient.INSTANCE.send(jsonObject.toString());
                    TASKS.stream().filter(task->task.getTaskId().equals(taskid)).findAny().ifPresent(TASKS::remove);
                });
                TASKS.add(ct);
                SERVICE.submit(ct);
            case DATA:

                break;
            default:
                break;
        }
    }

    public final void send(Command command) {
        JsonObject jo = command.asGJson();
        jo.getAsJsonArray("args").add("id="+ UUID.randomUUID().toString());
        WSClient.INSTANCE.send(command.asJson());
    }
}
