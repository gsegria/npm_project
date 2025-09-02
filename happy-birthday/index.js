// index.js
import chalk from "chalk";
import figlet from "figlet";

// 輸出大字藝術字
figlet("Happy Birthday!", (err, data) => {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }

  console.log(chalk.magentaBright(data));
  console.log(chalk.yellow("🎂 🎉 祝你生日快樂！ 🎉 🎂"));
});
