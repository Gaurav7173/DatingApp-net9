import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { Gallery, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule, TimeagoModule, DatePipe, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs',{static:true})memberTabs?: TabsetComponent;
  private messageService=inject(MessageService);
  private memberService=inject(MembersService);
  private route=inject(ActivatedRoute);
  member: Member={} as Member;
  images:ImageItem[] = [];
  activeTab?:TabDirective;
  messages:Message[] = [];

  ngOnInit():void {
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'];
        this.member && this.member.photos.map(p => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
        })
      }
    })
    this.route.queryParams.subscribe({next:params => {
        params['tab'] && this.selectTab(params['tab']);
    }
    })


  }

  onUpdateMessages(event: Message) {
    this.messages.push(event);
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      const messagesTab = this.memberTabs.tabs.find(x => x.heading === heading);
      if(messagesTab) messagesTab.active = true;
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0 && this.member) {
      
      this.messageService.getMessageThread(this.member.username)
      .subscribe({
        next:messages=>this.messages=messages
      })
    }
  }

  // loadMember() {
  //   const username = this.route.snapshot.paramMap.get('username');
  //   if(!username) return;
  //   this.memberService.getMember(username).subscribe({
  //     next: member => {
  //       this.member = member;
  //       member.photos.map(p=>{
  //         this.images.push(new ImageItem({src: p.url, thumb: p.url}))
  //       })

  //     }
      
  //   })
  // }


}
