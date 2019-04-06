export default (str) => {
  const [date = '', time = ''] = str.split('T');

  return `${date} ${time.slice(0, 5)}`;
};
