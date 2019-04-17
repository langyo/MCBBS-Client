package net.mcbbs.client.util.throwable;

import com.sun.istack.internal.NotNull;

public interface IThrowableProcessor {
    void process(@NotNull Throwable t);
}
