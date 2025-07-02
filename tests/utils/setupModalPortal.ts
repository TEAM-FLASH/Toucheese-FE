export const setupModalPortal = () => {
  const modalPortal = document.createElement('div');
  modalPortal.setAttribute('id', 'modal-portal');
  document.body.appendChild(modalPortal);
};

export const cleanupModalPortal = () => {
  const modalPortal = document.getElementById('modal-portal');
  if (modalPortal) {
    document.body.removeChild(modalPortal);
  }
};
