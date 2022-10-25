import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { NgxGalleryOptions,NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  member:Member;

  constructor(private memberservice:MembersService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMembers();
    this.galleryOptions =[{
      width:'500px',
      height:'500px',
      imageAnimation:NgxGalleryAnimation.Slide,
      preview:false,
      imagePercent:100,
      thumbnailsColumns:4
    }]
   
  }
  getImage():NgxGalleryImage[]{
    const galleryimage=[];
    for(const photo of this.member.photos)
    {
      galleryimage.push({
        small:photo?.url,
        medium:photo?.url,
        high:photo?.url
      })
    }

    return galleryimage;
  }

  loadMembers()
  {
    this.memberservice.getmember(this.route.snapshot.paramMap.get('username')).subscribe(res=>{
          this.member=res;   
          this.galleryImages = this.getImage();
    });
  }

}
