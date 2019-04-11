function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retry(functionToTry, maxAttempts = 3, delay = 1000) {
  return new Promise(async (resolve, reject) => {
    try {
      functionToTry();
      resolve();
    } catch (error) {
      const remainingAttempts = maxAttempts - 1;
      if (remainingAttempts > 0) {
        await sleep(delay);
        await retry(functionToTry, remainingAttempts, delay);
        resolve();
      }

      reject(error);
    }
  });
}

module.exports = retry;
