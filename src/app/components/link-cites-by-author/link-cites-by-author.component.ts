import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-link-cites-by-author',
  templateUrl: './link-cites-by-author.component.html',
  styleUrls: [],
})
export class LinkCitesByAuthorComponent {
  @Input() author: string;
}
