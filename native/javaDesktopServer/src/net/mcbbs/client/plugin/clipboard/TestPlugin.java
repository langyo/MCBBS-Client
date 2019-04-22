package net.mcbbs.client.plugin.clipboard;

import net.mcbbs.client.main.server.cmd.CommandRoute;
import net.mcbbs.client.main.server.cmd.PluginCommandListener;
import net.mcbbs.client.main.server.cmd.PluginDesigner;
import net.mcbbs.client.main.server.cmd.PluginInterface;

import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.StringSelection;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.io.IOException;
import java.util.List;

public class TestPlugin implements PluginInterface {
    public PluginDesigner initializer() {
        PluginDesigner d = new PluginDesigner();

        d.appendInfo("package", "clipboard");
        d.appendInfo("author", "langyo");
        d.appendInfo("version", "0.1.0");
        d.appendInfo("description", "测试用插件，用于获取与设置剪贴板数据。");

        d.appendCommand("get", new PluginCommandListener() {

            @Override
            public String trigger(String args, CommandRoute route) {
                return get();
            }

            @Override
            public String trigger(List<String> args, CommandRoute route) {
                return get();
            }
        });
        d.appendCommand("set", new PluginCommandListener() {
            @Override
            public String trigger(String args, CommandRoute route) {
                return set(args);
            }

            @Override
            public String trigger(List<String> args, CommandRoute route) {
                throw new UnsupportedOperationException();
            }
        });

        return d;
    }

    public String get() {
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        DataFlavor flavor = DataFlavor.stringFlavor;
        if (clipboard.isDataFlavorAvailable(flavor)) {
            try {
                return (String) clipboard.getData(flavor);
            } catch (UnsupportedFlavorException | IOException e) {
                e.printStackTrace();
            }
        }
        return "";
    }

    public String set(String str) {
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        clipboard.setContents(new StringSelection(str), null);
        return "";
    }
}