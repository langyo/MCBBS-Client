package net.mcbbs.client.main;

import com.google.common.collect.Lists;
import net.mcbbs.client.main.server.CommandDispatcher;
import net.mcbbs.client.main.server.SocketServer;
import net.mcbbs.client.util.network.processor.ChainProcessorFactory;
import net.mcbbs.client.util.network.processor.MutableProcessorPipeline;
import net.mcbbs.client.util.thread.SingleArgumentRunnable;
import net.mcbbs.client.util.thread.ThrowableRunnable;
import net.mcbbs.client.util.throwable.IErrorProcessor;
import net.mcbbs.client.util.throwable.IExceptionProcessor;

import java.io.IOException;
import java.net.ServerSocket;

/**
 * @author yinyangshi InitAuther97
 */
public class Launcher {
    public static void main(String[] args) throws IOException {
        int port = 9234;
        SocketServer ss = new SocketServer(port,"desktop-");
        MutableProcessorPipeline<String> mutable = new MutableProcessorPipeline<>();
        mutable.register(ChainProcessorFactory.newSimpleDataUser(String.class, new SingleArgumentRunnable<>() {
            String string;
            @Override
            public String argument() {
                return string;
            }

            @Override
            public void setArugment(String arg) {
                string=arg;
            }

            @Override
            public void runWithArg(String arg) {
                CommandDispatcher.dispatch(arg);
            }
        }));
        ss.addPipe("default",mutable.asImmutable());
        ss.enablePipe("default");
        ss.addThrowableProcessor((IExceptionProcessor) Throwable::printStackTrace);
        new Thread(ss).start();
    }
}
