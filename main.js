const fs = require("fs"); //* Модуль для работы с файлами
let input = fs.readFileSync("input.txt", "utf8"); //*Считываем input файл

const { HuffmanEncoding, HuffmanDecoding } = require("./Huffman.js"); //*Импортируем функции

main();
async function main() {
  console.log(input);
  clear(); //*Удаляем файлы от прошлого кодирования
  let { encodedStr, codes } = HuffmanEncoding(input); //*Результат кодирования
  fs.writeFileSync("output.txt", encodedStr);
  fs.writeFileSync("alphabet.txt", JSON.stringify(codes));

  let decodedStr = HuffmanDecoding(encodedStr, codes); //*Результат декодирования
  if (input === decodedStr) console.log("✅ Success | result");
  //*Проверка совпадают ли изначальная строка и декодированная строка
  else console.log("❗Error | result");

  extraFunction(); //*Энтропия input | Энтропия output | Степень сжатия
  decodeFromFile(); //*Декодирование из файла
}

function clear() {
  fs.unlinkSync("output.txt");
  fs.unlinkSync("alphabet.txt");
}

function decodeFromFile() {
  let alphabet = JSON.parse(fs.readFileSync("alphabet.txt", "utf8"));
  let output = fs.readFileSync("output.txt", "utf8");
  let res = HuffmanDecoding(output, alphabet);
  console.log(res);
}

function extraFunction() {
  let output = fs.readFileSync("output.txt", "utf8");
  console.log(`input Entrophi = `, Entrophi(input));
  console.log(`output Entrophi = `, Entrophi(output));
  console.log(`Compression = `, Compression(input, output), "%");
}

function Entrophi(file) {
  let alphabet = []; //*Массив алфавита
  for (char of file) alphabet[char] = (alphabet[char] || 0) + 1;
  let length = file.length;

  let res = 0;
  for (symbol in alphabet) {
    probability = alphabet[symbol] / length;
    res += -probability * Math.log(probability);
  }
  return res.toFixed(5);
}

function Compression(file1, file2) {
  const inputSize = Buffer.byteLength(file1, "utf8"); //* Размер исходной строки в байтах
  const compressedSize = Buffer.byteLength(file2, "binary") / 8; //* Размер сжатой строки в байтах
  let compressionRatio = (1 - compressedSize / inputSize) * 100; //* Определение уровня сжатия
  return compressionRatio.toFixed(5);
}
