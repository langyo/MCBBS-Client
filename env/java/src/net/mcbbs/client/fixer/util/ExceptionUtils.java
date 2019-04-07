package net.mcbbs.client.fixer.util;

import java.util.List;

/**
 * @author Yaossg
 */
public class ExceptionUtils {
    public static <T extends Throwable> void throwAll(List<T> throwable) throws T {
        if (throwable.isEmpty()) {
            return;
        }
        throw throwable.stream().reduce((e, e2) -> {
            e.addSuppressed(e2);
            return e;
        }).get();
    }
}
