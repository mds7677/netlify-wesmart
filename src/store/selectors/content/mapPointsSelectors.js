export const selectMapPointsData = (state, language) => {
  return state.content?.mapPoints?.data?.[language] || {
    points: {},
    loading: false,
    error: null
  };
};

export const selectMapPoints = (state, language) => selectMapPointsData(state, language).points;

export const selectMapPointsLoading = (state, language) => selectMapPointsData(state, language).loading;

export const selectMapPointsError = (state, language) => selectMapPointsData(state, language).error;
