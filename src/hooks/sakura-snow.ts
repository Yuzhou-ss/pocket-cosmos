import { onBeforeUnmount, onMounted, onUnmounted } from "vue";
import sakura from "@/assets/images/sakura.png";

export const useSakura = async (className: string) => {
  let stop = null;
  let staticx = null;
  const img = new Image();
  img.src = sakura;
  const getRandom = (option: string): number | Function => {
    let ret: number | Function = 0,
      random: number = 0;
    switch (option) {
      case "x":
        ret = Math.random() * window.innerWidth;
        break;
      case "y":
        ret = Math.random() * window.innerHeight;
        break;
      case "s":
        ret = Math.random();
        break;
      case "r":
        ret = Math.random() * 6;
        break;
      case "fnx":
        random = -0.5 + Math.random() * 1;
        ret = function (x: number, y: number) {
          return x + 0.5 * random - 1.7;
        };
        break;
      case "fny":
        random = 1.5 + Math.random() * 0.7;
        ret = function (x: number, y: number) {
          return y + random;
        };
        break;
      case "fnr":
        random = Math.random() * 0.03;
        ret = function (r: number) {
          return r + random;
        };
        break;
    }
    return ret;
  };

  class Sakura {
    x: number = 0;
    y: number = 0;
    r: number | Function = 0;
    s: number = 0;
    fn: {
      x: Function;
      y: Function;
      r: Function;
    };

    constructor(
      x: number,
      y: number,
      s: number,
      r: number | Function,
      fn: {
        x: Function;
        y: Function;
        r: Function;
      }
    ) {
      this.x = x;
      this.y = y;
      this.s = s;
      this.r = r;
      this.fn = fn;
    }

    draw(cxt: any) {
      cxt.save();
      cxt.translate(this.x, this.y);
      cxt.rotate(this.r);
      cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s);
      cxt.restore();
    }

    update() {
      this.x = this.fn.x(this.x, this.y);
      this.y = this.fn.y(this.y, this.y);
      this.r = this.fn.r(this.r);
      if (
        this.x > window.innerWidth ||
        this.x < 0 ||
        this.y > window.innerHeight ||
        this.y < 0
      ) {
        this.r = getRandom("fnr");
        if (Math.random() > 0.4) {
          this.x = getRandom("x") as number;
          this.y = 0;
          this.s = getRandom("s") as number;
          this.r = getRandom("r") as number;
        } else {
          this.x = window.innerWidth;
          this.y = getRandom("y") as number;
          this.s = getRandom("s") as number;
          this.r = getRandom("r") as number;
        }
      }
    }
  }

  class SakuraList {
    list: Array<Sakura> = [];
    push(sakura: Sakura) {
      this.list.push(sakura);
    }

    update() {
      for (let i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update();
      }
    }

    draw(cxt: any) {
      for (let i = 0, len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt);
      }
    }
    get(i: number) {
      return this.list[i];
    }

    size(): number {
      return this.list.length;
    }
  }

  const startSakura = () => {
    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame;

    let canvas = document.createElement("canvas"),
      cxt: any;
    staticx = true;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute(
      "style",
      "position: fixed;left: 0;top: 0;pointer-events: none;"
    );
    canvas.setAttribute("id", "canvas_sakura");
    document.getElementsByClassName(className)[0].appendChild(canvas);
    cxt = canvas.getContext("2d");
    const sakuraList = new SakuraList();
    for (let i = 0; i < 50; i++) {
      const randomX = getRandom("x") as number;
      const randomY = getRandom("y") as number;
      const randomR = getRandom("r") as number;
      const randomS = getRandom("s") as number;
      const randomFnx = getRandom("fnx") as Function; //x轴移动速度
      const randomFny = getRandom("fny") as Function; //y轴移动速度
      const randomFnR = getRandom("fnr") as Function; //转动速度
      const sakura = new Sakura(randomX, randomY, randomS, randomR, {
        x: randomFnx,
        y: randomFny,
        r: randomFnR,
      });

      sakura.draw(cxt);

      sakuraList.push(sakura);
    }
    stop = requestAnimationFrame(function f() {
      cxt.clearRect(0, 0, canvas.width, canvas.height);
      // 修改樱花位置逻辑
      sakuraList.update();
      // 画出修改后的樱花
      sakuraList.draw(cxt);
      // 递归 修改位置, 画出修改后的樱花
      stop = requestAnimationFrame(f);
    });
  };

  onMounted(() => {
    startSakura();
  });

  onBeforeUnmount(() => {
    stop = null;
    const ctx = document.getElementById("canvas_sakura");
    document
      .getElementsByClassName(className)[0]
      .removeChild(ctx as HTMLElement);
  });
};
