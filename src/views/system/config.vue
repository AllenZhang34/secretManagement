<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>连接系统配置</span>
        </div>
        <config-table
          :create-title="connectSystemCreateName"
          :config-list="connectSystemList"
          :config-list-total="connectSystemTotal"
          :config-list-query="connectSystemListQuery"
          @configListFilter="getConnectSystem"
          @createConfig="createConnectSystemData"
          @updateConfig="updateConnectSystemData"
          @deleteConfig="deleteConnectSystemData"
        />
      </el-card>
    </el-row>
    <el-row style="margin-top:30px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>应用类型配置</span>
        </div>
        <config-table
          :create-title="appTypeCreateName"
          :config-list="appTypeList"
          :config-list-total="appTypeTotal"
          :config-list-query="appTypeListQuery"
          @configListFilter="getAppType"
          @createConfig="createAppTypeData"
          @updateConfig="updateAppTypeData"
          @deleteConfig="deleteAppTypeData"
        />
      </el-card>
    </el-row>
    <el-row style="margin-top:30px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>服务器密码机地址配置</span>
        </div>
        <config-table
          :create-title="cipherMachineCreateName"
          :config-list="cipherMachineList"
          :config-list-total="cipherMachineTotal"
          :config-list-query="cipherMachineListQuery"
          @configListFilter="getCipherMachine"
          @createConfig="createCipherMachineData"
          @updateConfig="updateCipherMachineData"
          @deleteConfig="deleteCipherMachineData"
        />
      </el-card>
    </el-row>
  </div>
</template>

<script>
import ConfigTable from './components/ConfigTable'
import {
  getConnectSystemList,
  getAppTypeList,
  getCipherMachineList,
  createConnectSystem,
  createAppType,
  createCipherMachine,
  updateConnectSystem,
  updateAppType,
  updateCipherMachine,
  deleteConnectSystem,
  deleteAppType,
  deleteCipherMachine
} from '@/api/configmanagement'

export default {
  name: 'ConfigmanagementList',
  components: {
    ConfigTable
  },
  data() {
    return {
      connectSystemCreateName: '添加连接系统',
      appTypeCreateName: '添加应用类型',
      cipherMachineCreateName: '添加服务器密码机地址',
      connectSystemList: [],
      appTypeList: [],
      cipherMachineList: [],
      connectSystemListLoading: false,
      appTypeListLoading: false,
      cipherMachineListLoading: false,
      connectSystemTotal: 0,
      appTypeTotal: 0,
      cipherMachineTotal: 0,
      connectSystemListQuery: {
        page: 1,
        limit: 5,
        configName: undefined
      },
      appTypeListQuery: {
        page: 1,
        limit: 5,
        configName: undefined
      },
      cipherMachineListQuery: {
        page: 1,
        limit: 5,
        configName: undefined
      }
    }
  },
  created() {
    this.getConnectSystem()
    this.getAppType()
    this.getCipherMachine()
  },
  methods: {
    getConnectSystem(configListQuery) {
      this.connectSystemListLoading = true
      getConnectSystemList(configListQuery || this.connectSystemListQuery).then(response => {
        this.connectSystemList = response.data.items
        this.connectSystemTotal = response.data.total
        setTimeout(() => {
          this.connectSystemListLoading = false
        }, 1.5 * 1000)
      })
    },

    getAppType(configListQuery) {
      this.appTypeListLoading = true
      getAppTypeList(configListQuery || this.appTypeListQuery).then(response => {
        this.appTypeList = response.data.items
        this.appTypeTotal = response.data.total
        setTimeout(() => {
          this.appTypeListLoading = false
        }, 1.5 * 1000)
      })
    },

    getCipherMachine(configListQuery) {
      this.cipherMachineListLoading = true
      getCipherMachineList(configListQuery || this.cipherMachineListQuery).then(response => {
        this.cipherMachineList = response.data.items
        this.cipherMachineTotal = response.data.total
        setTimeout(() => {
          this.cipherMachineListLoading = false
        }, 1.5 * 1000)
      })
    },
    createConnectSystemData(temp) {
      temp.configId = parseInt(Math.random() * 100) + 1024 // mock a id
      createConnectSystem(temp).then(() => {
        this.connectSystemList.unshift(temp)
        // this.dialogFormVisible = false
        this.$notify({
          title: '创建成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    createAppTypeData(temp) {
      temp.configId = parseInt(Math.random() * 100) + 1024 // mock a id
      createAppType(temp).then(() => {
        this.appTypeList.unshift(temp)
        // this.dialogFormVisible = false
        this.$notify({
          title: '创建成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    createCipherMachineData(temp) {
      temp.configId = parseInt(Math.random() * 100) + 1024 // mock a id
      createCipherMachine(temp).then(() => {
        this.cipherMachineList.unshift(temp)
        // this.dialogFormVisible = false
        this.$notify({
          title: '创建成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateConnectSystemData(temp) {
      updateConnectSystem(temp).then(() => {
        const index = this.connectSystemList.findIndex(v => v.configId === temp.configId)
        this.connectSystemList.splice(index, 1, temp)
        this.$notify({
          title: '更新成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateAppTypeData(temp) {
      updateAppType(temp).then(() => {
        const index = this.appTypeList.findIndex(v => v.configId === temp.configId)
        this.appTypeList.splice(index, 1, temp)
        this.$notify({
          title: '更新成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateCipherMachineData(temp) {
      updateCipherMachine(temp).then(() => {
        const index = this.cipherMachineList.findIndex(v => v.configId === temp.configId)
        this.cipherMachineList.splice(index, 1, temp)
        this.$notify({
          title: '更新成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    deleteConnectSystemData(id, index) {
      deleteConnectSystem(id).then(() => {
        this.connectSystemList.splice(index, 1)
        this.$notify({
          title: '删除成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    deleteAppTypeData(id, index) {
      deleteAppType(id).then(() => {
        this.appTypeList.splice(index, 1)
        this.$notify({
          title: '删除成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    deleteCipherMachineData(id, index) {
      deleteCipherMachine(id).then(() => {
        this.cipherMachineList.splice(index, 1)
        this.$notify({
          title: '删除成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    }

  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}

</style>
