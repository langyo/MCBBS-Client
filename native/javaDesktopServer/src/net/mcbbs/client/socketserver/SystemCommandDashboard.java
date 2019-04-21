package net.mcbbs.client.socketserver;

public SystemCommandDashboard
        {
public static final String nativeVersionInfo="java";

private static Set<String> registed=new Set<>();

public static void eval(String command,String[]extraArgs,CommandRoute route)throws CommandExecuteException
        {
        switch(command)
        {
        case SystemCommandType.CALL:
        PluginDashboard.system(route.reverse(),SystemCommandType.RECEIVE,nativeVersionInfo);
        registed.add(extraArgs[0]);
        break;
        case SystemCommandType.RECEIVE:
        registed.add(extraArgs[0]);
        break;
        case SystemCommandType.EXIT:
        if(registed.contains(extraArgs[0]))
        {
        PluginDashboard.callback(route.reverse(),"got","system","exit");
        System.exit(0);
        }
        else
        {
        PluginDashboard.callback(route.reverse(),"fail","system","exit");
        }
        break;
default:
        throw new CommandExecuteException();
        }
        }
        }