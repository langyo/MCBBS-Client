package net.mcbbs.client.util;

import java.util.concurrent.Callable;

public interface TypedCallable<A,R> extends Callable<R> {
    R call();
    R call(A arg);
}
