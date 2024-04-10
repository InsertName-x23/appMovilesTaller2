import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class Main {

    public static String lengthOfLongestSubstring(String s) {
        if (s == null || s.equals("")) return "El string está vacío";
        
        TreeMap<Integer, HashMap<Character, String>> hashLongestSubstring = new TreeMap<>();
        char[] sChars = s.toCharArray();
        HashMap<Character, String> subHashLongestSubstring = new HashMap<>();
        int cnt = 0;
        int index = -1;
        String largerSubstring = "";

        for (char item : sChars) {
            if (subHashLongestSubstring.putIfAbsent(item, String.valueOf(cnt)) == null) {
                cnt++;
                index++;
            } else {
                hashLongestSubstring.put(subHashLongestSubstring.size(), new HashMap<>(subHashLongestSubstring));
                subHashLongestSubstring.clear();
                index++;
                subHashLongestSubstring.put(item, String.valueOf(index));
                cnt = index + 1;

                for (int i = index - 1; i >= 0; i--) {
                    if (subHashLongestSubstring.putIfAbsent(sChars[i], String.valueOf(i)) != null) break;
                }
            }
        }

        hashLongestSubstring.put(subHashLongestSubstring.size(), new HashMap<>(subHashLongestSubstring));

        int sizeString = 0;
        for (int item : hashLongestSubstring.keySet()) {
            sizeString = item;
        }

        HashMap<Character, String> subHashLongestSubstringItems = hashLongestSubstring.get(sizeString);

        for (char key : subHashLongestSubstringItems.keySet()) {
            largerSubstring += subHashLongestSubstringItems.get(key);
        }

        char[] stringNumSort = largerSubstring.toCharArray();
        java.util.Arrays.sort(stringNumSort);
        String finalString = "";

        for (char c : stringNumSort) {
            int cCast = Integer.parseInt(String.valueOf(c));
            finalString += sChars[cCast];
        }

        return "La subcadena más larga es: " + finalString;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("bbtablud"));
    }
}
