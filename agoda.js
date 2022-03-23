const fetch = require("node-fetch");
const fs = require("fs-extra");
const readline = require("readline-sync");
const cheerio = require("cheerio");
const random = require("random-name");
const delay = require("delay");

const keyCaptcha = readline.question("[+] Input Apikey 2Captcha : ");
var password = `rangga123`;

const randstr = (length) =>
  new Promise((resolve, reject) => {
    var text = "";
    var possible =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
  });

const functionGetTokenAction = (sitekey) =>
  new Promise((resolve, reject) => {
    fetch(
      `http://2captcha.com/in.php?key=${keyCaptcha}&method=userrecaptcha&version=v2&action=action&min_score=0.3
    &googlekey=${sitekey}&pageurl=https://www.agoda.com/id-id/signup?targeturl=%2Fid-id%2F`,
      {
        method: "get",
      }
    )
      .then((res) => res.text())
      .then((text) => {
        resolve(text);
      })
      .catch((err) => reject(err));
  });
const functionheaders = (token) =>
  new Promise((resolve, reject) => {
    fetch("https://www.agoda.com", {
      method: "GET",
      redirect: "manual",
    })
      .then(async (res) => {
        const $ = cheerio.load(await res.text());
        const result = res.headers.raw()["set-cookie"];

        resolve(result);
      })
      .catch((err) => reject(err));
  });
const functionGetRealTokenAction = (id) =>
  new Promise((resolve, reject) => {
    fetch(
      `http://2captcha.com/res.php?key=${keyCaptcha}&action=get&json=1&id=${id}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((text) => {
        resolve(text);
      })
      .catch((err) => reject(err));
  });

const functionRegist = (resCaptcha, email, name) =>
  new Promise((resolve, reject) => {
    const bodys = {
      credentials: {
        username: email,
        password: password,
        authType: "email",
      },
      firstName: random.first(),
      lastName: random.last(),
      newsLetter: true,
      captchaVerifyInfo: {
        captchaType: "recaptcha",
        captchaResult: {
          recaptchaToken: resCaptcha,
        },
      },
    };

    fetch("https://www.agoda.com/ul/api/v1/signup", {
      method: "POST",
      body: JSON.stringify(bodys),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Host: "www.agoda.com",
        Origin: "https://www.agoda.com",
        "UL-App-Id": "mspa",
        "UL-Fallback-Origin": "https://www.agoda.com",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Mobile Safari/537.36",
      },
    })
      .then(async (res) => {
        const $ = cheerio.load(await res.text());
        const result = res.headers.raw()["set-cookie"];

        resolve(result);
      })
      .catch((err) => reject(err));
    // .then((res) => res.json())
    // .then((result) => {
    //   resolve(result);
    // })
    // .catch((err) => reject(err));
  });

const functionClaimApk = (token) =>
  new Promise((resolve, reject) => {
    fetch(
      "https://www.agoda.com/app/agodacashcampaign?campaignToken=94e19cf56828527a714e36a3cc38826cbbee36b9&refreshOnBack&view=nativeapp",
      {
        redirect: "manual",
        headers: {
          Cookie: `token=${token};`,
        },
      }
    )
      .then((res) => res.text())
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });
const functionClaimApk2 = (token) =>
  new Promise((resolve, reject) => {
    fetch(
      "https://www.agoda.com/app/agodacashcampaign?campaignToken=94e19cf56828527a714e36a3cc38826cbbee36b9&refreshOnBack&view=nativeapp",
      {
        redirect: "manual",
        headers: {
          Cookie: `token=${token};`,
        },
      }
    )
      .then((res) => res.text())
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });

const functionClaimWeb = (token) =>
  new Promise((resolve, reject) => {
    fetch(
      "https://www.agoda.com/id-id/app/agodacashcampaign?campaignToken=4af9e40d70c640465b3e91ba39771377d3679264&refreshOnBack=",
      {
        redirect: "manual",
        headers: {
          Cookie: `token=${token};`,
        },
      }
    )
      .then((res) => res.text())
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });
function a(index) {
  (async () => {
    for (var i = 0; i < 1; i++) {
      const main = await functionheaders();

      try {
        const email = `${random.first()}${await randstr(
          6
        )}@gmail.com`.toLowerCase();

        console.log(`Email : ${email}`);

        const linkAccess = "https://www.agoda.com/";
        const actionToken = await functionGetTokenAction(
          "6Lf9C3IdAAAAAIs6stqpffrA9YdYh6c354db2e_H"
        );
        const requestId = actionToken.split("|")[1];
        console.log("[+] waiting Solved Capctha");
        let resultActionToken = {
          request: "",
        };
        do {
          resultActionToken = await functionGetRealTokenAction(requestId);
          // console.log(resultActionToken);
        } while (resultActionToken.request === "CAPCHA_NOT_READY");

        const theRealActionToken = resultActionToken.request;
        const regist = await functionRegist(theRealActionToken, email);
        if (regist[0].includes("token")) {
          const token = regist[0].split(";")[0].split("ul.token=")[1];
          // console.log("[+] " + token);
          await delay(5000);
          let claimApk;
          do {
            claimApk = await functionClaimApk(token);
            const ceker = claimApk.split("");
            validasi = ceker.length;
          } while (validasi == 0);

          if (claimApk) {
            console.log("[+] Claim Apk success");
            await delay(5000);

            let claimWeb;
            do {
              claimWeb = await functionClaimWeb(token);
              const ceker = claimWeb.split("");
              validasi = ceker.length;
            } while (validasi == 0);
            if (claimWeb) {
              console.log("[+] Claim Web success");

              await delay(5000);
              const claim = claimWeb
                .split(" window.agodaCashCampaignPageParams = ")[1]
                .split("</script>")[0];
              const data = JSON.parse(`${claim}`);
              // console.log(data);
              const resultsaldo = data["availableBalance"];
              console.log("[+] Saldo Account Rp " + resultsaldo);
              await fs.appendFile(
                "agoda-account.txt",
                `${email}| ${password} | Rp ${resultsaldo}` + "\r\n",
                (err) => {
                  if (err) throw err;
                }
              );
            } else {
              console.log("[!] Claim web gagal\n");
            }
          } else {
            console.log("[!] Claim apk gagal\n");
          }
        } else {
          console.log("[!] Regist gagal\n");
        }
      } catch (e) {
        console.log("[!] Ada Yang Error ");
      }
    }
  })();
}
(async () => {
  console.log(`
           AGODA: Auto Create & Claim
           `);
  var jumlahbrowser = readline.question("Jumlah Akun : ");
  var hh = parseFloat(jumlahbrowser) - 1;
  for (let index = 0; index < jumlahbrowser; index++) {
    a(index);
  }
})();
