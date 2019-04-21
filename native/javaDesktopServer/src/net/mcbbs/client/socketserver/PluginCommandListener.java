package net.mcbbs.client.socketserver;

public interface PluginCommandListener
{
    String trigger(String args, CommandRoute route);
    String trigger(String[] args, CommandRoute route);

    default boolean isArrayArguments()
    {
        return false;
    }
}