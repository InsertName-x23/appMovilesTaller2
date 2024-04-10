

static string LengthOfLongestSubstring(string s) {
        
        if(s == null || s== "") return "El string esta vacio";
        SortedDictionary<int, Dictionary<char, string>> HashLongesSubstrig = 
        new SortedDictionary<int, Dictionary<char, string>>();

        char[] sChars = s.ToCharArray();
        Dictionary<char, string> SubHashLongesSubstring = 
        new Dictionary<char, string>();
        int cnt = 0;
        int index = -1;
        string LargerSubString = "";
        foreach(char item in sChars)
        { 
            if(SubHashLongesSubstring.TryAdd(item, cnt.ToString()))
            {
                cnt++;
                index++;
            }else{
                HashLongesSubstrig.TryAdd(SubHashLongesSubstring.Count(), SubHashLongesSubstring);
                SubHashLongesSubstring = new Dictionary<char, string>();
                index++;
                SubHashLongesSubstring.TryAdd(item, index.ToString());
                cnt = index + 1;
                
                for (int i = index - 1; i > 0; i--)
                {
                    if(!SubHashLongesSubstring.TryAdd(sChars.ElementAt(i), i.ToString()))
                        break;
                    
                }
            }
        }
        if(HashLongesSubstrig.TryAdd(SubHashLongesSubstring.Count(), SubHashLongesSubstring));
        int sizeStirng = 1;
        foreach (int item in HashLongesSubstrig.Keys)
        {
            sizeStirng = item;
        }
        HashLongesSubstrig.TryGetValue(sizeStirng, 
        out Dictionary<char, string> SubHashLongesSubstring_Items);

        foreach (char key in SubHashLongesSubstring_Items.Keys)
        {
            SubHashLongesSubstring_Items.TryGetValue(key, out string tmp);
            LargerSubString = LargerSubString  +""+""+tmp;
        }

        char[] string_num_sort = LargerSubString.ToCharArray();
        Array.Sort(string_num_sort);
        cnt = 0;
        string final = "";
        foreach (char c in string_num_sort){
            int c_cast = int.Parse(c.ToString());
            final = final + sChars[c_cast];
        }
        
        return "The longest sub string is: "+ final;
    }


    Console.WriteLine(LengthOfLongestSubstring("bbtablud"));
