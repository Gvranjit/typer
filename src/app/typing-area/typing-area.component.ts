import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ScoreService } from '../shared/score.service';

@Component({
  selector: 'app-typing-area',
  templateUrl: './typing-area.component.html',
  styleUrls: ['./typing-area.component.scss'],
})
export class TypingAreaComponent implements OnInit, AfterViewInit {
  constructor(private scoreService: ScoreService) {}
  originalTextArrayWithStatus: {
    word: string;
    complete: boolean;
    correct: boolean;
  }[] = [];
  @ViewChild('inputField', { static: true }) inputField?: ElementRef;

  inputText: string = '';
  wordsList: string[] = [];
  lastTypedWord = { index: -1 };
  correct = true;
  wpm = 0;

  ngOnInit(): void {
    const originalText: string = `Then came the night of the first falling star. It was seen early in the morning, rushing over Winchester eastward, a line of flame high in the atmosphere. Hundreds must have seen it and taken it for an ordinary falling star. It seemed that it fell to earth about one hundred miles east of him.`;
    const originalTextArray = originalText.split(/\s/).filter((eachWord) => {
      return eachWord != '';
    });
    this.originalTextArrayWithStatus = originalTextArray.map((eachWord) => ({
      word: eachWord,
      complete: false,
      correct: false,
    }));
  }
  ngAfterViewInit() {
    console.log('afterviewinit', this.inputField?.nativeElement.value);
  }
  focusTextBox() {
    this.inputField?.nativeElement.focus();
  }
  onTextInput(e: Event) {
    const element = e.target as HTMLInputElement;
    const text = element.value;
    this.inputText = text;
    if (this.lastTypedWord.index === -1) {
      this.scoreService.startTyping();
    }
    //first check if the typed text matches the next text in array

    if (
      this.originalTextArrayWithStatus[this.lastTypedWord.index + 1].word.slice(
        0,
        text.length
      ) === text
    ) {
      this.correct = true;
    } else {
      this.correct = false;
    }

    if (text.slice(-1) === ' ' && text.slice(-2, -1).match(/\S/)) {
      const actualInput = text.substring(0, text.length - 1); // removig the space at the end
      if (text.length > 1) {
        console.log('******************** Space Detected ***************');
        //pushing the word for later use
        this.wordsList.push(actualInput);
        //finish the word speed cycle
        this.wpm = this.scoreService.finishWord(this.wordsList.length).wpm;

        //pushing the word status to the source word array list
        this.originalTextArrayWithStatus[this.lastTypedWord.index + 1] = {
          ...this.originalTextArrayWithStatus[this.lastTypedWord.index + 1],
          complete: true,
          correct:
            this.originalTextArrayWithStatus[this.lastTypedWord.index + 1]
              .word === actualInput
              ? true
              : false, //change later
        };
      }
      this.inputText = '';
      this.lastTypedWord.index += 1;
    }
  }
}
