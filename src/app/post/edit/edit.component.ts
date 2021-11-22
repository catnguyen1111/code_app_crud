import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import {FormGroup,FormControl,Validators} from '@angular/forms';

import {Post} from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id:number =0;
  post!:Post;
  form !: FormGroup;

  constructor(
    public postService:PostService,
    private router:Router,
    private route : ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data:Post)=>{
      this.post = data;
    });
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }
  get getform(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe(res => {
         console.log('Post updated successfully');
         this.router.navigateByUrl('/post/index');
    })
  }
}
