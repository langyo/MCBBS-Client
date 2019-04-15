import java.util.*;

public class command_parser {
    public static void main(String[] args) {
        String test = "123 456 afqw 2384uf asdf";
        System.out.println("Begin...");
        String[] list = test.split(" ");
        for(String s : list) System.out.println(s);
    }
}