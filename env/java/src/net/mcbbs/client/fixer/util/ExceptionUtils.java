package net.mcbbs.client.fixer.util;

import java.util.List;

/**
 * @author Yaossg
 * */
public class ExceptionUtils {
    public static <T extends Throwable> void throwAll(List<T> throwables) throws T {
        if(throwables.isEmpty()) return;
        throw throwables.stream().reduce((e, e2) -> {
            e.addSuppressed(e2);
            return e;
        }).get();
    }
}
