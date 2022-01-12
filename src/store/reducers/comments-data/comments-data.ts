import { CommentsData } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { Comment } from '../../../types/types';

const initialState: CommentsData = {
  comments: [],
};

const commentsData = (state = initialState, action: Actions): CommentsData => {
  switch (action.type) {
    case ActionType.LoadComments:
      return {...state, comments: action.payload as Comment[]};
    default:
      return state;
  }
};

export {commentsData};
