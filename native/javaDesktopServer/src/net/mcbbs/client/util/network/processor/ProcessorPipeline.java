package net.mcbbs.client.util.network.processor;

import com.google.common.collect.Lists;

import java.util.List;
import java.util.ListIterator;

public final class ProcessorPipeline<I> {
    List<ProcessorChainline<?,?,?>> order = Lists.newArrayList();
    public void addChainline(ProcessorChainline<?,?,?> chain){
        if(order.isEmpty()) {
            order.add(chain);
        }else{
            ListIterator<ProcessorChainline<?,?,?>> iterator = order.listIterator();
            ProcessorChainline last;
            while(iterator.hasNext())iterator.next();
            last = iterator.previous();
            if(last.last != null &&checkSubClass(last.last.getOutputType(),chain.first.getInputType())!=null){
                order.add(chain);
            }
        }
    }
    private Class<?> checkSubClass(Class<?> f,Class<?> l){
        try {
            return f.asSubclass(l);
        }catch (ClassCastException e){
            return null;
        }
    }
    public void removeChainline(ProcessorChainline<?,?,?> chain){
        order.remove(chain);
    }
    public void fire(I data){
        ListIterator<ProcessorChainline<?,?,?>> iter = order.listIterator();
        if(iter.hasNext()){
            Object data2;
            ProcessorChainline chainline = iter.next();
            //noinspection unchecked
            chainline.fire(data);
            data2 = chainline.last.value();
            while(iter.hasNext()){
                chainline = iter.next();
                //noinspection unchecked
                chainline.fire(data2);
            }
        }
    }
    public void register(IProcessorChainable<?,?> chainable){
        ListIterator<ProcessorChainline<?,?,?>> iterator = order.listIterator();
        ProcessorChainline last;
        while(iterator.hasNext())iterator.next();
        last = iterator.previous();
        checkSubClass(chainable.getInputType(),last.last.getOutputType());
        //noinspection unchecked
        order.add(new ProcessorChainline<>(last.last,chainable));
    }
}
