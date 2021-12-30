export const utilService = {
  makeId,
  capitalFirstLetter,
  getTimeFromStamp,
  debounce
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function capitalFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getTimeFromStamp(stamp) {
  const date = new Date(stamp * 1000)
  const minutes = ('0' + date.getMinutes()).substr(-2)
  const seconds = ('0' + date.getSeconds()).substr(-2)
  const appm = date.getHours() >= 12 ? 'PM' : 'AM'
  return `${minutes}:${seconds} ${appm}`
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
