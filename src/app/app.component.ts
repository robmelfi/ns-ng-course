import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    activeChallenges: string[] = [];

    onChallangeInput(challengeDescription: string) {
        this.activeChallenges.push(challengeDescription);
    }
}
