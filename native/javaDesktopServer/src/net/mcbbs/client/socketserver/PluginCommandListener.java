package net.mcbbs.client.socketserver;

public interface PluginCommandListener {
    String trigger(String args, String source);
}