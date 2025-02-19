let showLoadingInstance = null;

export const setLoadingInstance = (notifier) => {
  showLoadingInstance = notifier;
};

export const showLoading = (isLoading, duration = 2000) => {
  showLoadingInstance?.({ loading:isLoading });
};

