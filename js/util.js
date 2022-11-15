/**
 * Randomly reorders an array
 * @param {*} array - The array to be reordered
 * @returns - The array in random order
 */
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

/**
 * Remove ^ character and surround the exponent html superscript tag instead
 * @param {*} str - The Big-O complexity
 * @returns - str with ^ removed and the exponent surrounded with an html superscript tag
 */
function toSup(str) {
  idx = str.indexOf("^");
  if (idx === -1) {
    return str;
  }
  str = [...str];
  str.splice(idx, 2, str[idx+1].sup());
  return str.join("");
}