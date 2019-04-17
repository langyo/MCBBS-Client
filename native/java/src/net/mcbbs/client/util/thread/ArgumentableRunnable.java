package net.mcbbs.client.util.thread;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public interface ArgumentableRunnable extends Runnable{
    List<Object> args = new ArrayList<>();
    default void run(){
        active(args.toArray());
    }
    default void addArg(Collection<Object> c){
        args.addAll(c);
    }
    default void addArg(Object... args){
        addArg(Arrays.asList(args));
    }
    void active(Object[] args);
}
