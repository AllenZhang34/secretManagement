<template>
  <div class="tab-container">
    <el-button
      class="filter-item"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-upload"
      @click="handleConfigCreate"
    >添加配置</el-button>
    <el-tabs v-model="configName" style="margin-top:15px;" type="border-card">
      <el-tab-pane
        v-for="item in configMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane v-if="configName==item.key" :type="item.key" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from "./components/TabPane";

export default {
  name: "Tab",
  components: { TabPane },
  data() {
    return {
      configMapOptions: [
        { label: "连接系统配置", key: "1" },
        { label: "应用类型配置", key: "2" },
        { label: "服务器密码地址配置", key: "3" }
      ],
      configName: "连接系统配置",
    };
  },
  watch: {
    configName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`);
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.configName = tab;
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    }
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
