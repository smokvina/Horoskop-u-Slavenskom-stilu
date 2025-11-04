
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NatalFormComponent, NatalFormData } from './components/natal-form/natal-form.component';
import { ChartDisplayComponent } from './components/chart-display/chart-display.component';
import { GeminiService } from './services/gemini.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, NatalFormComponent, ChartDisplayComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isLoading: WritableSignal<boolean> = signal(false);
  chartData: WritableSignal<string | null> = signal(null);
  errorMessage: WritableSignal<string | null> = signal(null);

  constructor(private geminiService: GeminiService) {}

  async handleFormSubmit(data: NatalFormData): Promise<void> {
    this.isLoading.set(true);
    this.chartData.set(null);
    this.errorMessage.set(null);

    try {
      const result = await this.geminiService.generateAnalysis(data);
      this.chartData.set(result);
    } catch (error) {
      console.error('Error generating natal chart:', error);
      this.errorMessage.set('Došlo je do pogreške prilikom stvaranja Vaše priče. Molimo pokušajte ponovno.');
    } finally {
      this.isLoading.set(false);
    }
  }

  reset(): void {
    this.chartData.set(null);
    this.errorMessage.set(null);
    this.isLoading.set(false);
  }
}
