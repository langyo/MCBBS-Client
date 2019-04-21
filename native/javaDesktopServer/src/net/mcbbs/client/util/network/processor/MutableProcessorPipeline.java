package net.mcbbs.client.util.network.processor;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import net.mcbbs.client.util.network.internal.ProcessorUtils;

import javax.annotation.Nonnull;
import java.util.List;
import java.util.ListIterator;

public final class MutableProcessorPipeline<I> {
    List<ProcessorChainline<?,?,?>> order;
    public MutableProcessorPipeline(){
        order = Lists.newArrayList();
    }
    protected MutableProcessorPipeline(@Nonnull List<ProcessorChainline<?,?,?>> order) {
        this.order=order;
    }
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
        ProcessorUtils.fire(data, ImmutableList.copyOf(order.iterator()));
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

    public ImmutableProcessorPipeline<I> asImmutable() {
        return new ImmutableProcessorPipeline<>(order);
    }
}
