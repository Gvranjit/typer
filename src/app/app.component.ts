import { Component } from '@angular/core';
import { ScoreService } from './shared/score.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ScoreService],
})
export class AppComponent {
  title = 'typer';
}
