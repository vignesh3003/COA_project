function performConversion() {
  const inputElement = document.getElementById("input-number");
  const number = inputElement.value.trim();
  const conversionType = document
    .getElementById("conversion-type")
    .value.trim();
  let result;

  inputElement.style.border = "";

  if (!number) {
    inputElement.style.border = "2px solid #f14343";
    return;
  }

  try {
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
      // New cases...
      case "binary-octal":
        result = parseInt(number, 2).toString(8);
        break;
      case "binary-hexadecimal":
        result = parseInt(number, 2).toString(16).toUpperCase();
        break;
      case "octal-binary":
        result = parseInt(number, 8).toString(2);
        break;
      case "octal-hexadecimal":
        result = parseInt(number, 8).toString(16).toUpperCase();
        break;
      case "hexadecimal-binary":
        result = parseInt(number, 16).toString(2);
        break;
      case "hexadecimal-octal":
        result = parseInt(number, 16).toString(8);
        break;
      // Existing special cases...
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

    if (result === "NaN" || result === "Invalid conversion type") {
      throw new Error("Invalid input for the selected conversion");
    }

    document.getElementById("conversion-result").innerText = result;
  } catch (error) {
    inputElement.style.border = "2px solid #f14343";
    console.warn(error)
  }
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
  const num1Element = document.getElementById("binary-num1");
  const num2Element = document.getElementById("binary-num2");
  const num1 = num1Element.value.trim();
  const num2 = num2Element.value.trim();
  const operationType = document.getElementById("operation-type").value.trim();
  let result;

  num1Element.style.border = "";
  num2Element.style.border = "";

  if (!num1 || !num2) {
    if (!num1) num1Element.style.border = "2px solid #f14343";
    if (!num2) num2Element.style.border = "2px solid #f14343";
    return;
  }

  try {
    if (!/^[01]+$/.test(num1) || !/^[01]+$/.test(num2)) {
      throw new Error("Invalid binary number(s)");
    }

    if (operationType === "addition") {
      result = (parseInt(num1, 2) + parseInt(num2, 2)).toString(2);
    } else if (operationType === "subtraction") {
      result = (parseInt(num1, 2) - parseInt(num2, 2)).toString(2);
    } else if (operationType === "multiplication") {
      result = (parseInt(num1, 2) * parseInt(num2, 2)).toString(2);
    } else if (operationType === "division") {
      if (parseInt(num2, 2) === 0) {
        throw new Error("Division by zero");
      }
      result = Math.floor(parseInt(num1, 2) / parseInt(num2, 2)).toString(2);
    }

    document.getElementById("operation-result").innerText = result;

  } catch (error) {
    num1Element.style.border = "2px solid #f14343";
    num2Element.style.border = "2px solid #f14343";
    console.warn(error)
  }

}

// BCD arithmetic operations
function performBCDOperation() {
  const bcd1Element = document.getElementById("bcd-num1");
  const bcd2Element = document.getElementById("bcd-num2");
  const bcd1 = bcd1Element.value.trim();
  const bcd2 = bcd2Element.value.trim();
  const operationType = document.getElementById("bcd-operation").value.trim();
  let result;

  bcd1Element.style.border = "";
  bcd2Element.style.border = "";

  if (!bcd1 || !bcd2) {
    if (!bcd1) bcd1Element.style.border = "2px solid #f14343";
    if (!bcd2) bcd2Element.style.border = "2px solid #f14343";
    return;
  }
  try {
    // Validate BCD input
    if (!/^(\d{4}\s*)+$/.test(bcd1) || !/^(\d{4}\s*)+$/.test(bcd2)) {
      throw new Error("Invalid BCD number(s)");
    }

    const dec1 = BCDtoDecimal(bcd1);
    const dec2 = BCDtoDecimal(bcd2);

    if (operationType === "bcd-addition") {
      result = decimalToBCD(parseInt(dec1) + parseInt(dec2));
    } else if (operationType === "bcd-subtraction") {
      result = decimalToBCD(parseInt(dec1) - parseInt(dec2));
    }

    document.getElementById("bcd-result").innerText = result;
    
  } catch (error) {
    bcd1Element.style.border = "2px solid #f14343";
    bcd2Element.style.border = "2px solid #f14343";
    console.warn(error)
  }
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));

  const selectedSection = document.getElementById(sectionId);
  selectedSection.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  showSection("conversion-section");
});
