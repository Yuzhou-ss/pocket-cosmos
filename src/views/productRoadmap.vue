<!-- src/components/ProductRoadmap.vue -->
<template>
  <div class="product-roadmap-container">
    <!-- 标题 -->
    <h2 class="roadmap-title">产品路线图</h2>

    <div class="roadmap-content">
      <!-- 左侧：版本迭代时间轴 -->
      <div class="timeline-section">
        <h3 class="section-title">版本迭代历史</h3>
        <div class="timeline">
          <div
            v-for="(version, index) in versionHistory"
            :key="version.id + index"
            class="timeline-item"
            :class="{ active: activeVersion === version.id }"
            @click="selectVersion(version.id)"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="version-header">
                <span class="version-tag">{{ version.version }}</span>
                <span class="version-date">{{ version.date }}</span>
              </div>
              <h4 class="version-name">{{ version.name }}</h4>
              <ul class="features-list">
                <li v-for="(feature, idx) in version.features" :key="idx">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：产品规划 -->
      <div class="planning-section">
        <h3 class="section-title">功能规划</h3>
        <div class="planning-list">
          <div
            v-for="plan in futurePlans"
            :key="plan.id"
            class="plan-item"
            :class="`status-${plan.status}`"
          >
            <div class="plan-header">
              <h4 class="plan-title">{{ plan.title }}</h4>
              <span class="plan-status" :class="`status-${plan.status}`">
                {{ getStatusText(plan.status) }}
              </span>
            </div>
            <p class="plan-description">{{ plan.description }}</p>
            <div class="plan-meta">
              <span class="plan-timeline">{{ plan.timeline }}</span>
              <span v-if="plan.priority" class="plan-priority">
                优先级：{{ plan.priority }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 版本迭代历史数据
const versionHistory = ref([
  {
    id: 1,
    version: "v1.0.0",
    name: "初始版本发布",
    date: "2025-10-29",
    features: ["**", "拟命令行web终端，支持搜索功能", "基本架构"],
  },
  {
    id: 2,
    version: "v1.1.0",
    name: "丰富终端命令",
    date: "2025-11-03",
    features: [
      "支持自定义默认搜索引擎",
      "樱花飘落效果",
      "支持bg/壁纸命令",
      "支持翻译功能",
    ],
  },
  {
    id: 3,
    version: "v1.1.1",
    name: "用户体验提升",
    date: "2025-11-05",
    features: ["支持自定义默认背景", "丰富背景特效"],
  },
  {
    id: 4,
    version: "v2.0.0",
    name: "重大功能更新",
    date: "2025-11-14",
    features: [
      "支持天气效果",
      "自定义天气特效",
      "桌面宠物",
      "登录/注册功能",
      "在线音乐播放器",
    ],
  },
  {
    id: 5,
    version: "v2.1.0",
    name: "桌宠bug修复及功能丰富",
    date: "2025-11-15",
    features: [
      "修复宠物图片资源过多，页面初始化较慢的问题",
      "宠物对话功能",
      "宠物随机动作",
    ],
  },
  {
    id: 6,
    version: "v3.0.0",
    name: "浏览器导航页",
    date: "2025-11-18",
    features: [
      "仿青柠起始页的浏览器导航页面",
      "自定义搜索引擎",
      "支持命令行登录功能",
    ],
  },
  {
    id: 7,
    version: "v3.0.1",
    name: "浏览器导航页功能丰富",
    date: "2025-11-20",
    features: ["“测试工具”导航", "翻译"],
  },
  {
    id: 8,
    version: "v3.0.2",
    name: "浏览器导航页功能丰富",
    date: "2025-11-22",
    features: ["图片工具导航", "壁纸", "在线音乐导航"],
  },
  {
    id: 9,
    version: "v3.0.3",
    name: "浏览器导航页功能丰富",
    date: "2025-11-26",
    features: ["快捷入口", "支持自定义快捷入口"],
  },
  {
    id: 10,
    version: "v3.1.0",
    name: "浏览器导航页功能丰富",
    date: "2025-11-29",
    features: [
      "快捷入口样式优化",
      "自定义快捷入口与用户解耦",
      "导航页天气系统",
    ],
  },
]);

// 未来规划数据
const futurePlans = ref([
  {
    id: 2,
    title: "**",
    description: "丰富、推敲、斟酌内容和交互方式",
    status: "in-progress", // 进行中
    priority: "高",
  },
  {
    id: 1,
    title: "删除注册/登录功能",
    description: "改为宠物交互式定义昵称、宠物名称等内容",
    status: "not-started", // 未开始
    priority: "高",
  },

  {
    id: 3,
    title: "丰富终端命令和功能",
    description:
      "内置音乐播放器，不再分为独立的两个工程。终端/音乐播放器类windows应用式交互",
    status: "in-progress", // 进行中
    priority: "中",
  },
  {
    id: 4,
    title: "丰富浏览器导航页功能",
    description: "支持自定义快捷入口；AI工具等导航功能开发",
    status: "completed", // 已完成
    priority: "中",
  },
  {
    id: 8,
    title: "AI助手",
    description: "支持AI聊天助手",
    status: "not-started", // 未开始
    priority: "高",
  },
  {
    id: 7,
    title: "········",
    description: "",
    status: "", // 未开始
    priority: "",
  },
]);

// 当前选中的版本
const activeVersion = ref(null);

// 选择版本
const selectVersion = (id) => {
  activeVersion.value = id;
};

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    "not-started": "未开始",
    "in-progress": "进行中",
    completed: "已完成",
  };
  return statusMap[status] || "未知";
};
</script>

<style scoped>
.product-roadmap-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.roadmap-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
}

.roadmap-content {
  display: flex;
  gap: 30px;
}

/* 时间轴部分样式 */
.timeline-section {
  flex: 1;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  color: #444;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #dee2e6;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.timeline-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.timeline-item.active {
  border-left: 3px solid #409eff;
  background: #f0f8ff;
}

.timeline-marker {
  position: absolute;
  left: -36px;
  top: 20px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #409eff;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #dee2e6;
}

.timeline-content .version-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.version-tag {
  background: #409eff;
  color: white;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.version-date {
  color: #6c757d;
  font-size: 14px;
}

.version-name {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
}

.features-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  position: relative;
  padding-left: 15px;
  margin-bottom: 5px;
  color: #555;
  font-size: 14px;
}

.features-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #409eff;
}

/* 产品规划部分样式 */
.planning-section {
  flex: 1;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.planning-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.plan-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.plan-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.plan-item.status-not-started {
  border-left: 4px solid #909399;
}

.plan-item.status-in-progress {
  border-left: 4px solid #409eff;
}

.plan-item.status-completed {
  border-left: 4px solid #67c23a;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.plan-title {
  font-size: 16px;
  color: #333;
  margin: 0;
}

.plan-status {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.plan-status.status-not-started {
  background: #f4f4f5;
  color: #909399;
}

.plan-status.status-in-progress {
  background: #ecf5ff;
  color: #409eff;
}

.plan-status.status-completed {
  background: #f0f9eb;
  color: #67c23a;
}

.plan-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 10px 0;
}

.plan-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.plan-timeline {
  font-weight: 500;
}

.plan-priority {
  background: #fdf6ec;
  color: #e6a23c;
  padding: 2px 8px;
  border-radius: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .roadmap-content {
    flex-direction: column;
  }

  .timeline-section,
  .planning-section {
    width: 100%;
  }

  .timeline {
    padding-left: 20px;
  }

  .timeline::before {
    left: 10px;
  }

  .timeline-marker {
    left: -26px;
  }
}
</style>
