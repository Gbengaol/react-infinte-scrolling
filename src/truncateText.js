export default (text, length) => {
  return text
    ? text.length > length
      ? `${text.toString().trim().substring(0, length)}...`
      : text.toString().trim()
    : "";
};
