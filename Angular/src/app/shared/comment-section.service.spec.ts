import { TestBed, inject } from '@angular/core/testing';

import { CommentSectionService } from './comment-section.service';

describe('CommentSectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentSectionService]
    });
  });

  it('should be created', inject([CommentSectionService], (service: CommentSectionService) => {
    expect(service).toBeTruthy();
  }));
});
