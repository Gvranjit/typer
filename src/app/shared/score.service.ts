export class ScoreService {
  scores: { wpm: number; cpm: number }[] = [];
  private startTime: number = Date.now();
  private stopTime: number = Date.now();
  startTyping() {
    this.startTime = Date.now();
  }
  finishWord(numberOfWords: number) {
    this.stopTime = Date.now();
    const currentScore = {
      wpm: Math.floor(
        (numberOfWords * 1000 * 60) / (this.stopTime - this.startTime)
      ),
      cpm: 0,
    };
    return currentScore;
  }
  finishTyping(totalNumberOfWords: number) {
    const finalScore = this.finishWord(totalNumberOfWords);
    this.scores.push(finalScore);
    console.log(finalScore);
    return finalScore;
  }
}
