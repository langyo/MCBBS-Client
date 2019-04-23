package net.mcbbs.client.main.server;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import net.mcbbs.client.util.network.IServer;
import net.mcbbs.client.util.network.processor.ImmutableProcessorPipeline;
import net.mcbbs.client.util.network.processor.MutableProcessorPipeline;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.lang.ref.PhantomReference;
import java.lang.ref.Reference;
import java.lang.ref.ReferenceQueue;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class SocketServer implements IServer<String> {
    public static final ImmutableProcessorPipeline<String> DEFAULT_PIPE = new MutableProcessorPipeline<String>().asImmutable();
    List<PhantomReference<?>> phantomReferences = new ArrayList<>();
    ReferenceQueue finalizer = new ReferenceQueue();
    private int time = 0;
    private List<Connection> connections = Lists.newArrayList();
    private Thread server;
    private Thread finalizeController;
    private ThreadGroup childThread;
    private ServerSocket ss = new ServerSocket();
    private ImmutableProcessorPipeline<String> pipeline;
    private Map<String, ImmutableProcessorPipeline<String>> pipelines = Maps.newHashMap();

    public SocketServer(int port, String threadPrefix) throws IOException {
        childThread = new ThreadGroup(threadPrefix);
        ss.bind(new InetSocketAddress("localhost", port));
        server = new Thread(childThread, this, "main");
        finalizeController = new Thread(childThread,()->{
            Reference<?> finalizing;
            while(true) {
                if(Thread.currentThread().isInterrupted())break;
                finalizing = finalizer.poll();
                if(finalizing==null)continue;
                System.out.println("Running finalization of Object " + finalizing);
            }
        },"finalizer");
        finalizeController.setDaemon(true);
    }

    @Override
    public void addPipe(String id, ImmutableProcessorPipeline<String> p) {
        if (!pipelines.containsValue(p) && !pipelines.containsKey(id))
            pipelines.put(id, p);
    }

    @Override
    public void enablePipe(String id) {
        ImmutableProcessorPipeline<String> buf = pipelines.get(id);
        if(buf==null)return;
        if(server.getState().equals(Thread.State.RUNNABLE))server.interrupt();
        pipeline = buf;
        new Thread(childThread,()->{
            //noinspection StatementWithEmptyBody
            while(!server.getState().equals(Thread.State.RUNNABLE));
            server.start();
        }).start();
    }

    @Override
    public ImmutableProcessorPipeline<String> getPipe(String id) {
        return pipelines.get(id);
    }

    @Override
    public ImmutableProcessorPipeline<String> getActivated() {
        return pipeline;
    }

    public void start() {
        finalizeController.start();
        server.start();
    }

    public void stop() {
        finalizeController.interrupt();
        server.interrupt();
    }

    @Override
    public void active() {
        if(pipeline==null)throw new RuntimeException("Starting server without enable a pipeline!",new NullPointerException("pipeline = null"));
        Thread buf2;
        while (true) {
            if(Thread.currentThread().isInterrupted())break;
            try {
                Socket buf = ss.accept();
                buf2 = new Thread(childThread, () -> {
                    try(Scanner scanner = new Scanner(new BufferedInputStream(buf.getInputStream()))) {
                        while(scanner.hasNextLine()){
                            pipeline.fire(scanner.nextLine());
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }, "client-" + (time++));
                Connection connection = new Connection(buf, buf2);
                phantomReferences.add(new PhantomReference<>(connection, finalizer));
                connections.add(connection);
                buf2.start();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    static class Connection extends IServer.Connection {
        final Socket connection;

        Connection(Socket connection, Thread processor) {
            super(processor);
            this.connection = connection;
        }

        @Override
        public void shutdown() {
            try {
                connection.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
