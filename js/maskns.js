function match_mask_sn(mask, number) {
  let pattern = convert_mask_to_pattern(mask);
  return number.match(pattern);
}

lib_simbol_mask = {
  N: "\\d",
  A: "[A-Z]",
  a: "[a-z]",
  X: "[A-Z|\\d]",
  Z: "[\\-|\\_|\\@]",
};

function convert_mask_to_pattern(mask) {
  s = "";
  i = -1;
  c = 0;
  arr = [];
  mask.split("").map((element) => {
    if (s != element) {
      i++;
      c = 1;
      arr[i] = {
        symbol: element,
        count: c,
      };
      s = element;
    } else {
      c++;
      arr[i] = {
        symbol: element,
        count: c,
      };
    }
  });

  let result = "";
  arr.forEach((element) => {
    result += lib_simbol_mask[element.symbol] + "{" + element.count + "}";
  });

  return result;
}
