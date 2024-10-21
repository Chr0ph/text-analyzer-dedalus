package Christoph.textanalyzer.controller;

import Christoph.textanalyzer.service.TextAnalyzerService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analyze")
@CrossOrigin(origins = "http://localhost:4200")
public class TextAnalyzerController {

    private final TextAnalyzerService textAnalyzerService;

    public TextAnalyzerController(TextAnalyzerService textAnalyzerService) {
        this.textAnalyzerService = textAnalyzerService;
    }

    // Endpoint for analyzing vowels
    @GetMapping("/vowels")
    public Map<String, Integer> analyzeVowels(@RequestParam String text) {
        return textAnalyzerService.analyzeVowels(text);
    }

    // Endpoint for analyzing consonants
    @GetMapping("/consonants")
    public Map<String, Integer> analyzeConsonants(@RequestParam String text) {
        return textAnalyzerService.analyzeConsonants(text);
    }
}