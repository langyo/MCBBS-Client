package net.mcbbs.client.api.plugin;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

public interface Plugin {
    @Retention(RUNTIME)
    @Target({TYPE, METHOD})
    @interface DependOn {
        String id();

        String version();

        String value();
    }

    @Retention(RUNTIME)
    @Target(METHOD)
    @interface SubscribeEvent {
        Class<?> value();
    }
}
