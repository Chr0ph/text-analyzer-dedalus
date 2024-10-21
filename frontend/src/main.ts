import { bootstrapApplication } from '@angular/platform-browser';
import { TextAnalyzerComponent } from './app/text-analyzer/text-analyzer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(TextAnalyzerComponent, {
  providers: [provideAnimationsAsync()]
})
  .catch(err => console.error(err));