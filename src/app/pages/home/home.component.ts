import { Component } from "@angular/core";
import { BioComponent } from "./bio/bio.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [BioComponent],
    styleUrls: ['./home.component.css'],
    templateUrl: 'home.component.html'
})

export class HomeComponent{}