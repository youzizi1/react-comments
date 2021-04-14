import {INIT_COMMENTS, ADD_COMMENT, DELETE_COMMENT} from './action-types'

export const initComments = comments => ({
  type: INIT_COMMENTS,
  value: comments
})

export const addComment = comment => ({
  type: ADD_COMMENT,
  value: comment
})

export const deleteComment = index => ({
  type: DELETE_COMMENT,
  value: index
})