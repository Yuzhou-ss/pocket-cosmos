<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found-page">
    <div class="content-card">
      <div class="illustration">
        <div class="panda-container">
          <div class="panda">
            <div class="ear left-ear"></div>
            <div class="ear right-ear"></div>
            <div class="face">
              <div class="eye left-eye">
                <div class="pupil"></div>
              </div>
              <div class="eye right-eye">
                <div class="pupil"></div>
              </div>
              <div class="nose"></div>
              <div class="mouth"></div>
            </div>
          </div>
        </div>
        <div class="balloon pink-balloon">404</div>
        <div class="balloon blue-balloon">Oops!</div>
      </div>
      
      <div class="message">
        <h1>页面迷路了~</h1>
      </div>
      
      <router-link to="/yuzhou/navigation" class="home-button">
        回到首页
      </router-link>
    </div>
    
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>
  </div>
</template>

<script setup>
// 无需额外逻辑
</script>

<style scoped lang="scss">
.not-found-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

.cloud {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  z-index: 0;
  
  &.cloud-1 {
    width: 100px;
    height: 40px;
    top: 10%;
    left: 10%;
    animation: float 8s infinite ease-in-out;
  }
  
  &.cloud-2 {
    width: 150px;
    height: 50px;
    top: 20%;
    right: 15%;
    animation: float 10s infinite ease-in-out reverse;
  }
  
  &.cloud-3 {
    width: 80px;
    height: 30px;
    bottom: 15%;
    left: 20%;
    animation: float 9s infinite ease-in-out;
  }
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: inherit;
    border-radius: 50%;
  }
  
  &::before {
    width: 60%;
    height: 60%;
    top: -30%;
    left: 10%;
  }
  
  &::after {
    width: 70%;
    height: 70%;
    top: -20%;
    right: 10%;
  }
}

.content-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  z-index: 1;
  max-width: 500px;
  width: 90%;
  animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.illustration {
  position: relative;
  height: 200px;
  margin-bottom: 20px;
}

.panda-container {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.panda {
  position: relative;
  width: 100px;
  height: 100px;
}

.face {
  position: absolute;
  width: 100px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
  border: 4px solid #333;
  z-index: 2;
}

.ear {
  position: absolute;
  width: 30px;
  height: 30px;
  background: #333;
  border-radius: 50%;
  top: -10px;
  z-index: 1;
  
  &.left-ear {
    left: 10px;
  }
  
  &.right-ear {
    right: 10px;
  }
}

.eye {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #333;
  border-radius: 50%;
  top: 30px;
  
  &.left-eye {
    left: 20px;
  }
  
  &.right-eye {
    right: 20px;
  }
  
  .pupil {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    top: 6px;
    left: 6px;
    animation: blink 5s infinite;
  }
}

.nose {
  position: absolute;
  width: 15px;
  height: 10px;
  background: #333;
  border-radius: 50%;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
}

.mouth {
  position: absolute;
  width: 25px;
  height: 10px;
  border-bottom: 3px solid #333;
  border-radius: 0 0 50% 50%;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
}

.balloon {
  position: absolute;
  padding: 10px 15px;
  border-radius: 50px;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: float 3s infinite ease-in-out;
  
  &.pink-balloon {
    background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
    top: 20px;
    left: 20%;
    animation-delay: 0s;
  }
  
  &.blue-balloon {
    background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
    top: 40px;
    right: 20%;
    animation-delay: 0.5s;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 40px;
    background: rgba(255, 255, 255, 0.5);
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.message {
  h1 {
    color: #ff7eb3;
    margin-bottom: 15px;
    font-size: 24px;
  }
  
  p {
    color: #666;
    margin: 10px 0;
    font-size: 16px;
  }
}

.home-button {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 30px;
  background: linear-gradient(135deg, #ff9a9e 0%, #a1c4fd 100%);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(1px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes blink {
  0%, 45%, 55%, 100% {
    height: 8px;
  }
  50% {
    height: 2px;
    top: 10px;
  }
}

@media (max-width: 600px) {
  .content-card {
    padding: 20px;
  }
  
  .message h1 {
    font-size: 20px;
  }
  
  .message p {
    font-size: 14px;
  }
  
  .balloon {
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>