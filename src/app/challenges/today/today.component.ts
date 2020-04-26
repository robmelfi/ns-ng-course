import { Component, OnInit } from '@angular/core';
import { Day, DayStatus } from '../day.model';
import { Subscription } from 'rxjs';
import { ChallengeService } from '../challenge.service';

@Component({
    selector: 'ns-today',
    templateUrl: './today.component.html',
    styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
    currentDay: Day;
    private curChallengeSub: Subscription;

    constructor(private challengeService: ChallengeService) { }

    ngOnInit(): void {
        this.curChallengeSub = this.challengeService.currentChallenge.subscribe(
            challenge => {
                if (challenge) {
                    this.currentDay = challenge.currentDay;
                }
            }
        );
    }

    onActionSelected(action: DayStatus) {
        this.challengeService.updateDayStatus(this.currentDay.dayInMonth, action);
    }

    ngOnDestroy() {
        if (this.curChallengeSub) {
            this.curChallengeSub.unsubscribe();
        }
    }

}
