package net.mcbbs.client.main.server.cmd;

import java.util.ArrayList;
import java.util.Iterator;

public class CommandBuilder {
    private ArrayList<String> commands = new ArrayList<>();

    public CommandBuilder append(String s) {
        commands.add(s);
        return this;
    }

    @Override
    public String toString() {
        StringBuilder str = new StringBuilder();
        Iterator iter = commands.iterator();
        while (iter.hasNext()) {
            str.append(iter.next());
            if (iter.hasNext()) str.append(" ");
        }
        return str.toString();
    }
}