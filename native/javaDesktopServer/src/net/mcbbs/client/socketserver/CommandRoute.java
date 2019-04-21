package net.mcbbs.client.socketserver;

import java.util.Objects;

public class CommandRoute
{
    public CommandSource first;
    public CommandSource second;
    public CommandDirection direction;

    public final class BROADCAST_T {}
    private static BROADCAST_T BROADCAST_FLAG;

    public CommandRoute(String str) throws CommandRouteException
    {
        String first, second;
        if(str.contains("->"))
        {
            direction = CommandDirection.REQUEST;
            first = str.substring(0, str.indexOf("->"));
            second = str.substring(str.indexOf("->") + 2);
        }
        else if(str.contains("<-"))
        {
            direction = CommandDirection.RESPONSE;
            first = str.substring(0, str.indexOf("<-"));
            second = str.substring(str.indexOf("<-") + 2);
        }
        else throw new CommandRouteException();

        // 判断是否为合法的源
        CommandSource[] enums = CommandSource.values();
        boolean hasLeft = false;
        boolean hasRight = false;

        for(CommandSource n : enums)
        {
            if(Objects.equals(first, n.getSourceName())) hasLeft = true;
            if(Objects.equals(second, n.getSourceName())) hasRight = true;
            if(hasLeft && hasRight) break;
        }
        if(!(hasLeft && hasRight)) throw new CommandRouteException();

        this.first = CommandSource.valueOf(first.toUpperCase());
        this.second = CommandSource.valueOf(second.toUpperCase());
    }

    public CommandRoute(String str, BROADCAST_T BROADCAST)
    {
        this.first = CommandSource.valueOf(str.toUpperCase());
        BROADCAST_FLAG=BROADCAST;
    }

    public boolean equals(CommandRoute n)
    {
        return (this.first == n.first) && (this.second == n.second) && (this.direction == n.direction);
    }

    public String toString()
    {
        return this.first.getSourceName() + (this.direction == CommandDirection.RESPONSE ? "<-" : "->") + this.second;
    }

    public CommandSource getFrom()
    {
        if(this.direction == CommandDirection.RESPONSE) return this.second;
        else return this.first;
    }

    public CommandSource getTo()
    {
        if(this.direction == CommandDirection.RESPONSE) return this.first;
        else return this.second;
    }

    public CommandRoute reverse()
    {
        if(this.direction == CommandDirection.RESPONSE) this.direction = CommandDirection.REQUEST;
        else this.direction = CommandDirection.RESPONSE;
        return this;
    }

    public static BROADCAST_T getBroadcastFlag() {
        return BROADCAST_FLAG;
    }
}