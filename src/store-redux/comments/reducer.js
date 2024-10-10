const initialState = {
  data: {},
  waiting: false,
  errors: {
    load: null,
    add: null,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comments/load-success':
      return {
        ...state,
        data: action.payload.data,
        waiting: false,
        errors: { ...state.errors, load: null },
      };

    case 'comments/load-error':
      return {
        ...state,
        data: {},
        waiting: false,
        errors: { ...state.errors, load: action.payload.data },
      };

    case 'comments/add-start':
      return { ...state, waiting: true };

    case 'comments/add-success':
      return {
        ...state,
        data: {
          items: [...state.data.items, action.payload.data],
          count: state.data.count + 1,
        },
        waiting: false,
        errors: {
          ...state.errors,
          add: null,
        },
      };

    case 'comments/add-error':
      return {
        ...state,
        waiting: false,
        errors: {
          ...state.errors,
          add: action.payload.data,
        },
      };

    default:
      return state;
  }
}
