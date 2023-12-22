import { useEffect, useState } from "react";

const RNConverter = () => {
  const [number, setNumber] = useState("");
  const [romanNumeral, setRomanNumeral] = useState();

  useEffect(() => {
    convertToRoman(number);
  }, [number]);

  // TODO: Create test for this function
  const convertToRoman = (num) => {
    let result = "";
    let quotient;

    if (num >= 1000) {
      quotient = ~~(num / 1000);
      result += "M".repeat(quotient);
      num = num % 1000;
    }

    if (num < 1000 && num >= 900) {
      result += "CM";
      num = num % 100;
    }

    if (num < 900 && num >= 500) {
      result += "D";
      quotient = ~~((num - 500) / 100);
      result += "C".repeat(quotient);
      num = num % 100;
    }

    if (num < 500 && num >= 100) {
      if (num >= 400) {
        result += "CD";
      } else {
        quotient = ~~(num / 100);
        result += "C".repeat(quotient);
      }
      num = num % 100;
    }

    if (num < 100 && num >= 90) {
      result += "XC";
      num = num % 10;
    }

    if (num < 90 && num >= 50) {
      result += "L";
      quotient = ~~((num - 50) / 10);
      result += "X".repeat(quotient);
      num = num % 10;
    }

    if (num < 50 && num >= 10) {
      if (num >= 40) {
        result += "XL";
      } else {
        quotient = ~~(num / 10);
        result += "X".repeat(quotient);
      }
      num = num % 10;
    }

    if (num === 9) {
      result += "IX";
    }

    if (num < 9 && num >= 5) {
      result += "V";
      quotient = num - 5;
      result += "I".repeat(quotient);
    }

    if (num < 5) {
      if (num === 4) {
        result += "IV";
      } else {
        result += "I".repeat(num);
      }
    }
    setRomanNumeral(result);
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  return (
    <div>
      <p>{romanNumeral}</p>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        onKeyDown={preventMinus}
        min="0"
      />
    </div>
  );
};

export default RNConverter;
