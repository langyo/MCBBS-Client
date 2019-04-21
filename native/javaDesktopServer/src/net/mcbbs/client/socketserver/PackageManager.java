package net.mcbbs.client.socketserver;

import java.net.*;

public class PackageManager
{
    public static Map<String, PluginDesigner> packages;

    public static void loadPackageFile(URL url, String classPath) throws IOException
    {
        URLClassLoader pluginLoader = new URLClassLoader(new URL[] {url});
        Class cl = pluginLoader.loadClass(classPath);
        if(!cl.getClass() instanceof PluginInterface)
         throw new IOException("遇到了一个无法装载为插件的 jar 文件，请检查位于 " + url.toString() + " 的类 " + classPath + " 是否符合插件的编写要求！");
        Method m = cl.getMethod("initializer");
        PluginDesigner ret = m.invoke(cl.getClass());
        packages.put(ret.package, ret);
    }

    public static void loadPackage(PluginDesigner p)
    {
        packages.put(p.package, p);
    }
}