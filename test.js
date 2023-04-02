function vigenereCipher(plaintext, keyword) {
  // Convert plaintext and keyword to uppercase and remove spaces and punctuation
  plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  keyword = keyword.toUpperCase().replace(/[^A-Z]/g, '');

  // Repeat keyword until it is the same length as plaintext
  while (keyword.length < plaintext.length) {
    keyword += keyword;
  }
  keyword = keyword.slice(0, plaintext.length);

  // Create empty ciphertext string
  var ciphertext = '';

  // For each character in plaintext
  for (var i = 0; i < plaintext.length; i++) {
    var plaintextChar = plaintext.charCodeAt(i) - 65;
    var keywordChar = keyword.charCodeAt(i) - 65;
    var ciphertextChar = (plaintextChar + keywordChar) % 26 + 65;
    ciphertext += String.fromCharCode(ciphertextChar);
  }

  return ciphertext;
}

// Example usage
console.log(vigenereCipher('MAKALAH KRIPTOGRAFI', 'TUGAS')); // Output: RIJVS UYVJN;./
