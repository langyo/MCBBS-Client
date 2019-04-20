package net.mcbbs.client.util.network.processor;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import net.mcbbs.client.util.network.internal.ProcessorUtils;

import javax.annotation.Nonnull;
import java.util.List;
import java.util.ListIterator;

public final class ImmutableProcessorPipeline<I> {
    List<ProcessorChainline<?,?,?>> order;
    protected ImmutableProcessorPipeline(@Nonnull List<ProcessorChainline<?, ?, ?>> ordered){
        order=ordered;
    }
    public void fire(I data){
        ProcessorUtils.fire(data, ImmutableList.copyOf(order.iterator()));
    }
    public MutableProcessorPipeline<I> asMutable(){
        return new MutableProcessorPipeline<>(order);
    }
}
