import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { BioComponent } from "./bio/bio.component";
import { SkillsComponent } from "./skills/skills.component";
import { ProjectComponent } from "./projects/projects.component";
import { ExperienceComponent } from "./experience/experience.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [BioComponent, SkillsComponent, ProjectComponent, ExperienceComponent],
    styleUrls: ['./home.component.css'],
    templateUrl: 'home.component.html'
})

export class HomeComponent implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
      this.route.fragment.pipe(
          takeUntil(this.destroy$)
      ).subscribe((fragment) => {
          if (fragment) {
              const element = document.getElementById(fragment);
              if (element) {
                  element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start' 
                  });
              } else {
                  console.warn(`Section with ID '${fragment}' not found`);
              }
          }
      });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}