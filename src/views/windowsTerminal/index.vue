<template>
  <div class="app" :style="appStyle">
    <div class="container">
      <header 
        @mousedown="startDrag" 
        @touchstart="startDrag"
        @mouseup="stopDrag"
        @touchend="stopDrag"
        @mouseleave="handleMouseLeave"
        :class="{ dragging: isDragging }"
      >
        <!-- <h1>Web Terminal</h1>
        <div class="status" :class="statusClass">{{ statusText }}</div> -->
        <div class="icons">
          <div class="close">
            <svg-icon name="close" class="icon"></svg-icon>
          </div>
          <div class="min"><svg-icon name="min" class="icon"></svg-icon></div>
          <div class="fullscreen">
            <svg-icon name="fullscreen" class="icon"></svg-icon>
          </div>
        </div>
      </header>

      <div class="terminal-container">
        <div ref="terminalRef" id="terminal"></div>
      </div>

      <!-- <div class="controls">
        <button @click="connect" :disabled="isConnected">Connect</button>
        <button @click="disconnect" :disabled="!isConnected">Disconnect</button>
        <span id="info"
          >Press Ctrl+Alt+C to copy selected text, Ctrl+Alt+V to paste</span
        >
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { Unicode11Addon } from "xterm-addon-unicode11";
import "xterm/css/xterm.css";
import { ref, onMounted, onUnmounted, computed } from "vue";

const terminalRef = ref(null);
const terminal = ref(null);
const fitAddon = ref(null);
const ws = ref(null);

// 拖拽相关状态
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const dragStartTime = ref(0);
const position = ref({ x: 0, y: 0 });
const startPosition = ref({ x: 0, y: 0 });
const longPressTimer = ref(null);

// 状态管理
const isConnected = ref(false);
const isConnecting = ref(false);
const statusText = ref("Disconnected");
const statusClass = ref("disconnected");

// 命令历史
const commandHistory = ref([]);
const historyIndex = ref(-1);
const currentInput = ref("");
const cursorPosition = ref(0);
const prompt = ref("");

let onDataHandler = null;

// 计算应用样式
const appStyle = computed(() => {
  return {
    transform: `translate(${position.value.x}px, ${position.value.y}px)`,
    transition: isDragging.value ? 'none' : 'transform 0.2s ease',
    userSelect: isDragging.value ? 'none' : 'auto'
  };
});

// 长按时间阈值（毫秒）
const LONG_PRESS_THRESHOLD = 300;

// 开始拖拽
const startDrag = (e) => {
  // 只在标题栏区域触发拖拽
  if (!e.target.closest('header')) return;
  
  // 防止在按钮上触发拖拽
  if (e.target.closest('.icons')) return;
  
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);
  
  if (!clientX || !clientY) return;
  
  dragStartX.value = clientX;
  dragStartY.value = clientY;
  startPosition.value = { ...position.value };
  dragStartTime.value = Date.now();
  
  // 设置长按定时器
  longPressTimer.value = setTimeout(() => {
    isDragging.value = true;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  }, LONG_PRESS_THRESHOLD);
  
  e.preventDefault();
};

// 处理拖拽过程
const handleDrag = (e) => {
  if (!isDragging.value) return;
  
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);
  
  if (!clientX || !clientY) return;
  
  const deltaX = clientX - dragStartX.value;
  const deltaY = clientY - dragStartY.value;
  
  // 获取容器尺寸和位置信息
  const container = document.querySelector('.container');
  if (!container) return;
  
  const containerRect = container.getBoundingClientRect();
  const appRect = document.querySelector('.app').getBoundingClientRect();
  
  // 计算边界限制
  const minX = -startPosition.value.x;
  const maxX = containerRect.width - appRect.width - startPosition.value.x;
  const minY = -startPosition.value.y;
  const maxY = containerRect.height - appRect.height - startPosition.value.y;
  
  // 应用边界限制
  let newX = startPosition.value.x + deltaX;
  let newY = startPosition.value.y + deltaY;
  
  newX = Math.max(minX, Math.min(maxX, newX));
  newY = Math.max(minY, Math.min(maxY, newY));
  
  position.value = { x: newX, y: newY };
  
  e.preventDefault();
};

// 停止拖拽
const stopDrag = () => {
  // 清除长按定时器
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value);
    longPressTimer.value = null;
  }
  
  // 如果未达到长按时长，则不触发拖拽
  if (Date.now() - dragStartTime.value < LONG_PRESS_THRESHOLD) {
    return;
  }
  
  isDragging.value = false;
  
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('touchmove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
};

// 处理鼠标离开事件
const handleMouseLeave = () => {
  // 如果正在拖拽且鼠标离开，则停止拖拽
  if (isDragging.value) {
    stopDrag();
  }
};

// 初始化终端
const initTerminal = () => {
  terminal.value = new Terminal({
    cols: 100,
    rows: 30,
    cursorBlink: true,
    scrollback: 1000,
    tabStopWidth: 8,
    fontSize: 14,
    fontFamily:
      "'Courier New', Courier, monospace, 'Microsoft YaHei', 'SimHei'",
    allowProposedApi: true,
    allowTransparency: true,
    theme: {
      background: "transparent",
      foreground: "#ffffff",
    },
    encoding: "utf-8",
    convertEol: true,
    letterSpacing: 0,
    lineHeight: 1.0,
  });

  // 加载插件
  const unicode11Addon = new Unicode11Addon();
  terminal.value.loadAddon(unicode11Addon);
  terminal.value.unicode.activeVersion = "11";

  fitAddon.value = new FitAddon();
  terminal.value.loadAddon(fitAddon.value);

  // 打开终端
  terminal.value.open(terminalRef.value);
  fitAddon.value.fit();

  // 监听窗口大小变化
  window.addEventListener("resize", () => {
    fitAddon.value.fit();
  });

  // 监听终端输入
  onDataHandler = terminal.value.onData((data) => {
    handleTerminalInput(data);
  });
};

// 处理终端输入
const handleTerminalInput = (data) => {
  // 处理特殊按键组合
  if (data === "\x03") {
    // Ctrl+C
    sendInterrupt();
    return;
  }

  const charCode = data.charCodeAt(0);

  // 处理ESC序列（方向键等）
  if (charCode === 27) {
    handleEscapeSequence(data);
    return;
  }

  // 处理回车键
  if (charCode === 13) {
    // Enter键
    handleEnterKey();
    return;
  }

  // 处理退格键
  if (charCode === 8 || charCode === 127) {
    // Backspace/Delete
    handleBackspace();
    return;
  }

  // 处理删除键 (Delete)
  if (data === "\x1b[3~") {
    handleDelete();
    return;
  }

  // 处理HOME键
  if (data === "\x1b[H") {
    moveCursorToStart();
    return;
  }

  // 处理END键
  if (data === "\x1b[F") {
    moveCursorToEnd();
    return;
  }

  // 处理可打印字符
  if ((charCode >= 32 && charCode <= 126) || charCode > 127) {
    handlePrintableCharacter(data);
    return;
  }

  // 对于其他字符，直接发送到服务器
  sendInput(data);
};

const handleEnterKey = () => {
  // 发送命令到服务端（包括回车符）
  sendInput(currentInput.value + "\n");

  // 在终端中显示回车换行
  terminal.value.write("\r\n");

  // 将命令添加到历史记录（除非是空命令）
  if (currentInput.value.trim() !== "") {
    commandHistory.value.push(currentInput.value);
  }

  // 重置历史索引
  historyIndex.value = commandHistory.value.length;

  // 重置当前输入和光标位置（但不立即显示提示符，等待服务端发送）
  currentInput.value = "";
  cursorPosition.value = 0;
};

const handleBackspace = () => {
  if (cursorPosition.value > 0) {
    // 删除光标前的字符
    currentInput.value =
      currentInput.value.slice(0, cursorPosition.value - 1) +
      currentInput.value.slice(cursorPosition.value);
    cursorPosition.value--;

    // 更新显示
    updateInputDisplay();
  }
};

const handleDelete = () => {
  if (cursorPosition.value < currentInput.value.length) {
    // 删除光标后的字符
    currentInput.value =
      currentInput.value.slice(0, cursorPosition.value) +
      currentInput.value.slice(cursorPosition.value + 1);

    // 更新显示
    updateInputDisplay();
  }
};

const handlePrintableCharacter = (char) => {
  // 在光标位置插入字符
  currentInput.value =
    currentInput.value.slice(0, cursorPosition.value) +
    char +
    currentInput.value.slice(cursorPosition.value);
  cursorPosition.value++;

  // 更新显示
  updateInputDisplay();
};

const handleEscapeSequence = (data) => {
  // 处理方向键和其他控制序列
  if (
    data.length === 3 &&
    data.charCodeAt(0) === 27 &&
    data.charCodeAt(1) === 91
  ) {
    const keyCode = data.charCodeAt(2);

    switch (keyCode) {
      case 65: // 上箭头键
        navigateHistoryUp();
        break;
      case 66: // 下箭头键
        navigateHistoryDown();
        break;
      case 67: // 右箭头键
        moveCursorRight();
        break;
      case 68: // 左箭头键
        moveCursorLeft();
        break;
    }
  }
};

const moveCursorLeft = () => {
  if (cursorPosition.value > 0) {
    cursorPosition.value--;
    terminal.value.write("\x1b[D"); // 向左移动光标
  }
};

const moveCursorRight = () => {
  if (cursorPosition.value < currentInput.value.length) {
    cursorPosition.value++;
    terminal.value.write("\x1b[C"); // 向右移动光标
  }
};

const moveCursorToStart = () => {
  if (cursorPosition.value > 0) {
    terminal.value.write(`\x1b[${cursorPosition.value}D`);
    cursorPosition.value = 0;
  }
};

const moveCursorToEnd = () => {
  if (cursorPosition.value < currentInput.value.length) {
    const moveRight = currentInput.value.length - cursorPosition.value;
    terminal.value.write(`\x1b[${moveRight}C`);
    cursorPosition.value = currentInput.value.length;
  }
};

const updateInputDisplay = () => {
  // 清除当前行显示
  terminal.value.write("\x1b[2K"); // 清除整行
  terminal.value.write("\r"); // 回到行首

  // 重新显示提示符和当前输入
  terminal.value.write(prompt.value + currentInput.value);

  // 将光标移动到正确位置
  if (cursorPosition.value < currentInput.value.length) {
    // 计算需要向左移动多少位置
    const moveLeft = currentInput.value.length - cursorPosition.value;
    terminal.value.write(`\x1b[${moveLeft}D`);
  }
};

const navigateHistoryUp = () => {
  if (commandHistory.value.length === 0) return;

  if (historyIndex.value > 0) {
    historyIndex.value--;
    replaceCurrentInput(commandHistory.value[historyIndex.value]);
  }
};

const navigateHistoryDown = () => {
  if (commandHistory.value.length === 0) return;

  if (historyIndex.value < commandHistory.value.length - 1) {
    historyIndex.value++;
    replaceCurrentInput(commandHistory.value[historyIndex.value]);
  } else if (historyIndex.value === commandHistory.value.length - 1) {
    historyIndex.value = commandHistory.value.length;
    replaceCurrentInput("");
  }
};

const replaceCurrentInput = (newInput) => {
  // 更新当前输入和光标位置
  currentInput.value = newInput;
  cursorPosition.value = newInput.length;

  // 清除当前行显示
  terminal.value.write("\x1b[2K"); // 清除整行
  terminal.value.write("\r"); // 回到行首

  // 更新当前输入并显示
  terminal.value.write(prompt.value + newInput);
};

const sendInterrupt = () => {
  // 发送Ctrl+C信号
  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    ws.value.send(JSON.stringify({ type: "interrupt" }));
  }
};

// 处理从服务端接收到的消息
const handleServerMessage = (text) => {
  // 检查是否是提示符（以>结尾且不包含其他特殊字符的行）
  if (text.endsWith(">") && !text.includes("\n") && text.length < 200) {
    // 更新提示符
    prompt.value = text;
    // 重置输入状态
    currentInput.value = "";
    cursorPosition.value = 0;
    // 显示提示符
    terminal.value.write(text);
  } else if (text === "\x1b[2J\x1b[H") {
    // 处理清屏命令
    terminal.value.write(text);
  } else {
    // 普通输出文本
    terminal.value.write(text);
  }
};

const sendInput = (data) => {
  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    ws.value.send(JSON.stringify({ type: "input", data: data }));
  }
};

// 连接WebSocket
const connect = () => {
  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    return;
  }

  isConnecting.value = true;
  statusText.value = "Connecting...";
  statusClass.value = "connecting";

  // 创建WebSocket连接
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  ws.value = new WebSocket(
    `${protocol}//${window.location.host.replace(":5173", ":3000")}/ws`
  );

  // 设置二进制类型为arraybuffer以更好处理文本
  ws.value.binaryType = "arraybuffer";

  ws.value.onopen = () => {
    console.log("WebSocket连接已建立");
    isConnected.value = true;
    isConnecting.value = false;
    statusText.value = "Connected";
    statusClass.value = "connected";
    fitAddon.value.fit();
  };

  ws.value.onmessage = (event) => {
    let text = "";

    if (typeof event.data === "string") {
      // 直接显示字符串数据
      text = event.data;
    } else if (event.data instanceof ArrayBuffer) {
      // 使用TextDecoder处理ArrayBuffer，明确指定UTF-8编码
      try {
        // 更宽松的解码方式，允许不完整的UTF-8序列
        const decoder = new TextDecoder("utf-8", { fatal: false });
        text = decoder.decode(event.data);
      } catch (e) {
        console.warn("UTF-8解码失败，尝试其他方法:", e);
        try {
          // 如果失败，尝试不指定编码让浏览器自动检测
          const decoderAuto = new TextDecoder();
          text = decoderAuto.decode(event.data);
        } catch (e2) {
          console.error("自动解码也失败:", e2);
          // 最后回退到原始方法
          const blob = new Blob([event.data]);
          const reader = new FileReader();
          reader.onload = (e) => {
            handleServerMessage(e.target.result);
          };
          reader.readAsText(blob);
          return; // 提前返回，避免重复写入
        }
      }
    } else {
      // 处理其他类型的二进制数据
      const reader = new FileReader();
      reader.onload = (e) => {
        handleServerMessage(e.target.result);
      };
      reader.readAsText(event.data, "utf-8");
      return; // 提前返回，避免重复写入
    }

    // 处理解码后的文本
    handleServerMessage(text);
  };

  ws.value.onclose = () => {
    console.log("WebSocket连接已关闭");
    isConnected.value = false;
    isConnecting.value = false;
    statusText.value = "Disconnected";
    statusClass.value = "disconnected";
  };

  ws.value.onerror = (error) => {
    console.error("WebSocket错误:", error);
    isConnected.value = false;
    isConnecting.value = false;
    statusText.value = "Connection Error";
    statusClass.value = "disconnected";
  };
};

// 断开连接
const disconnect = () => {
  if (ws.value) {
    ws.value.close();
  }
};

// 组件挂载时初始化
onMounted(() => {
  initTerminal();

  // 自动连接
  setTimeout(() => {
    connect();
  }, 500);
});

// 组件卸载时清理
onUnmounted(() => {
  if (onDataHandler) {
    onDataHandler.dispose();
  }
  disconnect();
  
  // 清理事件监听器
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('touchmove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
  
  // 清理定时器
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value);
  }
});
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.app {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: url("@/assets/images/bg.png");
  position: relative;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(49, 49, 49, 0.8) !important;
  height: 32px;
  padding: 2px;
  margin-bottom: 2px;
  position: relative;
  cursor: grab;
  border-radius: 4px 4px 0 0;
  
  &.dragging {
    cursor: grabbing;
  }
  
  .icons {
    position: absolute;
    display: flex;
    gap: 5px;
    left: 20px;
    > div {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      cursor: pointer;
      > svg {
        position: absolute;
        z-index: -1;
      }
      &:hover {
        > svg {
          z-index: 1;
        }
      }
    }
    .close {
      background-color: #c83030;
    }
    .min {
      background-color: #f7db60;
    }
    .fullscreen {
      background-color: #2ec971;
    }
  }
}

.status {
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
}

.status.connected {
  background-color: #d4edda;
  color: #155724;
}

.status.connecting {
  background-color: #fff3cd;
  color: #856404;
}

.status.disconnected {
  background-color: #f8d7da;
  color: #721c24;
}

.terminal-container {
  flex: 1;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: rgba(49, 49, 49, 0.6) !important;
  padding: 20px;
  :deep(.xterm-viewport) {
    background-color: transparent !important;
  }
}

#terminal {
  width: 100%;
  height: 100%;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.controls button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.controls button:not(:disabled):hover {
  background-color: #f5f5f5;
}

#info {
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  #info {
    font-size: 12px;
  }
}
</style>