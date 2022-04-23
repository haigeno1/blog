<template>
  <div class="container" @scroll="onScroll" ref="container">
    <div class="panel" ref="panel" :style="{ paddingTop: paddingTop + 'px' }">
      <div class="item" v-for="item in visibleList" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script>
// 如何一次性加载10万条数据（虚拟长列表）
// https://zhuanlan.zhihu.com/p/387907431
// https://codesandbox.io/s/thirsty-moon-il9kj?file=/src/App.vue:0-1765
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    let container = ref(null),
      panel = ref(null);
    let buffTop = 10,
      buffBottom = 10,
      count = 0;
    let raw = Array(100000)
      .fill(0)
      .map((v, i) => `item-${i}`);
    let start = ref(0),
      end = ref(1);
    let itemHeight = 1;
    let paddingTop = ref(0);
    let visibleList = computed(() => raw.slice(start.value, end.value));

    onMounted(() => {
      itemHeight = panel.value.firstElementChild.offsetHeight;
      panel.value.style.height = raw.length * itemHeight + "px";
      count = Math.floor(container.value.offsetHeight / itemHeight);
      end.value = count + buffBottom;
    });
    let timer = null;
    const onScroll = function (e) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        let startValue = Math.floor(e.target.scrollTop / itemHeight);
        let buff = startValue > buffTop ? buffTop : startValue;
        start.value = startValue - buff;
        end.value = startValue + count + buffBottom;
        paddingTop.value = start.value * itemHeight;
      }, 200);
    };

    return {
      visibleList,
      paddingTop,
      container,
      panel,
      onScroll,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}

.container {
  height: 100vh;
  overflow: scroll;
}

.panel {
  border: 1px solid red;
}

.item {
  border: 1px solid #eee;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
