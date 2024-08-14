import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Output() sidenavClose = new EventEmitter();
    constructor() {}
    ngOnInit() {}
    public onSidenavClose = () => {
        this.sidenavClose.emit();
    }
}
