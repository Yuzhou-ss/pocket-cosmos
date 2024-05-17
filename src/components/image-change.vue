<template>
    <div class="imageChange-wrapper">
        <div class="carousel">
            <img src="@/assets/images/change1.png" alt="" class="img">
            <img src="@/assets/images/change2.png" alt="" class="img">
            <img src="@/assets/images/change3.png" alt="" class="img">
            <img src="@/assets/images/change4.png" alt="" class="img">
            <img src="@/assets/images/change5.png" alt="" class="img">
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
let index = ref(2)

onMounted(() => {
    const OFFSET = 200, SCALE = 0.8, ROTATE = 45, OPACITY = 0.2
    const imgs = document.getElementsByClassName('img')
    const l = imgs.length
    const setStyle = (imgIndex) => {
        const carousel = document.querySelector('.carousel')
        carousel.style.display = 'none'
        for (let i = 0; i < imgs.length; i++) {
            const img = imgs[i];
            const i_imgIndex = i - imgIndex
            const abs = Math.abs(i_imgIndex)
            const sign = -1 * Math.sign(i_imgIndex)
            let translateX = i_imgIndex * OFFSET
            if (abs === 1) {
                translateX += sign * 30
            }
            const rotateY = abs === 0 ? 0 : sign * ROTATE, // -1
                scale = Math.pow(SCALE, abs),
                opacity = Math.pow(OPACITY, abs),
                zIndex = l - abs
            img.style = `transform: translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale});opacity: ${opacity};z-index: ${zIndex};`
        }
        carousel.style.display = 'flex'
    }
    setStyle(index.value)

    setInterval(() => {
        index.value += 1
        if (index.value > 4) {
            index.value = 0
        }
        setStyle(index.value)
    }, 3000);
})
</script>

<style scoped>
.imageChange-wrapper {
    width: 60%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
}

img {
    transition: .2s linear;
    position: absolute;
    height: 200px;
    width: 400px;
}

.carousel {
    display: flex;
    width: calc(100% - 248px);
    position: relative;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    perspective: 1000px;
}
</style>