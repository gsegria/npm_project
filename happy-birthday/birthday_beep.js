// birthday_beep_full.js
import chalk from "chalk";
import figlet from "figlet";
import chalkAnimation from "chalk-animation";
import Speaker from "speaker";

// 音符頻率表 (Hz)
const notes = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, D5: 587.33, F5: 698.46, G5: 784.00, A5: 880.00
};

// 生日快樂旋律 (音符, 節拍數)
const melody = [
  ["C4", 1], ["C4", 1], ["D4", 2], ["C4", 2], ["F4", 2], ["E4", 4],
  ["C4", 1], ["C4", 1], ["D4", 2], ["C4", 2], ["G4", 2], ["F4", 4],
  ["C4", 1], ["C4", 1], ["C5", 2], ["A4", 2], ["F4", 2], ["E4", 2], ["D4", 2],
  ["Bb4", 1], ["Bb4", 1], ["A4", 2], ["F4", 2], ["G4", 2], ["F4", 4]
];

// 歌詞對應
const lyrics = [
  "Happy birthday to you 🎵",
  "Happy birthday to you 🎶",
  "Happy birthday dear friend 🎂",
  "Happy birthday to you 🎉"
];

// Speaker 初始化
const speaker = new Speaker({
  channels: 1,
  bitDepth: 16,
  sampleRate: 44100
});

// 播放單音
function playTone(frequency, durationMs) {
  return new Promise(resolve => {
    const sampleRate = 44100;
    const samples = durationMs / 1000 * sampleRate;
    const buffer = Buffer.alloc(samples * 2);

    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate;
      const value = Math.sin(2 * Math.PI * frequency * t); // sine wave
      buffer.writeInt16LE(value * 32767, i * 2);
    }

    speaker.write(buffer, resolve);
  });
}

// 打字效果
function typeWriter(text, delay = 120) {
  return new Promise(resolve => {
    let i = 0;
    const timer = setInterval(() => {
      process.stdout.write(text[i]);
      i++;
      if (i === text.length) {
        clearInterval(timer);
        process.stdout.write("\n");
        resolve();
      }
    }, delay);
  });
}

// 主程式
figlet("Happy Birthday!", async (err, data) => {
  if (err) return console.log("出錯了...", err);

  const rainbow = chalkAnimation.rainbow(data);

  setTimeout(async () => {
    rainbow.stop();
    console.clear();
    console.log(chalk.yellow("🎂 🎉 祝你生日快樂 🎉 🎂\n"));

    // 蛋糕 ASCII
    const cake = [
      "      ,   ,   ,   ,",
      "     ||  ||  ||  ||",
      "   =================",
      "   |              |",
      "   |    HAPPY     |",
      "   |   BIRTHDAY   |",
      "   |______________|"
    ];

    let toggle = true;
    const flameTimer = setInterval(() => {
      console.clear();
      console.log(chalk.yellow("🎂 🎉 祝你生日快樂 🎉 🎂\n"));
      const flame = toggle
        ? chalk.red("   (  )  (  )  (  )  (  )")
        : chalk.yellow("   )  (  )  (  )  (  )  (");
      console.log(flame);
      cake.forEach(line => console.log(chalk.magenta(line)));
      toggle = !toggle;
    }, 500);

    // 播放旋律 & 歌詞同步
    let lyricIndex = 0;
    for (let i = 0; i < melody.length; i++) {
      const [note, len] = melody[i];
      const freq = notes[note] || 440;
      const duration = 400 * len;

      // 在旋律的特定位置顯示歌詞
      if ([5, 11, 18, 25].includes(i)) {
        await typeWriter(chalk.green(lyrics[lyricIndex++]));
      }

      await playTone(freq, duration);
    }

    clearInterval(flameTimer);
    speaker.end();
    console.log(chalk.cyan("\n🎊🎊 祝你生日快樂！ 🎊🎊\n"));
  }, 3000);
});
