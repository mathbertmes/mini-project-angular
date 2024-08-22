import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() public sideNavToggle = new EventEmitter();
    
    constructor() {}
    ngOnInit(): void {}
    onToggleSidenav() {
        // Open and close side nav bar
        this.sideNavToggle.emit();
    }
}
