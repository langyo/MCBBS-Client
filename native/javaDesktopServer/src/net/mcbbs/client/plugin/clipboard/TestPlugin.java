package net.mcbbs.client.plugin.clipboard;

import net.mcbbs.client.socketserver.PluginDesigner;
import net.mcbbs.client.socketserver.PluginInterface;

import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.StringSelection;
import java.awt.toolkit.*;

public class TestPlugin implements PluginInterface {
    public PluginDesigner initializer() {
        PluginDesigner d = new PluginDesigner();

        d.appendInfo("package", "clipboard");
        d.appendInfo("author", "langyo");
        d.appendInfo("version", "0.1.0");
        d.appendInfo("description", "测试用插件，用于获取与设置剪贴板数据。");

        d.appendCommand("get", (str, source) -> this.get());
        d.appendCommand("set", (str, source) -> this.set(str));

        return p;
    }

    public String get() {
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        DataFlavor flavor = DataFlavor.stringFlavor;
        if (clipboard.isDataFlavorAvailable(flavor)) return (String) clipboard.getData(flavor);
        else return "";
    }

    public String set(String str) {
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        clipboard.setContents(new StringSelection(str), null);
        return "";
    }
}