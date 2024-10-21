import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-text-analyzer',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './text-analyzer.component.html',
  styleUrls: ['./text-analyzer.component.css']
})
export class TextAnalyzerComponent {
  textInput: string = ''; // User input
  analysisType: string = 'vowels'; // Either 'vowels' or 'consonants'
  analysisHistory: string[] = []; // Array to store previous analysis results
  isOnline: string = 'offline'; // Change for online/offline mode
  resultCounter: number =  0;

  constructor(private http: HttpClient) {} // Inject the HttpClient

  // Change between online or offline mode
  onToggleChange(){
    if(this.isOnline == "offline"){
      this.isOnline = "online";
    } else {
      this.isOnline = "offline";
    }
  }

  deleteResult(index: number) {
    this.analysisHistory.splice(index, 1);
  }
  
  analyzeText() {

    this.resultCounter++;

    if (!this.textInput.trim()) {
      this.analysisHistory.push(`${this.resultCounter}. Please enter some text to analyze!`);
      return;
    }

    const analyzedWord = this.textInput.trim();

    if (this.isOnline == "online") {
      // Use online method
      this.analyzeOnline(analyzedWord).subscribe({
        next: (result) => {
          this.analysisHistory.push(`${this.resultCounter}. "${analyzedWord}" (${this.isOnline}):\n${this.formatResult(result)}`);
        },
        error: (error) => {
          this.analysisHistory.push('Error connecting to server. Please try again.');
        }
      });
    } else {
      // Use offline method
      let result = '';
      if (this.analysisType === 'vowels') {
        result = this.analyzeVowels(analyzedWord);
        
      } else if (this.analysisType === 'consonants') {
        result = this.analyzeConsonants(analyzedWord);
        
      }
      this.analysisHistory.push(`${this.resultCounter}. "${analyzedWord}" (${this.isOnline}):\n${result}`);
    }
  }

  // Offline: Analyze vowels locally
  analyzeVowels(input: string): string {
    let numA = 0, numE = 0, numI = 0, numO = 0, numU = 0;
    for (let char of input) {
      if (char === 'a' || char === 'A') numA++;
      if (char === 'e' || char === 'E') numE++;
      if (char === 'i' || char === 'I') numI++;
      if (char === 'o' || char === 'O') numO++;
      if (char === 'u' || char === 'U') numU++;
    }
    return this.formatResult({
      A: numA,
      E: numE,
      I: numI,
      O: numO,
      U: numU
    });
  }

  // Offline: Analyze consonants locally
  analyzeConsonants(input: string): string {
    const consonantsCount: { [key: string]: number } = {};
    for (let char of input) {
      if (!/[aeiouAEIOU]/.test(char) && /[a-zA-Z]/.test(char)) {
        const upperChar = char.toUpperCase();
        consonantsCount[upperChar] = (consonantsCount[upperChar] || 0) + 1;
      }
    }
    return this.formatResult(consonantsCount);
  }

  // Online: Analyze text using the REST API
  analyzeOnline(text: string): Observable<any> {
    const apiUrl = `http://localhost:8080/api/analyze/${this.analysisType}?text=${text}`;
    return this.http.get(apiUrl); // Call the API and return the observable
  }

  // Format the result (both offline and online)
  formatResult(result: { [key: string]: number }): string {
    let formattedResult = '';
    for (const [key, value] of Object.entries(result)) {
      if (value > 0) {
        formattedResult += `Letter '${key}' appears ${value} times\n`;
      }
    }
    if(formattedResult.length === 0){
      if(this.analysisType === 'vowels'){
        formattedResult = 'There are no vowels in this text';
      } else if (this.analysisType === 'consonants'){
        formattedResult = 'There are no consonants in this text';
      }
    }
    return formattedResult.trim();
  }

  // Reset the analysis history
  resetHistory() {
    this.analysisHistory = [];
    this.resultCounter = 0;
  }
}
