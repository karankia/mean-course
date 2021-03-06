import {Component, OnInit, } from '@angular/core';
import { Post } from '../post.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../posts.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component ({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  isLoading = false;
  post: Post;
  form: FormGroup;
  imagePreview: string | ArrayBuffer;
  private mode = 'create';
  private postId: string;


  constructor(public postService: PostService, public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required]}),
      image: new FormControl(null, { validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = { id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
      }
      this.form.setValue({
          title: this.post.title, content: this.post.content
        });
    });
  }

  onAddPost() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    this.form.reset();
  }

  onImageChanged($event: Event) {
    const file = ( event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
