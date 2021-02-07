const reservedNames = [
  'empty',
  'ajax',
  'banners',
  'config',
  'contact',
  'content',
  'contenthistory',
  'fields',
  'finder',
  'mailto',
  'media',
  'menus',
  'modules',
  'newsfeeds',
  'privacy',
  'search',
  'tags',
  'users',
  'wrapper'
];

const escapeRegExp = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

const alpha_numeric_filter = (string) => {
  const alpha_numeric = Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
  const json_string = JSON.stringify(string)
  let filterd_string = ''

  for (let i = 0; i < json_string.length; i++) {
    let char = json_string[i]
    let index = alpha_numeric.indexOf(char)
    if (index > -1) {
      filterd_string += alpha_numeric[index]
    }
  }

  return filterd_string
};

const removeFirstNum = (str) => {
  while ([1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(parseInt(str.charAt(0))) > -1 || '0' === str.charAt(0)) {
    str = str.substr(1);
  }

  return str;
}

export {removeFirstNum, alpha_numeric_filter, replaceAll, reservedNames };
