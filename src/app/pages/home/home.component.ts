import { AfterViewInit, Component } from "@angular/core";
import { BioComponent } from "./bio/bio.component";
import { ProjectComponent } from "./projects/projects.component";
import { ActivatedRoute } from "@angular/router";
import { ExperienceComponent } from "../experience/experience.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [BioComponent, ProjectComponent, ExperienceComponent],
    styleUrls: ['./home.component.css'],
    templateUrl: 'home.component.html'
})

export class HomeComponent implements AfterViewInit{
    constructor(private route: ActivatedRoute) {}

    ngAfterViewInit() {
      this.route.fragment.subscribe((fragment) => {
        if (fragment) {
          const el = document.getElementById(fragment);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
}