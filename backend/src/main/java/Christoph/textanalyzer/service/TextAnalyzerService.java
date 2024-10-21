package Christoph.textanalyzer.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class TextAnalyzerService {

    // Method to analyze vowels in the text
    public Map<String, Integer> analyzeVowels(String input) {
        Map<String, Integer> vowelCount = new HashMap<>();
        int numA = 0, numE = 0, numI = 0, numO = 0, numU = 0;

        for (char c : input.toCharArray()) {
            switch (Character.toLowerCase(c)) {
                case 'a': numA++; break;
                case 'e': numE++; break;
                case 'i': numI++; break;
                case 'o': numO++; break;
                case 'u': numU++; break;
                default: break;
            }
        }

        if (numA > 0) vowelCount.put("A", numA);
        if (numE > 0) vowelCount.put("E", numE);
        if (numI > 0) vowelCount.put("I", numI);
        if (numO > 0) vowelCount.put("O", numO);
        if (numU > 0) vowelCount.put("U", numU);

        return vowelCount;
    }

    // Method to analyze consonants in the text
    public Map<String, Integer> analyzeConsonants(String input) {
        Map<String, Integer> consonantCount = new HashMap<>();

        for (char c : input.toCharArray()) {
            if (!isVowel(c) && Character.isLetter(c)) {
                String consonant = String.valueOf(c).toUpperCase();
                consonantCount.put(consonant, consonantCount.getOrDefault(consonant, 0) + 1);
            }
        }

        return consonantCount;
    }

    // Helper method to check if a character is a vowel
    private boolean isVowel(char c) {
        return "aeiouAEIOU".indexOf(c) != -1;
    }
}
