// src/hooks/index.ts
import { onBeforeUnmount, ref, watch, nextTick } from "vue";
import { useSnow } from "./snow";
import { useRain } from "./rain";
import { useSakura } from "./sakura-snow";

type WeatherType = "snow" | "rain" | "sakura" | "none";

export const useWeather = (containerClassName: string) => {
  const currentWeather = ref<WeatherType>("none");
  let stopSnow: (() => void) | null = null;
  let stopRain: (() => void) | null = null;
  let stopSakura: (() => void) | null = null;
  let resizeObserver: ResizeObserver | null = null;

  const stopAllWeather = () => {
    if (stopSnow) {
      try {
        stopSnow();
      } catch (e) {
        console.warn("Error stopping snow:", e);
      }
      stopSnow = null;
    }

    if (stopRain) {
      try {
        stopRain();
      } catch (e) {
        console.warn("Error stopping rain:", e);
      }
      stopRain = null;
    }

    if (stopSakura) {
      try {
        stopSakura();
      } catch (e) {
        console.warn("Error stopping sakura:", e);
      }
      stopSakura = null;
    }
  };

  const waitForContainer = (className: string): Promise<Element | null> => {
    return new Promise((resolve) => {
      const container = document.querySelector(`.${className}`);
      if (container) {
        resolve(container);
        return;
      }

      // 如果没找到，等待一段时间再尝试
      const checkContainer = () => {
        const container = document.querySelector(`.${className}`);
        if (container) {
          resolve(container);
        } else {
          // 最多尝试10次，每次间隔100ms
          setTimeout(checkContainer, 100);
        }
      };

      checkContainer();
    });
  };

  // 处理窗口大小变化
  const handleResize = () => {
    // 重新启动当前天气效果以适应新的窗口大小
    if (currentWeather.value !== "none") {
      const weather = currentWeather.value;
      currentWeather.value = "none";

      // 短暂延迟后重新启动天气效果
      setTimeout(() => {
        setWeather(weather);
      }, 100);
    }
  };

  const setWeather = async (weather: WeatherType) => {
    stopAllWeather();

    // 等待容器元素准备好
    const container = await waitForContainer(containerClassName);
    if (!container) {
      console.warn(`Container with class ${containerClassName} not found`);
      return;
    }

    try {
      switch (weather) {
        case "snow":
          stopSnow = useSnow(containerClassName);
          break;
        case "rain":
          stopRain = useRain(containerClassName);
          break;
        case "sakura":
          stopSakura = await useSakura(containerClassName);
          break;
        case "none":
          break;
      }
    } catch (e) {
      console.error("Error starting weather effect:", weather, e);
    }

    currentWeather.value = weather;
  };

  const stopWeather = async () => {
    stopAllWeather();
    currentWeather.value = "none";
  };

  const cleanup = () => {
    stopAllWeather();
    // 移除 resize 事件监听器
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", handleResize);
    }
  };

  // 添加 resize 事件监听器
  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
  }

  onBeforeUnmount(() => {
    cleanup();
  });

  return {
    currentWeather,
    setWeather,
    stopWeather,
    cleanup,
  };
};
