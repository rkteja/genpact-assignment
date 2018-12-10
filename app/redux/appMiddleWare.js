
const appMiddleWare = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(next);
  }
  return next(action);
};

export default appMiddleWare;
