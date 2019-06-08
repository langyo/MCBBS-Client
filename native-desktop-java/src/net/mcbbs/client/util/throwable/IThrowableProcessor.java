package net.mcbbs.client.util.throwable;

import javax.annotation.Nonnull;

public interface IThrowableProcessor {
    void process(@Nonnull Throwable t);
}
