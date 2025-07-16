import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  isLearning?: boolean;
  description?: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {


  skillCategories: SkillCategory[] = [
    {
      title: 'Programming Languages & Technologies',
      icon: 'code',
      skills: [
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'HTML' },
        { name: 'CSS' },
        { name: 'SCSS' }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      icon: 'web',
      skills: [
        { name: 'AngularJS' },
        { name: 'Angular 8' },
        { name: 'Angular 11' },
        { name: 'Angular Material' },
        { name: 'Bootstrap' },
        { name: 'React', isLearning: true, description: 'Built a simple project, continuing to learn' }
      ]
    },
    {
      title: 'Database & Backend',
      icon: 'storage',
      skills: [
        { name: 'SQL' },
        { name: 'MySQL' }
      ]
    },
    {
      title: 'Tools & Version Control',
      icon: 'build',
      skills: [
        { name: 'Git' },
        { name: 'GitHub' }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}