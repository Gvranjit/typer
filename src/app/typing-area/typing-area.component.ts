import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typing-area',
  templateUrl: './typing-area.component.html',
  styleUrls: ['./typing-area.component.scss'],
})
export class TypingAreaComponent implements OnInit {
  constructor() {}

  public originalTextArrayWithStatus: {
    word: string;
    complete: boolean;
    correct: boolean;
  }[] = [];

  inputText: string = '';
  wordsList: string[] = [];
  lastTypedWord = { index: -1 };
  correct = true;

  ngOnInit(): void {
    const originalText: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Amet consectetur
      adipiscing elit duis tristique sollicitudin nibh. Tincidunt praesent
      semper feugiat nibh sed. Arcu odio ut sem nulla pharetra. Congue eu
      consequat ac felis donec et odio. Dignissim enim sit amet venenatis urna.
      Ultrices sagittis orci a scelerisque purus semper eget. Lectus arcu
      bibendum at varius vel pharetra. Neque viverra justo nec ultrices dui
      sapien. Vitae ultricies leo integer malesuada nunc vel risus. Velit
      scelerisque in dictum non consectetur a erat nam. Pulvinar sapien et
      ligula ullamcorper malesuada. Elementum facilisis leo vel fringilla est.
      Porta lorem mollis aliquam ut porttitor leo. Tincidunt ornare massa eget
      egestas purus viverra accumsan in nisl. Libero justo laoreet sit amet.`;
    const originalTextArray = originalText.split(/\s/).filter((eachWord) => {
      return eachWord != '';
    });
    this.originalTextArrayWithStatus = originalTextArray.map((eachWord) => ({
      word: eachWord,
      complete: false,
      correct: false,
    }));
  }

  onTextInput(e: Event) {
    const element = e.target as HTMLInputElement;
    const text = element.value;
    this.inputText = text;

    //first check if the typed text matches the next text in array
    console.log(
      this.originalTextArrayWithStatus[
        this.lastTypedWord.index + 1
      ].word.substring(0, text.length)
    );
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
        console.log('SPACE DETEcted');
        //pushing the word for later use
        this.wordsList.push(actualInput);
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
      console.log(this);
    }
  }
}
