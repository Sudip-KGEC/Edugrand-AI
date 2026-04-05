let openAuthModal;

export const setAuthHandler = (fn) => {
  openAuthModal = fn;
};

export const triggerAuthModal = () => {
  if (openAuthModal) {
    openAuthModal();
  }
};