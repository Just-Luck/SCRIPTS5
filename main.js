const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf8");

const { HuffmanEncoding, HuffmanDecoding } = require("./Huffman.js");

main();
async function main() {
  clear(); //*Удаляем файлы от прошлого кодирования
  let { encodedStr, codes } = HuffmanEncoding(input);
  fs.writeFile("output.txt", encodedStr, (err) => {
    if (err) return console.log("❗Error | encoded string");
    console.log("✅ Success | encoded string");
  });
  fs.writeFile("alphabet.txt", JSON.stringify(codes), (err) => {
    if (err) return console.log("❗Error | alphabet");
    console.log("✅ Success | alphabet");
  });

  let decodedStr = HuffmanDecoding(encodedStr, codes);
  if (input === decodedStr) console.log("✅ Success | result");
  else console.log("❗Error | result");
}

function clear() {
  fs.unlinkSync("output.txt");
  fs.unlinkSync("alphabet.txt");
}
