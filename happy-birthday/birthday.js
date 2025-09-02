// birthday.js
import chalk from "chalk";
import figlet from "figlet";
import chalkAnimation from "chalk-animation";

// 畫大字
figlet("Happy Birthday!", (err, data) => {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }

  // 動態彩虹文字
  const rainbow = chalkAnimation.rainbow(data);

  // 3 秒後停止動畫，印出祝福
  setTimeout(() => {
    rainbow.stop(); // 停止動畫
    console.log(chalk.yellow("🎂 🎉 祝你生日快樂 🎉 🎂"));
    console.log(chalk.green("🎶 朋友們一起唱：Happy Birthday to you~ 🎶"));
  }, 3000);
});
