let openAuthModal = null;

export const setAuthHandler = (fn) => {
  openAuthModal = fn;
};

export const triggerAuthModal = () => {
  if (typeof openAuthModal === "function") {
    openAuthModal();
  }
};