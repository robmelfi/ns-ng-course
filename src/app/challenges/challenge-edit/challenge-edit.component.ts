import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.css']
})
export class ChallengeEditComponent  {
    @Output() input = new EventEmitter<string>();
    challengeDescription: string

    onSetChallenge() {
      //  this.currentChallenge = this.challengeDescription;
      this.input.emit(this.challengeDescription)
    }
}
