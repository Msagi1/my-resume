import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from "@angular/core";

@Component({
    selector: 'app-bio',
    standalone: true,
    imports: [],
    styleUrls: ['./bio.component.css'],
    templateUrl: './bio.component.html',
})
export class BioComponent implements OnInit, AfterViewInit {
    @ViewChild('typingText', { static: false }) typingText!: ElementRef;

    private originalText = `Frontend Engineer passionate about building scalable, performant, and delightful web apps using Angular, TypeScript, JavaScript, HTML5, and CSS3.`;

    constructor() {}

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        // Start typing animation after view is initialized
        setTimeout(() => {
            this.startTypingAnimation();
        }, 1000);
    }

    scrollToProjects(): void {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    private startTypingAnimation(): void {
        if (!this.typingText?.nativeElement) return;

        const element = this.typingText.nativeElement;
        
        const originalHTML = element.innerHTML;
        
        element.innerHTML = '';
        element.classList.add('typing');
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';

        let i = 0;
        const typeSpeed = 30; 

        const typeWriter = () => {
            if (i < plainText.length) {
                element.textContent = plainText.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                element.classList.remove('typing');
                element.innerHTML = originalHTML;
            }
        };

        typeWriter();
    }
}