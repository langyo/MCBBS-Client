package net.mcbbs.client.util.network.internal;

import net.mcbbs.client.util.network.processor.ProcessorChainline;

import java.util.List;
import java.util.ListIterator;

public final class ProcessorUtils {
    public static<T> void fire(T data, List<ProcessorChainline<?,?,?>> order){
        ListIterator<ProcessorChainline<?,?,?>> iter = order.listIterator();
        if(iter.hasNext()){
            Object data2;
            ProcessorChainline chainline = iter.next();
            //noinspection unchecked
            chainline.fire(data);
            data2 = chainline.getLast().value();
            while(iter.hasNext()){
                chainline = iter.next();
                //noinspection unchecked
                chainline.fire(data2);
            }
        }
    }
}
