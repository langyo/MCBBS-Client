package net.mcbbs.client.socketserver;

import java.util.*;

public class PluginDesigner
{
    public String package;
    public String author;
    public String version;
    public String description;

    public Map<String, PluginCommandListener> commands, dataListeners;

    public void appendInfo(String type, String value) throws IOException
    {
        switch(type)
        {
            case "package":
                this.package = value;
                break;
            case "author":
                this.author = value;
                break;
            case "version":
                this.version = value;
                break;
            case "description":
                this.description = value;
                break;
            default:
                throw new IOException("插件试图在创建无效的说明文本项！");
        }
    }

    public void appendCommand(String command, PluginCommandListener listener) throws IOException
    {
        if(this.package == null) throw new IOException("在未指定包名之前就设置子命令！");
        commands.put(command, listener);
    }

    public void appendDataListener(String command, PluginCommandListener listener) throws IOException{
        if(this.package == null) throw new IOException("在未指定包名之前就设置子命令！");
        dataListeners.put(command, listeners);
    }
}