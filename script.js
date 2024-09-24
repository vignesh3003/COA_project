// Function to convert between number systems
function performConversion() {
  const number = document.getElementById("input-number").value;
  const conversionType = document.getElementById("conversion-type").value;
  let result;

  switch (conversionType) {
    case "decimal-binary":
      result = parseInt(number).toString(2);
      break;
    case "binary-decimal":
      result = parseInt(number, 2).toString(10);
      break;
    case "decimal-octal":
      result = parseInt(number).toString(8);
      break;
    case "octal-decimal":
      result = parseInt(number, 8).toString(10);
      break;
    case "decimal-hexadecimal":
      result = parseInt(number).toString(16).toUpperCase();
      break;
    case "hexadecimal-decimal":
      result = parseInt(number, 16).toString(10);
      break;
    case "decimal-gray":
      result = decimalToGray(parseInt(number));
      break;
    case "gray-decimal":
      result = grayToDecimal(number);
      break;
    case "decimal-bcd":
      result = decimalToBCD(parseInt(number));
      break;
    case "bcd-decimal":
      result = BCDtoDecimal(number);
      break;
    case "decimal-excess":
      result = decimalToExcess3(parseInt(number));
      break;
    case "excess-decimal":
      result = excess3ToDecimal(number);
      break;
    default:
      result = "Invalid conversion type";
  }

  document.getElementById("conversion-result").innerText = result;
}

// Gray Code conversion logic
function decimalToGray(decimal) {
  return (decimal ^ (decimal >> 1)).toString(2);
}

function grayToDecimal(gray) {
  let binary = parseInt(gray, 2);
  let decimal = binary;
  while ((binary >>= 1)) decimal ^= binary;
  return decimal;
}

// BCD Conversion Logic
function decimalToBCD(num) {
  return num
    .toString()
    .split("")
    .map((digit) => {
      return parseInt(digit).toString(2).padStart(4, "0");
    })
    .join(" ");
}

function BCDtoDecimal(bcd) {
  return bcd
    .split(" ")
    .map((binary) => {
      return parseInt(binary, 2).toString(10);
    })
    .join("");
}

// Excess-3 Code conversion logic
function decimalToExcess3(num) {
  return (num + 3).toString(2);
}

function excess3ToDecimal(excess) {
  return parseInt(excess, 2) - 3;
}

// Binary arithmetic operations
function performOperation() {
  const num1 = document.getElementById("binary-num1").value;
  const num2 = document.getElementById("binary-num2").value;
  const operationType = document.getElementById("operation-type").value;
  let result;

  if (operationType === "addition") {
    result = (parseInt(num1, 2) + parseInt(num2, 2)).toString(2);
  } else if (operationType === "subtraction") {
    result = (parseInt(num1, 2) - parseInt(num2, 2)).toString(2);
  } else if (operationType === "multiplication") {
    result = (parseInt(num1, 2) * parseInt(num2, 2)).toString(2);
  } else if (operationType === "division") {
    result = Math.floor(parseInt(num1, 2) / parseInt(num2, 2)).toString(2);
  }

  document.getElementById("operation-result").innerText = result;
}

// BCD arithmetic operations
function performBCDOperation() {
  const bcd1 = document.getElementById("bcd-num1").value;
  const bcd2 = document.getElementById("bcd-num2").value;
  const operationType = document.getElementById("bcd-operation").value;
  let result;

  // Implement BCD addition and subtraction logic
  const dec1 = BCDtoDecimal(bcd1);
  const dec2 = BCDtoDecimal(bcd2);

  if (operationType === "bcd-addition") {
    result = decimalToBCD(parseInt(dec1) + parseInt(dec2));
  } else if (operationType === "bcd-subtraction") {
    result = decimalToBCD(parseInt(dec1) - parseInt(dec2));
  }

  document.getElementById("bcd-result").innerText = result;
}
