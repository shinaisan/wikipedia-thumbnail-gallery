const INITIAL_STATE = {
  loading: false,
  keyword: '',
  thumbnails: {},
  error: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'START_SEARCHING_FOR_KEYWORD':
      return {
        loading: true,
        keyword: action.keyword,
        thumbnails: {},
        error: false
      }
    case 'RECEIVED_THUMBNAILS':
      return {
        loading: false,
        keyword: action.keyword,
        thumbnails: action.thumbnails,
        error: false
      }
    case 'ERROR_IN_API':
      return {
        loading: false,
        keyword: action.keyword,
        thumbnails: {},
        error: action.error
      }
    default:
      return state
  }
}

