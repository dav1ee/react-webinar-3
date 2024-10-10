import simplifyErrors from '../../utils/simplify-errors';

export default {
  load: id => {
    return async (dispatch, _, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const response = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        if (response.status >= 200 && response.status < 300) {
          dispatch({
            type: 'comments/load-success',
            payload: { data: response.data.result },
          });
        } else {
          throw new Error(simplifyErrors(response.data.error.data.issues));
        }
      } catch (e) {
        dispatch({
          type: 'comments/load-error',
          payload: { data: e.message },
        });
      }
    };
  },

  add: (_id, _type, text) => {
    return async (dispatch, _, services) => {
      dispatch({ type: 'comments/add-start' });

      try {
        const response = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: { _id, _type },
          }),
        });

        if (response.status >= 200 && response.status < 300) {
          dispatch({
            type: 'comments/add-success',
            payload: { data: response.data.result },
          });
        } else {
          throw new Error(simplifyErrors(response.data.error.data.issues));
        }
      } catch (e) {
        dispatch({
          type: 'comments/add-error',
          payload: { data: e.message },
        });
      }
    };
  },
};
