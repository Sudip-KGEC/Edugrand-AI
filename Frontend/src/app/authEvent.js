let openAuthModal = null;

export const setAuthHandler = (fn) => {
  openAuthModal = fn;
};

export const triggerAuthModal = () => {
  if (typeof openAuthModal === "function") {
    openAuthModal();
  } else {
    console.warn("Auth handler not initialized yet");
  }
};