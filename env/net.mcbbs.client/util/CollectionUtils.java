package net.mcbbs.client.util;

import java.util.Collection;
import java.util.Map;

public final class CollectionUtils {
    /**
     * Always foreach the first one!
     * @param first The first collection
     * @param last The another collection
     * @param <E> used to make sure that both of two collections uses the same generic parameter.
     * @return An ordered tuple with two collections without repetition
     */
    public static<E> Tuple<Collection<E>,Collection<E>> removeRepetition(Collection<E> first,Collection<E> last){
        for (E var:first) {
            if(last.contains(var)){
                first.remove(var);
                last.remove(var);
            }
        }
        return Tuple.asTuple(first, last);
    }

    /**
     * Always foreach the first one!
     * @param first The first map
     * @param last The another map
     * @param <K> used to make sure that both of two collections uses the same generic parameter.
     * @param <V> used to make sure that both of two collections uses the same generic parameter.
     * @return An ordered tuple with two maps without repetitive key
     */
    public static<K,V> Tuple<Map<K,V>,Map<K,V>> removeRepetitionKey(Map<K,V> first, Map<K,V> last){
        for(K key:first.keySet()){
            if(last.containsKey(key)){
                first.remove(key);
                last.remove(key);
            }
        }
        return Tuple.asTuple(first, last);
    }

    /**
     * Always foreach the first one!
     * @param first The first map
     * @param last The another map
     * @param <K> used to make sure that both of two collections uses the same generic parameter.
     * @param <V> used to make sure that both of two collections uses the same generic parameter.
     * @return An ordered tuple with two maps without repetitive Key-Value Pair
     */
    public static<K,V> Tuple<Map<K,V>,Map<K,V>> removeRepetitionValue(Map<K,V> first, Map<K,V> last){
        for(K key:first.keySet()){
            if(last.containsKey(key) && first.get(key)!=null && first.get(key).equals(last.get(key))){
                first.remove(key);
                last.remove(key);
            }
        }
        return Tuple.asTuple(first, last);
    }
}
