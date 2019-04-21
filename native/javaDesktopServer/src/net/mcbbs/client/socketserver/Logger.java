package net.mcbbs.client.socketserver;

import java.time.*;
import java.time.format.DateTimeFormatter;

public class Logger
{
    public static void eval(String time, String source, String value)
    {
        System.out.println("[ " + time + " ] [" + source + " ] " + value);
        // TODO: 不是输出到控制台，而是存进文件
    }

    public static void log(String str) {
        // 同时也可用于本地记录的日志向其它端投递日志
        String time = DateTimeFormatter.ISO_LOCAL_TIME.format(LocalDate.now());
        eval(time, SystemCommandDashboard.nativeVersionInfo, str);
        try {
            PluginDashboard.log(new CommandRoute("java->node"),time,"[".concat(SystemCommandDashboard.nativeVersionInfo).concat("]").concat(str));
        } catch (CommandRouteException e) {
            e.printStackTrace();
        }
    }
}