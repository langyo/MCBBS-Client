package net.mcbbs.client.fixer.util;

import java.util.Collection;
import java.util.Map;

/**
 * @author InitAuther97
 */
public final class CollectionUtils {
    /**
     * Always foreach the first one!
     * Utility used to remove the duplicate values from the specified collections.
     * @param first The first collection
     * @param last  The another collection
     * @param <E>   used to make sure that both of two collections uses the same generic parameter.
     */
    public static <E> void removeDuplication(Collection<E> first, Collection<E> last) {
        for (E var : first) {
            if (last.contains(var)) {
                first.remove(var);
                last.remove(var);
            }
        }
    }

    /**
     * Always foreach the first one!
     * Utility used to remove the key-value pairs with the duplicate keys from the specified maps.
     * @param first The first map
     * @param last  The another map
     * @param <K>   used to make sure that both of two collections uses the same generic parameter.
     * @param <V>   used to make sure that both of two collections uses the same generic parameter.
     */
    public static <K, V> void removeDuplicateKey(Map<K, V> first, Map<K, V> last) {
        for (K key : first.keySet()) {
            if (last.containsKey(key)) {
                first.remove(key);
                last.remove(key);
            }
        }
    }

    /**
     * Always foreach the first one!
     * Utility used to remove the key-value pairs with the duplicate values from the specified maps.
     * @param first The first map
     * @param last  The another map
     * @param <K>   used to make sure that both of two collections uses the same generic parameter.
     * @param <V>   used to make sure that both of two collections uses the same generic parameter.
     */
    public static <K, V> void removeDuplicateValue(Map<K, V> first, Map<K, V> last) {
        for (K key : first.keySet()) {
            if (last.containsKey(key) && first.get(key) != null && first.get(key).equals(last.get(key))) {
                first.remove(key);
                last.remove(key);
            }
        }
    }
}
