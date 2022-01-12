import { commentsData } from './comments-data';
import { createMockComments } from '../../../mocks/commentsFake';
import { ActionType } from '../../../types/action';
import { CommentsData } from '../../../types/state';

const mockComments = createMockComments();

describe('Reducer: comments', () => {
  it('should return list comments movie', ()=> {
    const state: CommentsData = {
      comments: [],
    };

    const comments = {
      type: ActionType.LoadComments,
      payload: mockComments,
    };

    expect(commentsData(state, comments))
      .toEqual({
        comments: mockComments,
      });
  });
});
