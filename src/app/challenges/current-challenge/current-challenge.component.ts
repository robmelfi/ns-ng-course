import { Component, ViewContainerRef, OnInit } from "@angular/core";
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "~/app/shared/ui/ui.service";
import { Challenge } from "../challenge.model";
import { Subscription } from "rxjs";
import { ChallengeService } from "../challenge.service";

@Component({
	selector: 'ns-current-challenge',
	templateUrl: './current-challenge.component.html',
	styleUrls: [
		'./_current-challenge.component.common.scss',
		'./current-challenge.component.scss',
	],
	moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit {
	weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	currentChallenge: Challenge;
	private curChallengeSub: Subscription;

	constructor(
		private modalDialog: ModalDialogService,
		private vcRef: ViewContainerRef,
		private uiService: UIService,
		private challengeService: ChallengeService
	) { }

	ngOnInit(): void {
		this.curChallengeSub = this.challengeService.currentChallenge.subscribe(
			challenge => {
				this.currentChallenge = challenge;
			}
		);
	}

	getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
		const startRow = 1;
		const weekRow = Math.floor(index / 7);
		const firstWeekDayOfMonth = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			1
		).getDay();
		const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

		return startRow + weekRow + irregularRow;
	}

	onChangeStatus() {
		this.modalDialog.showModal(DayModalComponent, {
			fullscreen: true,
			viewContainerRef: this.uiService.getRootVCRef()
				? this.uiService.getRootVCRef()
				: this.vcRef,
			context: { date: new Date() }
		}).then((action: string) => {
			console.log(action);
		});
	}

	ngOnDestroy() {
		if (this.curChallengeSub) {
			this.curChallengeSub.unsubscribe();
		}
	}
}
