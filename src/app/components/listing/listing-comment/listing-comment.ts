import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { RatingsService } from '../../../services/ratings/ratings.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-comment',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './listing-comment.html',
  styleUrl: './listing-comment.css',
})
export class ListingComment implements OnInit {
  listingId!: string;

  averageRating = 0;
  comments: any[] = [];
  loading = true;

  selectedRating = 0;
  newComment = '';
  constructor(
    private route: ActivatedRoute,
    private ratingsService: RatingsService,
    private cdr: ChangeDetectorRef
  ) { }

  replyFormVisible: Record<string, boolean> = {};
  replyContent: Record<string, string> = {};

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Listing ID:', id);
    if (!id) return;

    this.listingId = id;
    this.loadComments();
  }

  loadComments() {
    this.loading = true;
    console.log('Calling API for listingId:', this.listingId);

    this.ratingsService.getListingComments(this.listingId).subscribe({
      next: (res) => {
        console.log('API response:', res);

        this.averageRating = res.averageRating;

        this.comments = [...res.comments];

        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('API error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  submitComment() {
    if (!this.newComment || !this.selectedRating) return;

    this.ratingsService.createComment({
      listingId: this.listingId,
      content: this.newComment,
      score: this.selectedRating
    }).subscribe({
      next: (res) => {
        // add new comment immutably to update UI instantly
        this.comments = [
          {
            id: res.commentId,
            userId: 'currentUser', // replace with actual user id from auth
            content: this.newComment,
            score: this.selectedRating,
            createdAt: new Date(),
            replies: []
          },
          ...this.comments
        ];

        // reset form
        this.newComment = '';
        this.selectedRating = 0;

        // update average rating and total reviews immutably
        const totalScore = this.comments.reduce((sum, c) => sum + (c.score ?? 0), 0);
        const totalCount = this.comments.filter(c => c.score != null).length;
        this.averageRating = totalCount > 0 ? totalScore / totalCount : 0;

        // trigger Angular change detection
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  toggleReplyForm(commentId: string) {
    this.replyFormVisible[commentId] = !this.replyFormVisible[commentId];
  }

  submitReply(parentCommentId: string) {
    const content = this.replyContent[parentCommentId];
    if (!content) return;

    this.ratingsService.createReply({
      listingId: this.listingId,
      parentCommentId: parentCommentId,
      content: content
    }).subscribe({
      next: (res) => {
        // immutable update for Angular change detection
        const parent = this.comments.find(c => c.id === parentCommentId);
        if (parent) {
          parent.replies = [
            ...parent.replies,
            {
              id: res.commentId,
              userId: 'currentUser',
              content,
              score: null,
              createdAt: new Date(),
              replies: []
            }
          ];
        }

        // reset reply form
        this.replyContent[parentCommentId] = '';
        this.replyFormVisible[parentCommentId] = false;

        // force UI refresh
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

}
