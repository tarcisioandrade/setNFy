export default function getLocalStorage(key, initial) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return initial;
  }
}
