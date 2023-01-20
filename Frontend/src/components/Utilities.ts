function pearsonCorrelation(x:number[], y:number[]) {
  // Ensure that both arrays have the same length
  if (x.length !== y.length) {
    throw new Error('Arrays have different lengths');
  }
  
  // Calculate the means of the arrays
  const xMean = x.reduce((a, b) => a + b, 0) / x.length;
  const yMean = y.reduce((a, b) => a + b, 0) / y.length;
  
  // Calculate the sum of squares for the arrays
  const xSumOfSquares = x.reduce((sum, value) => sum + Math.pow(value - xMean, 2), 0);
  const ySumOfSquares = y.reduce((sum, value) => sum + Math.pow(value - yMean, 2), 0);
  
  // Calculate the sum of products for the arrays
  let sumOfProducts = 0;
  for (let i = 0; i < x.length; i++) {
    sumOfProducts += (x[i] - xMean) * (y[i] - yMean);
  }
  
  // Calculate the Pearson correlation
  return sumOfProducts / Math.sqrt(xSumOfSquares * ySumOfSquares);
}

export {pearsonCorrelation}