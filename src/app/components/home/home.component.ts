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
    templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // Different scroll offsets for each section
    private sectionOffsets: { [key: string]: number } = {
        'about': 90,
        'skills': 90,
        'projects': 90,
        'experience': 140 
    };

    constructor(private route: ActivatedRoute) {}

    ngAfterViewInit(): void {
        this.route.fragment.pipe(
            takeUntil(this.destroy$)
        ).subscribe((fragment) => {
            if (fragment) {
                setTimeout(() => {
                    this.scrollToSection(fragment);
                }, 100); // Small delay to ensure DOM is ready
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Scroll to section with custom offset for each section
     */
    private scrollToSection(sectionId: string): void {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = this.sectionOffsets[sectionId] || 90;
            const elementPosition = element.offsetTop - offset;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        } else {
            console.warn(`Section with ID '${sectionId}' not found`);
        }
    }
}