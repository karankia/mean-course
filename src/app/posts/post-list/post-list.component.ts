import {Component} from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts = [
    { title: 'FirstPost', content: 'This is the first post\'s content' },
    { title: 'SecondPost', content: 'This is the second post\'s content' },
    { title: 'ThirdPost', content: 'This is the third post\'s content'},
  ];
}
