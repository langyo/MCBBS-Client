package net.mcbbs.client.main.server;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import net.mcbbs.client.util.network.IServer;
import net.mcbbs.client.util.network.processor.ImmutableProcessorPipeline;
import net.mcbbs.client.util.network.processor.MutableProcessorPipeline;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.List;
import java.util.Map;

public class SocketServer implements IServer {
    public static final ImmutableProcessorPipeline<?> DEFAULT_PIPE = new MutableProcessorPipeline<>().asImmutable();
    int time = 0;
    List<Connection> threads = Lists.newArrayList();
    ThreadGroup childThread;
    ServerSocket ss = new ServerSocket();
    ImmutableProcessorPipeline pipeline = null;
    Map<String, ImmutableProcessorPipeline<?>> pipelines = Maps.newHashMap();

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
    public void active() {
        Thread buf2;
        var ref = new Object() {
            Socket buf;
        };
        while (true) {
            try {
                ref.buf = ss.accept();
                buf2 = new Thread(childThread, () -> {
                    try {
                        BufferedReader br = new BufferedReader(new InputStreamReader(ref.buf.getInputStream()));
                        String cmd = br.readLine();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }, "client-" + (time++));
                threads.add(new Connection(ref.buf, buf2));
                buf2.start();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    static class Connection {
        final Socket connection;
        final Thread processor;

        Connection(Socket connection, Thread processor) {
            this.connection = connection;
            this.processor = processor;
        }
    }
}
