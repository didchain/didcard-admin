export const accessData = (state, getters, rootState) => {
  const accessData = {
    accessToken: state.accessToken,
    accessRole: state.accessRole,
    mainAddr: getters['acc/mainAddr'],
  };
  return accessData;
};
