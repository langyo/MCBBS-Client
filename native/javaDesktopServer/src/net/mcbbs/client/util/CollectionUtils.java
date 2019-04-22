package net.mcbbs.client.util;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * @author InitAuther97 Yaossg
 */
public final class CollectionUtils {
    /**
     * symmetric difference of 2 collections
     *
     * @param first  The first collection
     * @param second The second collection
     */
    public static <E> void removeDuplication(Collection<E> first, Collection<E> second) {
        for (E var : first) {
            if (second.contains(var)) {
                first.remove(var);
                second.remove(var);
            }
        }
    }

    /**
     * symmetric difference of 2 maps: by keys
     *
     * @param first  The first map
     * @param second The second map
     */
    public static <K, V, V2> void removeDuplicateKey(Map<K, V> first, Map<K, V2> second) {
        for (K key : first.keySet()) {
            if (second.containsKey(key)) {
                first.remove(key);
                second.remove(key);
            }
        }
    }

    /**
     * symmetric difference of 2 maps: by key-value pairs
     *
     * @param first  The first map
     * @param second The second map
     */
    public static <K, V> void removeDuplicateKeyValue(Map<K, V> first, Map<K, V> second) {
        for (K key : first.keySet()) {
            if (second.containsKey(key) && first.get(key) != null && first.get(key).equals(second.get(key))) {
                first.remove(key);
                second.remove(key);
            }
        }
    }

    /**
     * Concat strings.
     * @param separator Separator between strings
     * @param stringList strings
     * @return a string concat by strings and separators between strings
     */
    public static String stringList2String(char separator, List<String> stringList){
        StringBuilder sb = new StringBuilder();
        for(String s:stringList){
            sb.append(s);
            sb.append(separator);
        }
        String res = sb.toString();
        return res.substring(0,res.length()-1);
    }
    public static<A> A[] list2Obj(List<A> list){
        //noinspection unchecked
        return (A[])list.toArray();
    }
}
