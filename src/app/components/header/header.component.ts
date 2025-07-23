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

    constructor(private router: Router) {}

    ngOnInit(): void {
      // Listen for route changes to update active section
      this.router.events.pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          takeUntil(this.destroy$)
      ).subscribe((event: NavigationEnd) => {
          // Extract fragment from URL
          const fragment = event.urlAfterRedirects.split('#')[1];
          if (fragment) {
              this.activeSection = fragment;
          }
      });

      // Also check on component init
      this.updateActiveSectionFromUrl();
  }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        this.isSticky = window.scrollY > 60;
        
        // Optional: Update active section based on scroll position
        this.updateActiveSectionFromScroll();
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
        const scrollPosition = window.scrollY + 200; // Offset for better detection

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY;
                const elementBottom = elementTop + rect.height;

                if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                    this.activeSection = section;
                    break;
                }
            }
        }
    }
}