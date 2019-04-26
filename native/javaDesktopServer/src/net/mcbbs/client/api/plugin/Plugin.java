package net.mcbbs.client.api.plugin;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.*;
import static java.lang.annotation.ElementType.*;
public interface Plugin {
    @Retention(RUNTIME)
    @Target({TYPE,METHOD})
    @interface DependOn{
        String id();
        String version();
        String value();
    }
    @Retention(RUNTIME)
    @Target(TYPE)
    @interface EventHandler{}
    @Retention(RUNTIME)
    @Target(METHOD)
    @interface SubscribeEvent{
        Class<?> value();
    }
    @Retention(RUNTIME)
    @Target({TYPE,PARAMETER,METHOD})
    @interface Named{
        String value();
    }
}
