import snowImg from "@/assets/images/snow.png";
import { onBeforeUnmount, onMounted } from "vue";
export const useSnow = (className: string) => {
  let stop: any;
  const img = new Image();
  img.src = snowImg;
  const num = 500;
  const w = window.innerWidth;
  const h = window.innerHeight;

  class Circle {
    color: string;
    x: number;
    y: number;
    r: number;
    constructor() {
      this.color = `rgba(255,255,255,${Math.random()})`;
      this.x = w * Math.random();
      this.y = h * Math.random();
      this.r = Math.random() * 5;
    }
    draw(ctx: any) {
      /* 创建路径 */
      ctx.beginPath();
      /* 给雪设置颜色 */
      ctx.fillStyle = this.color;
      /* 绘制雪 */
      ctx.arc(this.x, this.y, this.r, 0, 2 * 3.14, false);
      /* 填充路径 */
      ctx.fill();
    }

    drawImg(ctx: any) {
      /* 创建路径 */
      ctx.beginPath();
      img.style.height = Math.random() * 5 + "px";
      img.style.width = Math.random() * 5 + "px";
      /* 绘制雪花图片 */
      ctx.drawImage(img, this.x, this.y, this.r * 10, this.r * 10);
      /* 填充路径 */
    }
    update() {
      this.x += 0.1;
      this.y += this.r / 2;
      if (this.y > h) {
        this.x = w * Math.random();
        this.y = -10;
        this.color = `rgba(255,255,255,${Math.random()})`;
        this.r = Math.random() * 5;
      }
    }
  }

  class SnowList {
    list: Array<Circle> = [];
    push(snow: Circle) {
      this.list.push(snow);
    }
    update() {
      for (let i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update();
      }
    }
    draw(cxt: any) {
      for (let i = 0, len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt);
        if (i % 20 === 0) {
          this.list[i].drawImg(cxt);
        }
      }
    }
  }

  const startSnow = () => {
    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame;

    let canvas = document.createElement("canvas"),
      cxt: any;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute(
      "style",
      "position: fixed;left: 0;top: 0;pointer-events: none;"
    );
    canvas.setAttribute("id", "canvas_snow");
    document.getElementsByClassName(className)[0].appendChild(canvas);
    cxt = canvas.getContext("2d");
    const snowList = new SnowList();
    for (let i = 0; i < num; i++) {
      const snow = new Circle();
      snow.draw(cxt);
      snowList.push(snow);
    }
    stop = requestAnimationFrame(function f() {
      cxt.clearRect(0, 0, canvas.width, canvas.height);
      // 修改樱花位置逻辑
      snowList.update();
      // 画出修改后的樱花
      snowList.draw(cxt);
      // 递归 修改位置, 画出修改后的樱花
      stop = requestAnimationFrame(f);
    });
  };

  onMounted(() => {
    startSnow();
  });

  onBeforeUnmount(() => {
    const ctx = document.getElementById("canvas_snow");
    document
      .getElementsByClassName(className)[0]
      .removeChild(ctx as HTMLElement);
  });
};
