package net.mcbbs.client.plugin.clipboard;

import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.Plugin;
import net.mcbbs.client.api.plugin.event.construction.MappingEvent;
import net.mcbbs.client.api.plugin.event.construction.PluginConstructionEvent;
import net.mcbbs.client.api.plugin.service.Service;
import net.mcbbs.client.util.InvocationHandlerFactory;

import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.StringSelection;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.io.IOException;
import java.util.function.Function;

public class TestPlugin implements IPlugin, Service<Object, String> {
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

    public String set(String str) throws IOException, UnsupportedFlavorException {
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        String result = null;
        if (clipboard.isDataFlavorAvailable(DataFlavor.stringFlavor))
            result = (String) clipboard.getData(DataFlavor.stringFlavor);
        result = (result == null || result.isEmpty() ? "" : result);
        clipboard.setContents(new StringSelection(str), null);
        return "";
    }

    @Plugin.SubscribeEvent(MappingEvent.Methods.class)
    public void onMappingMethod(MappingEvent.Methods event) throws NoSuchMethodException {
        Util.INSTANCE = event.<TestPlugin, Util>registerMapper(TestPlugin.class, "testplugin_mapper", InvocationHandlerFactory.createDefault())
                .mapMethod(Util.class.getDeclaredMethod("setClipboardContent", String.class), getClass().getDeclaredMethod("set", String.class), Function.identity(), this)
                .mapMethod(Util.class.getDeclaredMethod("getClipboardContent"), getClass().getDeclaredMethod("get", String.class), Function.identity(), this)
                .mapped(Util.class);

        System.out.println(Util.INSTANCE.getClipboardContent());
    }

    @Plugin.SubscribeEvent(PluginConstructionEvent.ServiceMapping.class)
    public void onServiceMapping(PluginConstructionEvent.ServiceMapping event) {
        event.provides(this, TestPlugin.class, this);
    }


    @Override
    public void onEnabled() {
        //Client.getPlugin("clipboard").getCommand()
    }

    @Override
    public void onDisabled() {
    }

    @Override
    public String invoke(Object arg) {
        return get();
    }

    @Override
    public String name() {
        return "clipboard";
    }

    public static final class Util {
        private static Util INSTANCE = new Util();
        private static boolean initialized = false;

        private static void init(Util INSTANCE) {
            Util.INSTANCE = INSTANCE;
        }

        public static final Util get() {
            return INSTANCE;
        }

        public String setClipboardContent(String str) {
            return "";
        }

        public String getClipboardContent() {
            return "";
        }
    }
}