const getColumnCount = (element) => {
  return window.getComputedStyle(element).getPropertyValue('grid-template-columns').split(' ').length;
};

export default getColumnCount;
