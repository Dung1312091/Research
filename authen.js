function refreshToken() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("New to ken");
    }, 1000);
  });
}

function delay(time, url, isExpired) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isExpired) {
        reject("Expired");
      } else {
        resolve(url);
      }
    }, time);
  });
}

let isExpired = true;
let requestRefreshToken = null;
let hasCall = true;
let tokenExpired = true;
async function requestApi(url) {
  try {
    let data = await delay(2000, url, isExpired);
    return data;
  } catch (error) {
    // console.log({ error });

    let newToken;
    requestRefreshToken = requestRefreshToken
      ? requestRefreshToken
      : refreshToken();
    newToken = await requestRefreshToken;
    isExpired = false;
    requestRefreshToken = null;
    return requestApi(url);
    // console.log("newToken", newToken);
  }
}

async function main() {
  const [data1, data2, data3] = await Promise.all([
    requestApi("data1"),
    requestApi("data2"),
    requestApi("data3"),
  ]);
  console.log({ data1, data2, data3 });
}
main();
