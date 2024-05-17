<template>
    <div class="ppt-container">
        <el-carousel trigger="click" style="height: 100%" indicator-position="none" :autoplay="false"
            :initial-index="carIndex">
            <el-carousel-item style="height: 100%;">
                <div class="first container">
                    <div class="logo">
                        <img src="@/assets/images/logo.png" alt="" />
                    </div>
                    <div class="content-wrapper">
                        <h2 class="title">新员工转正答辩</h2>
                        <div>
                            <p class="tip">答辩人：王祥</p>
                            <p class="tip">导师：余钦水</p>
                            <p class="tip">小组：云数融通产品组</p>
                            <p class="tip">日期：2023年12月</p>
                        </div>
                    </div>
                </div>
            </el-carousel-item>
            <el-carousel-item style="height: 100%">
                <div class="second container">
                    <div class="logo">
                        <img src="@/assets/images/logo.png" alt="" />
                    </div>
                    <div class="content-wrapper">
                        <div class="title">目录</div>
                        <div class="line"></div>
                        <div class="directory">
                            <div class="dir-item">
                                <div class="circle">1</div>
                                <div class="text">个人情况</div>
                            </div>
                            <div class="dir-item">
                                <div class="circle">2</div>
                                <div class="text">学习工作情况</div>
                            </div>
                            <div class="dir-item">
                                <div class="circle">3</div>
                                <div class="text">问题与收获</div>
                            </div>
                            <div class="dir-item">
                                <div class="circle">4</div>
                                <div class="text">目标与计划</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-carousel-item>
            <el-carousel-item style="height: 100%">
                <div class="third container">
                    <div class="dir-title">个人情况</div>
                    <div class="logo">
                        <img src="@/assets/images/logo.png" alt="" />
                    </div>
                    <div class="content-wrapper">
                        <div class="school content-item" style="position: relative;">
                            <div>
                                <div class="title">🏫 学校情况</div>
                                <div class="intro">
                                    <div class="icon"></div>
                                    <span style="color: rgb(68, 114 ,192)">院校及专业：</span>
                                    <span>西安理工大学 &nbsp 机械专业 &nbsp 硕士</span>
                                </div>
                                <div class="skill">
                                    <div class="icon"></div>
                                    <span style="color: rgb(68, 114 ,192)">技能</span>
                                </div>
                                <div class="desc">
                                    <div class="tag" v-for="(item, index) in tagsList" :key="index"
                                        :style="{ backgroundColor: item.color }" @click="go(item.url)">
                                        <svg-icon :name="item.icon" height="20px"
                                            style="vertical-align: -10%; margin-right: 5px"></svg-icon>
                                        <span class="text">{{ item.name }}</span>
                                    </div>
                                </div>
                            </div>
                            <ImageChanges style="position: absolute; right: -200px;top: 0; " />
                        </div>

                        <div class="work-wrapper  content-item" style="position: relative;">
                            <div>
                                <div class="title">🏢 工作情况</div>
                                <div class="intro">
                                    <div class="icon"></div>
                                    <span style="color: rgb(68, 114 ,192)">小组及岗位：</span>
                                    <span>云数融通产品组 &nbsp &nbsp 助理软件开发工程师</span>
                                </div>
                                <div class="work">
                                    <div class="icon"></div>
                                    <span style="color: rgb(68, 114 ,192)">工作情况：</span>
                                    <div class="work-content">
                                        <ul>
                                            <li class="work-content-item">
                                                <div
                                                    style="display: inline-block;align-items: center;color: rgb(68, 114 ,192)">
                                                    <img src="@/assets/images/code.png" alt="">
                                                    开发情况：
                                                </div>
                                                <div style="margin-left: 130px;margin-top: -25px;">
                                                    <p style="margin-bottom:5px;">(1) 参加用户增长引擎产品版本迭代 <span
                                                            style="color: red;margin: 0 3px;font-weight: 600;">7</span>次</p>
                                                    <p style="margin-bottom:5px;">(2) 数据安全中心版本迭代<span
                                                            style="color: rgb(68, 114 ,192);font-weight: 600;">3</span>次</p>
                                                    <p>(3) 数据审计产品版本迭代<span
                                                            style="color: rgb(68, 114 ,192);font-weight: 600;"> 1 </span>次
                                                    </p>
                                                </div>
                                                <!-- <span>参加用户增长引擎产品版本迭代 <span style="color: red;margin: 0 3px;font-weight: 600;">7</span>次，数据安全中心版本迭代<span style="color: rgb(68, 114 ,192);font-weight: 600;">3</span>次，数据审计产品版本迭代<span style="color: rgb(68, 114 ,192);font-weight: 600;"> 1 </span>次</span> -->
                                            </li>
                                            <li class="work-content-item">
                                                <div
                                                    style="display: inline-block;align-items: center;color: rgb(68, 114 ,192)">
                                                    <img src="@/assets/images/doc.png" alt="">
                                                    撰写文档：
                                                </div>
                                                <div style="margin-left: 130px;margin-top: -25px;">
                                                    <p style="margin-bottom:5px;">(1) 撰写数据安全中心交维文档；</p>
                                                    <p>(2) 用户增长引擎CDP和隐私计算平台前端自述文档</p>
                                                </div>
                                            </li>
                                            <li class="work-content-item">
                                                <div
                                                    style="display: inline-block;align-items: center;color: rgb(68, 114 ,192);">
                                                    <img src="@/assets/images/dark.png" alt="">
                                                    运维工作：
                                                </div>
                                                <div style="margin-left: 130px;margin-top: -25px;">
                                                    <p style="margin-bottom:5px;"> (1) 数据库审计产品集群国产化网络策略验证；</p>
                                                    <p>(2) 数据库审计/安全中心IPV6改造网络不通问题</p>
                                                </div>
                                            </li>
                                            <li class="work-content-item">
                                                <div
                                                    style="display: inline-block;align-items: center;color: rgb(68, 114 ,192);">
                                                    <img src="@/assets/images/dark.png" alt="">
                                                    其他工作：
                                                </div>
                                                <div style="margin-left: 130px;margin-top: -25px;">
                                                    <p style="margin-bottom:5px;"> 外协账号管理</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="images">
                                    <div class="image-box">
                                        <img class="image" src="@/assets/images/work1.png" alt="photo">
                                    </div>

                                    <div class="image-box">
                                        <img class="image" src="@/assets/images/work2.png" alt="photo">
                                    </div>

                                    <div class="image-box">
                                        <img class="image" src="@/assets/images/work3.png" alt="photo">
                                    </div>

                                    <div class="image-box">
                                        <img class="image" src="@/assets/images/work4.png" alt="photo">
                                    </div>

                                    <div class="image-box">
                                        <img class="image" src="@/assets/images/work4.png" alt="photo">
                                    </div>
                                </div>

                                <div class='charts' id="charts"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
        <!-- <Wave color="rgb(18, 129, 152)" /> -->
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import Wave from '@/components/home/wave.vue'
import { onMounted, onUnmounted, ref } from "vue";
import ImageChanges from '@/components/image-change.vue'
const carIndex = ref(0)
const tagsList = [
    {
        name: "VUE",
        icon: "vue",
        color: "rgb(79, 192, 141)",
        url: "https://cn.vuejs.org/",
    },
    {
        name: "JavaScript",
        icon: "javascript",
        color: "rgb(227, 243, 30)",
        url: "https://www.javascript.com/",
    },
    {
        name: "React",
        icon: "react",
        color: "rgb(97, 218, 251)",
        url: "https://react.dev/",
    },
    {
        name: "MySQL",
        icon: "mysql",
        color: "rgb(68, 121, 161)",
        url: "https://www.mysql.com/",
    },

    {
        name: "Webpack",
        icon: "webpack",
        color: "rgb(141, 214, 249)",
        url: "https://webpack.docschina.org/",
    },
    {
        name: "TypeScript",
        icon: "typescript",
        color: "rgb(49, 120, 198)",
        url: "https://www.tslang.cn/",
    },
    {
        name: "Node.js",
        icon: "node-js",
        color: "rgb(51, 153, 51)",
        url: "https://nodejs.org/en",
    },
    {
        name: "HTML",
        icon: "html",
        color: "rgb(227, 79, 38)",
        url: "http://html5.com/",
    },
    {
        name: "CSS",
        icon: "css3",
        color: "rgb(21, 114, 182)",
        url: "https://css3.com/",
    },
    {
        name: "SCSS",
        icon: "scss",
        color: "rgb(255, 131, 196)",
        url: "https://www.sass.hk/",
    },
    {
        name: "Git",
        icon: "git",
        color: "rgb(240, 80, 50)",
        url: "https://git-scm.com/",
    },
    {
        name: "Kubernetes",
        icon: "kubernetes",
        color: "rgb(49, 108, 230)",
        url: "https://kubernetes.io/",
    },
    {
        name: "Uni-app",
        icon: "uni-app",
        color: "rgb(45, 146, 58)",
        url: "https://uniapp.dcloud.net.cn/",
    },
    {
        name: "Docker",
        icon: "docker",
        color: "rgb(29, 99, 237)",
        url: "https://www.docker.com/",
    },
    {
        name: "Python",
        icon: "python",
        color: "rgb(34, 74, 108)",
        url: "https://www.python.org/",
    },
];
let t = null;

const option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [0, 508, 3057, 2493, 8160, 2400],
            type: 'bar'
        }
    ]
}
const zIndex = ref(1)

const changeImage = (ele) => {
    zIndex.value++;

    ele.style.right = "11rem";
    ele.style.zIndex = zIndex;
    ele.style.transform = "rotate(0deg)";
    ele.style.transition = "all 0.3s";

    setTimeout(() => {
        zIndex.value -= 3;

        ele.style.right = "";
        ele.style.zIndex = zIndex;
        ele.style.transform = "";

        setTimeout(() => {
            ele.style.transition = "";
        }, 300)
    }, 1000)
}

onMounted(() => {
    const charts = document.getElementById('charts')
    const myChart = echarts.init(charts);
    myChart.setOption(option)
    myChart.resize({
        width: '400px',
        height: '270px'
    })
    const tag = document.getElementsByClassName("tag");
    t = setInterval(() => {
        const random = Math.floor(Math.random() * tagsList.length);
        tag[random].classList.add("jittery");
        setTimeout(() => {
            tag[random].classList.remove("jittery");
        }, 2000);
    }, 3000);

    const imgElements = document.querySelectorAll('.image-box');
    let i = 0
    setInterval(() => {
        changeImage(imgElements[i])
        i++
        if(i > 4) i = 0
    }, 3000);


});

onUnmounted(() => {
    clearInterval(t);
});
</script>

<style lang="scss" scoped>
.ppt-container {
    height: 100%;
    width: 100%;
    // background-image: url('@/assets/images/bg2.png');
    background-color: rgb(230, 230, 230);
    background-size: 100% 100%;
    // color: #fff;
    overflow: hidden;

    :deep .el-carousel {
        .el-carousel__container {
            height: 100%;
        }
    }

    .container {
        height: 100%;
        width: 100%;
        position: relative;

        .logo {
            position: absolute;
            top: 50px;
            left: 50px;
        }
    }

    .first {
        .content-wrapper {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .title {
                font-size: 60px;
                margin-bottom: 100px;
                margin-top: -100px;
            }

            .tip {
                margin: 20px 0;
                font-size: 26px;
                font-weight: 500;
            }
        }
    }

    .second {
        .content-wrapper {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .title {
                font-size: 60px;
                letter-spacing: 20px;
                width: 60px;
                margin-right: 100px;
            }

            .directory {
                border-left: 2px solid rgba(50, 50, 50, .3);

                .dir-item {
                    height: 100px;
                    width: 500px;
                    background-color: #fff;
                    margin: 30px 0 30px 100px;
                    border-radius: 50px;
                    box-shadow: 8px 8px 15px 0px rgba(59, 85, 143, 0.2);
                    line-height: 100px;
                    text-align: center;
                    display: flex;

                    .circle {
                        height: 100px;
                        width: 100px;
                        background-color: rgb(68, 114, 192);
                        border-radius: 50%;
                        color: #fff;
                        font-size: 40px;
                    }

                    .text {
                        font-size: 30px;
                        margin-left: 20px;
                    }
                }
            }
        }
    }

    .third {
        margin-top: -20px;

        .dir-title {
            position: absolute;
            top: 50px;
            left: 100px;
            font-size: 30px;
            color: rgb(68, 114, 192);
        }

        .logo {
            position: absolute;
            top: 50px;
            right: 50px !important;
            left: auto;
        }

        .content-wrapper {
            height: 100%;
            width: 100%;
            padding: 100px;

            .content-item {
                border-radius: 10px;
                background-color: #fff;
                margin-bottom: 10px;
                height: 33%;
                margin-right: 200px;
                padding: 20px;

                .title {
                    font-size: 26px;
                }

                .intro {
                    margin-top: 20px;
                    display: flex;
                    font-size: 20px;
                    align-items: center;

                    .icon {
                        display: inline-block;
                        height: 30px;
                        width: 8px;
                        background-color: rgb(68, 114, 192);
                        margin-right: 5px;
                    }
                }

                .skill {
                    margin-top: 20px;
                    display: flex;
                    font-size: 20px;
                    align-items: center;

                    .icon {
                        display: inline-block;
                        height: 30px;
                        width: 8px;
                        background-color: rgb(68, 114, 192);
                        margin-right: 5px;
                    }
                }

                .work {
                    margin-top: 20px;
                    display: flex;
                    font-size: 20px;

                    .icon {
                        display: inline-block;
                        height: 30px;
                        width: 8px;
                        background-color: rgb(68, 114, 192);
                        margin-right: 5px;
                    }

                    .work-content {
                        width: 45%;

                        li {
                            margin-bottom: 10px;

                            // display: flex;
                            img {
                                height: 20px;
                            }

                            .work-content-text-box {
                                // display: inline-block;
                                margin-left: 40px;
                            }
                        }
                    }
                }

                .desc {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    font-family: CustomFont-2;
                    width: 50%;
                    margin-left: 40px;

                    .tag {
                        height: 30px;
                        background-color: skyblue;
                        display: inline-block;
                        padding: 2px 15px;
                        margin: 5px 5px;
                        line-height: 30px;
                        border-radius: 10px;
                        box-shadow: 4px 4px 8px 0px rgba(59, 85, 143, 0.2);
                        transition: all 0.2s linear;
                        font-size: 24px;
                        cursor: pointer;

                        span {
                            letter-spacing: 0.08em;
                        }

                        &:hover {
                            // transform: translateY(-10px);
                            animation: jittery 2s infinite;
                        }
                    }
                }
            }

            .work-wrapper {
                height: 48%;

                .right {
                    height: 88%;
                    width: 42%;
                    position: absolute;
                    top: 6%;
                    right: 3%;
                    display: flex;
                    flex-direction: column-reverse;
                    align-items: center;

                    .charts {
                        height: 40%;
                        margin-top: -60px;
                    }

                    .images {
                        margin-top: 80px;
                        height: 60%;
                        width: 100%;
                        .image-box {
                            position: absolute;
                            width: 400px;
                            right: -10em;
                            &:first-child {
                                transform: rotate(-10deg);
                            }

                            &:nth-child(2) {
                                transform: rotate(-20deg);
                            }

                            &:nth-child(3) {
                                transform: rotate(0deg);
                            }

                            &:nth-child(4) {
                                transform: rotate(10deg);
                            }

                            &:nth-child(5) {
                                transform: rotate(20deg);
                            }
                        }

                        .image {
                            width: 50%;
                            height: 200px;
                            display: block;
                            border: 1rem solid rgb(230, 230, 230);
                            border-radius: 2rem;
                            cursor: pointer;
                            user-select: none;
                        }
                    }
                }
            }
        }
    }
}

.jittery {
    animation: jittery 2s linear;
}

@keyframes jittery {

    5%,
    50% {
        transform: scale(1);
    }

    10% {
        transform: scale(0.9);
    }

    15% {
        transform: scale(1.15);
    }

    20% {
        transform: scale(1.15) rotate(-5deg);
    }

    25% {
        transform: scale(1.15) rotate(5deg);
    }

    30% {
        transform: scale(1.15) rotate(-3deg);
    }

    35% {
        transform: scale(1.15) rotate(2deg);
    }

    40% {
        transform: scale(1.15) rotate(0);
    }
}</style>