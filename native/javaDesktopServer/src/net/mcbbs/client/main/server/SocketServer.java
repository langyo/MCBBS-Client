package net.mcbbs.client.main.server;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import net.mcbbs.client.util.network.IServer;
import net.mcbbs.client.util.network.processor.ImmutableProcessorPipeline;
import net.mcbbs.client.util.network.processor.MutableProcessorPipeline;

import java.io.IOException;
import java.lang.ref.PhantomReference;
import java.lang.ref.ReferenceQueue;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SocketServer implements IServer {
    public static final ImmutableProcessorPipeline<?> DEFAULT_PIPE = new MutableProcessorPipeline<>().asImmutable();
    List<PhantomReference<?>> phantomReferences = new ArrayList<>();
    ReferenceQueue<?> finalizer = new ReferenceQueue();
    private int time = 0;
    private List<Connection> connections = Lists.newArrayList();
    private Thread server;
    private ThreadGroup childThread;
    private ServerSocket ss = new ServerSocket();
    private ImmutableProcessorPipeline pipeline = null;
    private Map<String, ImmutableProcessorPipeline<?>> pipelines = Maps.newHashMap();

    public SocketServer(int port, String threadPrefix) throws IOException {
        childThread = new ThreadGroup(threadPrefix);
        ss.bind(new InetSocketAddress("localhost", port));
    }

    @Override
    public void addPipe(String id, ImmutableProcessorPipeline<?> p) {
        if (!pipelines.containsValue(p) && !pipelines.containsKey(id))
            pipelines.put(id, p);
    }

    @Override
    public void enablePipe(String id) {
        pipeline = pipelines.getOrDefault(id, pipeline == null ? DEFAULT_PIPE : pipeline);
    }

    @Override
    public ImmutableProcessorPipeline getPipe(String id) {
        return pipelines.get(id);
    }

    @Override
    public ImmutableProcessorPipeline<?> getActivated() {
        return pipeline;
    }

    public void start() {
        server = new Thread(childThread, this, "main");
        server.start();
    }

    public void stop() {
        server.interrupt();
        server = null;
    }

    @Override
    public void active() {
        Thread buf2;
        Socket buf;
        while (true) {
            try {
                buf = ss.accept();
                buf2 = new Thread(childThread, () -> {
                }, "client-" + (time++));
                Connection connection = new Connection(buf, buf2);
                phantomReferences.add(new PhantomReference<>(connection, (ReferenceQueue<? super Connection>) finalizer));
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
