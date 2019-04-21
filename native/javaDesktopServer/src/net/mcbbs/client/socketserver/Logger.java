package net.mcbbs.client.socketserver;

public class Logger {
    public static void eval(String time, String source, String value) {
        System.out.println("[ " + time + " ] [" + source + " ] " + value);
        // TODO: 不是输出到控制台，而是存进文件
    }

    public static void log(String str) {
        // 同时也可用于本地记录的日志向其它端投递日志
        String time = DataTimeFormatter.ISO_LOCAL_TIME.format(LocalData.now());
        eval(time, SystemCommandDashboard.nativeVersionInfo, str);
        PluginDashboard.log(time, SystemCommandDashboard.nativeVersionInfo, str);
    }
}