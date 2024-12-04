let E = x => new ExpantaNum(x);

function performOperation(operation) {
  const num1 = E(document.getElementById("num1").value);
  const num2 = E(document.getElementById("num2").value);
  let result;

  switch (operation) {
    case 'add':
      result = num1.add(num2);
      break;
    case 'subtract':
      result = num1.sub(num2);
      break;
    case 'multiply':
      result = num1.mul(num2);
      break;
    case 'divide':
      result = num1.div(num2);
      break;
    case 'exponentiate':
      result = num1.pow(num2);
      break;
    case 'tetrate':
      result = num1.tetr(num2);
      break;
    case 'pentate':
      result = num1.pentate(num2);
      break;
    case 'hexate':
      result = hexate(num1, num2);
      break;
    default:
      result = E(0);
  }

  document.getElementById("result").textContent = `Result: ${notate(result, 2)}`;
}

function notate(expnum, fp) {
  const exp = E(expnum);

  // Case for numbers smaller than 1e6
  if (exp.lt("1e6")) {
    return exp.toNumber().toFixed(fp);
  
  // Case for numbers between 1e6 and 10^6
  } else if (exp.lt("ee6")) {
    const base = exp.div(E(10).pow(exp.log10().floor())).toNumber().toFixed(2);
    const exponent = exp.log10().floor();
    return base + "e" + exponent;
  
  // Case for numbers between e^x and 10^50
  } else if (exp.slog(10).lt(1000000000000000) && exp.slog(10).gte(5)) { // Change here: only apply custom e notation if 5 or more e's
    const count = Math.floor(exp.slog(10));
    return "e(" + count + ")" + 1
  } else if (exp.lt("10^^1000000000000000")) {
    return "10^^" + notate(exp.slog(10), fp);
  } else {
    return exp.toHyperE();
  }
}
function hex(num1, num2) {
  let result = num1;
  for (let i = 1; i < num2.toNumber(); i++) {
    result = result.pent(num1);
  }
  return result;
}
