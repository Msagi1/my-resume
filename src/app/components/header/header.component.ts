import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isSticky = false;
    activeSection = 'about'; // Default active section
    private destroy$ = new Subject<void>();
    private isNavigating = false; // Flag to prevent scroll override

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            takeUntil(this.destroy$)
        ).subscribe((event: NavigationEnd) => {
            const fragment = event.urlAfterRedirects.split('#')[1];
            if (fragment) {
                this.activeSection = fragment;
                this.isNavigating = true;
                
                // Allow scroll detection after navigation settles
                setTimeout(() => {
                    this.isNavigating = false;
                }, 1000);
            }
        });
        this.updateActiveSectionFromUrl();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        this.isSticky = window.scrollY > 60;
        
        // Only update active section from scroll if not currently navigating
        if (!this.isNavigating) {
            this.updateActiveSectionFromScroll();
        }
    }

    /**
     * Updates active section based on current URL fragment
     */
    private updateActiveSectionFromUrl(): void {
        const fragment = window.location.hash.substring(1);
        if (fragment) {
            this.activeSection = fragment;
        }
    }

    /**
     * Updates active section based on which section is currently in view
     * This provides better UX as users scroll through the page
     */
    private updateActiveSectionFromScroll(): void {
        const sections = ['about', 'skills', 'projects', 'experience'];
        const scrollPosition = window.scrollY;

        // Check which section is closest to the top of viewport
        let closestSection = 'about';
        let closestDistance = Infinity;

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                const distanceFromTop = Math.abs(rect.top - 100); // 100px buffer for header
                
                if (distanceFromTop < closestDistance) {
                    closestDistance = distanceFromTop;
                    closestSection = section;
                }
            }
        });

        if (this.activeSection !== closestSection) {
            this.activeSection = closestSection;
        }
    }
}