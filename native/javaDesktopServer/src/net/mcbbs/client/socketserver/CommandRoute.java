package net.mcbbs.client.socketserver;

public class CommandRoute
{
    public CommandSource left;
    public CommandSource right;
    public CommandDirection direction;

    public final class BROADCAST_T {}
    public static final BROADCAST_T BROADCAST_FLAG;

    public CommandRoute(String str) throws CommandRouteException
    {
        String left, right;
        if(str.indexOf("->") != -1)
        {
            direction = CommandDirection.TO_RIGHT;
            left = str.substring(0, str.indexOf("->"));
            right = str.substring(str.indexOf("->") + 2);
        }
        else if(str.indexOf("<-") != -1)
        {
            direction = CommandDirection.TO_LEFT;
            left = str.substring(0, str.indexOf("<-"));
            right = str.substring(str.indexOf("<-") + 2);
        }
        else throw new CommandRouteException();

        // 判断是否为合法的源
        CommandSource[] enums = Source.values();
        boolean hasLeft = false;
        boolean hasRight = false;

        for(CommandSource n : enums)
        {
            if(left == n) hasLeft = true;
            if(right == n) hasRight = true;
            if(hasLeft && hasRight) break;
        }
        if(!(hasLeft && hasRight)) throw new CommandRouteException();

        this.left = left;
        this.right = right;
    }

    public CommandRoute(String str, BROADCAST_T BROADCAST)
    {
        this.left = str;
    }

    public boolean equals(CommandRoute n)
    {
        return this.left == n.left && this.right == n.right && this.direction = n.direction;
    }

    public String toString()
    {
        return this.left + this.direction == CommandDirection.TO_LEFT ? "<-" : "->" + this.right;
    }

    public CommandSource getFrom()
    {
        if(this.direction == CommandDirection.TO_LEFT) return this.right;
        else return this.left
    }

    public CommandSource getTo()
    {
        if(this.direction == CommandDirection.TO_LEFT) return this.left;
        else return this.right;
    }

    public CommandRoute reverse()
    {
        if(this.direction == CommandDirection.TO_LEFT) this.direction = CommandDirection.TO_RIGHT;
        else this.direction = CommandDirection.TO_LEFT;
        return this;
    }
}