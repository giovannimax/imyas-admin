const loadCache = function(id) {
  try {
    return window.localStorage.getItem(id, null);
  } catch (err) {
    //
    console.error(err);
  }
};

const saveCache = function(id, state) {
  try {
    window.localStorage.setItem(id, state);
  } catch (err) {
    //
    console.error(err);
  }
};

const clearCache = function(id) {
  window.localStorage.removeItem(id);
};

export default {
  load: loadCache,
  save: saveCache,
  clear: clearCache
};

