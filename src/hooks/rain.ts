import { onBeforeUnmount, onMounted } from "vue";

export const useRain = (className: string) => {
  const size = 150;
  const arr: Array<Rain> = [];
  const drawLine = (ctx: any, x1: number, y1: number) => {
    ctx.beginPath();
    ctx.strokeStyle = "#cccccc";
    ctx.moveTo(x1, y1);
    // 雨长度为30
    ctx.lineTo(x1, y1 + 30);
    ctx.stroke();
  };

  // 生成随机数
  const random = (num: number): number => {
    return Math.random() * num;
  };

  class Rain {
    x = random(window.innerWidth);
    y = random(window.innerHeight);

    ySpeed = random(2) + 5;
    show(ctx: any) {
      drawLine(ctx, this.x, this.y);
    }

    run() {
      if (this.y > window.innerHeight) {
        this.y = 0;
        this.x = random(window.innerWidth);
      }
      this.y = this.y + this.ySpeed;
    }
  }
  const start = (ctx: any) => {
    for (var i = 0; i < size; i++) {
      var rain = new Rain();
      arr.push(rain);
      rain.show(ctx);
    }
    setInterval(() => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = 0; i < size; i++) {
        arr[i].show(ctx);
        arr[i].run();
      }
    }, 10);
  };

  const startRain = () => {
    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame;
    let canvas = document.createElement("canvas");
    document.getElementsByClassName(className)[0].appendChild(canvas);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute(
      "style",
      "position: fixed;left: 0;top: 0;pointer-events: none;z-index: 1"
      
    );
    canvas.setAttribute("id", "canvas_sakura");
    const ctx = canvas.getContext('2d')
    start(ctx);
  };

  onMounted(() => {
    startRain()
  })

  onBeforeUnmount(() => {
    const ctx = document.getElementById("canvas_sakura");
    document.getElementsByClassName(className)[0].removeChild(ctx as HTMLElement);
  })
};
