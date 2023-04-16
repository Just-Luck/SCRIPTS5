//*Создаем класс для элементов нашего дерева
class Node {
  constructor(value, char = null) {
    this.value = value;
    this.char = char;
    this.left = null;
    this.right = null;
  }
}

let endSymbol = `●`;
function HuffmanEncoding(str) {
  str += endSymbol; //*Добавляем end символ
  let alphabet = []; //*Массив алфавита
  for (char of str) alphabet[char] = (alphabet[char] || 0) + 1; //* Определяем алфавит
  for (char in alphabet) {
    //* Преобразуем алфавит с конструктором Node
    alphabet.push(new Node(alphabet[char], char)); //*Добавляем элемент в массив, тип Node
    delete alphabet[char]; //*Удаляем тот символ, который мы обработали
  }
  //*Строим дерево
  while (alphabet.length > 1) {
    alphabet.sort((a, b) => b.value - a.value);
    let left = alphabet.pop(); //*Левая ветвь
    let right = alphabet.pop(); //*Правая ветвь
    let parent = new Node(left.value + right.value); //*Код пути до этих элементов
    parent.left = left; //* Присваиваем новый элемент слева
    parent.right = right; //* Присваиваем новый элемент справа
    alphabet.push(parent);
  }
  //?alphabet - стал вершиной дерева Хофмана, те главным объектом с ветками

  const codes = {}; //*Массив с кодами символов
  function encode(node, code = "") {
    if (!node.left && !node.right) {
      //*Если это конец ветки, то присвоить значение для этого символа
      codes[node.char] = code;
      return;
    }
    //?Left - 0 Right - 1
    encode(node.left, code + "0"); //*Идем дальше по ЛЕВОЙ ветке
    encode(node.right, code + "1"); //*Идем дальше по ПРАВОЙ ветке
  }
  encode(alphabet[0]);

  let encodedStr = "";
  //*Собираем всю сжатую строку, используя коды букв
  for (char of str) encodedStr += codes[char];

  return { encodedStr, codes };
}

function HuffmanDecoding(encodedStr, codes) {
  let decodedStr = ""; //*Результат декодирования
  let code = ""; //*Текущий код
  for (digit of encodedStr) {
    code += digit; //* Добавляем символ к коду
    if (codes[endSymbol] == code) break; //*Если это end символ, то прекращаем декодирование
    for (char in codes) {
      if (codes[char] === code) {
        //* Если нашло совпадающий символ, то декодируем
        decodedStr += char; //*Добавляем символ к результату декодирования
        code = ""; //* Очищаем код
        break;
      }
    }
  }
  return decodedStr;
}

//*Экспортируем функции кодирования и декодирования
module.exports = {
  HuffmanEncoding,
  HuffmanDecoding,
};
