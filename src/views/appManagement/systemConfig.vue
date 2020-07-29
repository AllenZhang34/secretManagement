<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="appSystemListQuery.appSystemName"
        placeholder="应用名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleAppSystemFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleAppSystemFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleAppSystemCreate"
      >添加应用系统</el-button>
    </div>
    <div>
      <el-table
        v-loading="appSystemListLoading"
        :data="appSystemList"
        element-loading-text="加载中"
        fit
        highlight-current-row
      >
        <el-table-column label="ID" align="center">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应用名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.appSystemName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应用类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.appSystemType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="连接系统" align="center">
          <template slot-scope="{row}">
            <span>{{ row.connectSystem }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <el-switch
              v-model="row.appSystemStatus"
              active-value="active"
              inactive-value="inactive"
              @change="handleModifyStatus(row,$event)"
            />
          </template>
        </el-table-column>
        <el-table-column label="证书有效期" align="center">
          <template slot-scope="{row}">
            <span>{{ row.certificateTimestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template slot-scope="{row}">
            <span>{{ row.appSystemTimestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="text" @click="handleAppSystemUpdate(row)">编辑</el-button>
            <el-button type="text" style="color:red" @click="handleAppSystemDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      v-show="appSystemTotal>0"
      :total="appSystemTotal"
      :page.sync="appSystemListQuery.page"
      :limit.sync="appSystemListQuery.limit"
      @pagination="getAppSystemList"
    />

    <el-dialog :title="appSystemFormTitle" :visible.sync="appSystemFormVisible">
      <el-form
        ref="appSystemForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="应用名称" prop="appSystemName">
          <el-input v-model="temp.appSystemName" placeholder="请输入应用名称" />
        </el-form-item>

        <el-form-item label="应用类型" prop="appSystemType">
          <el-select v-model="temp.appSystemType" class="filter-item" placeholder="请选择应用类型">
            <el-option v-for="item in appTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="系统" prop="connectSystem">
          <el-select v-model="temp.connectSystem" class="filter-item" placeholder="请选择系统类型">
            <el-option v-for="item in connectSystemOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="证书" prop="appCertificate">
          <el-select v-model="temp.appCertificate" class="filter-item" placeholder="请选择第三方证书">
            <el-option
              v-for="item in appCertificateOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="操作者" prop="operatorSelectList">
          <el-select
            ref="operatorSelect"
            v-model="temp.operatorSelectList"
            class="select-style"
            multiple
            placeholder=""
            @focus="disableDropDownList('operatorSelect')"
          />
          <el-button
            style="margin-left: 10px;"
            type="text"
            icon="el-icon-circle-plus-outline"
            @click="handleAppUserCreate('operator')"
          >添加操作者</el-button>
        </el-form-item>

        <el-form-item label="解密者" prop="decryptorSelectList">
          <el-select
            ref="decryptorSelect"
            v-model="temp.decryptorSelectList"
            class="select-style"
            multiple
            placeholder=""
            @focus="disableDropDownList('decryptorSelect')"
          />
          <el-button
            style="margin-left: 10px;"
            type="text"
            icon="el-icon-circle-plus-outline"
            @click="handleAppUserCreate('decryptor')"
          >添加解密者</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align: right;">
        <el-button @click="appSystemFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createAppSystemData():updateAppSystemData()"
        >确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="titleMap[dialogAppUserTitle]" :visible.sync="dialogAppUserVisible">
      <div>
        <div class="filter-container">
          <el-input
            v-model="appUserListQuery.appUserName"
            placeholder="用户名"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleAppUserFilter"
          />
          <el-select
            v-model="appUserListQuery.appUserType"
            placeholder="用户类型"
            clearable
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleAppUserFilter"
          >
            <el-option v-for="item in appUserTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-select
            v-model="appUserListQuery.appSystem"
            placeholder="系统"
            clearable
            style="width: 90px"
            class="filter-item"
          >
            <el-option v-for="item in connectSystemOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleAppUserFilter"
          >搜索</el-button>
        </div>
        <div>
          <el-table
            ref="multipleAppUserTable"
            v-loading="appUserTableloading"
            :data="appUserList"
            :row-key="getRowKeys"
            element-loading-text="加载中"
            border
            fit
            highlight-current-row
          >
            <el-table-column type="selection" :reserve-selection="true" align="center" />
            <el-table-column label="用户名" align="center">
              <template slot-scope="{row}">
                <span>{{ row.appUserName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户类型" align="center">
              <template slot-scope="{row}">
                <span>{{ row.appUserType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="系统" align="center">
              <template slot-scope="{row}">
                <span>{{ row.appSystem }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <pagination
          v-show="appUserTotal>0"
          :total="appUserTotal"
          :page.sync="appUserListQuery.page"
          :limit.sync="appUserListQuery.limit"
          @pagination="getAppUserList"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleAppUserData()">取消</el-button>
        <el-button type="primary" @click="createAppUserData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchAppList,
  createApp,
  updateApp,
  deleteApp
} from '@/api/appmanagement'

import {
  fetchAppUserList
} from '@/api/appusermanagement'

import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'

export default {
  name: 'AppManagementList',
  components: {
    Pagination
  },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      appSystemList: [],
      appUserList: [],
      appSystemTotal: 0,
      appUserTotal: 0,
      appSystemListLoading: true,
      appUserTableloading: true,
      appSystemListQuery: {
        page: 1,
        limit: 5,
        appSystemName: undefined
      },
      appUserListQuery: {
        page: 1,
        limit: 5,
        appUserName: undefined,
        appSystem: undefined,
        appUserType: undefined
      },
      dialogAppUserTitle: '',
      titleMap: {
        operator: '添加操作者',
        decryptor: '添加解密者'
      },
      appSystemFormTitle: '创建应用系统',
      dialogStatus: 'create',
      appTypeOptions: ['类型1', '类型2'],
      connectSystemOptions: ['系统1', '系统2'],
      appCertificateOptions: ['证书1', '证书2'],
      appUserTypeOptions: ['通用用户', '业务用户'],
      temp: {
        appSystemName: '',
        appSystemType: '',
        appSystem: '',
        appCertificate: '',
        operatorSelectList: [],
        decryptorSelectList: [],
        appSystemStatus: 'active'
      },
      appSystemFormVisible: false,
      dialogAppUserVisible: false,
      selectItem: [],
      rules: {
        appSystemName: [
          {
            required: true,
            message: '请填写应用名称',
            trigger: 'change'
          }
        ],

        connectSystem: [
          {
            required: true,
            message: '请选择系统类型',
            trigger: 'change'
          }
        ],

        appSystemType: [
          {
            required: true,
            message: '请选择应用类型',
            trigger: 'change'
          }
        ],

        appCertificate: [
          { required: true, message: '请选择证书', trigger: 'change' }
        ],
        operatorSelectList: [
          { required: true, message: '请选择操作者', trigger: 'change' }
        ],
        decryptorSelectList: [
          { required: true, message: '请选择解密者', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    leftColMd() {
      return this.appSystemFormVisible === false ? 24 : 15
    },
    rightColMd() {
      return this.appSystemFormVisible === false ? 0 : 9
    }
  },
  created() {
    this.getAppSystemList()
  },
  methods: {
    getRowKeys(row) {
      return row.id
    },

    handleModifyStatus(row, event) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.appSystemStatus = event
    },

    getAppSystemList() {
      this.appSystemListLoading = true
      fetchAppList(this.appSystemListQuery).then((response) => {
        this.appSystemList = response.data.items
        this.appSystemTotal = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.appSystemListLoading = false
        }, 1 * 1000)
      })
    },

    handleAppSystemFilter() {
      this.appSystemListQuery.page = 1
      this.getAppSystemList()
    },

    resetTemp() {
      this.temp = {
        appName: '',
        appSystemType: '',
        appSystem: '',
        appCertificate: '',
        operatorSelectList: [],
        decryptorSelectList: [],
        status: 'active'
      }
    },

    handleAppSystemCreate() {
      this.appSystemFormTitle = '创建应用系统'
      this.resetTemp()
      this.appSystemFormVisible = true
      this.$nextTick(() => {
        this.$refs['appSystemForm'].clearValidate()
      })
    },

    handleAppSystemUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.appSystemTimestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.appSystemFormTitle = '编辑应用系统'
      this.appSystemFormVisible = true
      this.$nextTick(() => {
        this.$refs['appSystemForm'].clearValidate()
      })
    },

    createAppSystemData() {
      this.$refs['appSystemForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createApp(this.temp).then(() => {
            this.appSystemList.unshift(this.temp)
            this.appSystemFormVisible = false
            this.$notify({
              title: '创建成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    updateAppSystemData() {
      this.$refs['appSystemForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.appSystemTimestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateApp(tempData).then(() => {
            const index = this.appSystemList.findIndex((v) => v.id === this.temp.id)
            this.appSystemList.splice(index, 1, this.temp)
            this.appSystemFormVisible = false
            this.$notify({
              title: '更新成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    handleAppSystemDelete(row, index) {
      this.$confirm('确定要删除该应用系统吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteApp(row.id)
          this.appSystemList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },

    handleAppUserCreate(useType) {
      this.dialogAppUserTitle = useType
      this.dialogAppUserVisible = true
      this.getAppUserList()

      this.$nextTick(() => {
        if (this.temp.operatorSelectList.length > 0) {
          // this.selectItem.forEach(row => {
          this.$refs.multipleAppUserTable.toggleRowSelection(this.selectItem)
          // })
        } else {
          this.$refs.multipleAppUserTable.clearSelection()
        }
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    getAppUserList() {
      this.appUserTableloading = true
      fetchAppUserList(this.appUserListQuery).then((response) => {
        this.appUserList = response.data.items
        this.appUserTotal = response.data.total
        this.appUserTableloading = false
      })
    },

    handleAppUserFilter() {
      this.appUserListQuery.page = 1
      this.getAppUserList()
    },

    createAppUserData() {
      const selectName = []
      this.$refs.multipleAppUserTable.selection.forEach(element => {
        this.selectItem.push(element)
        selectName.push(element.appUserName)
      })
      if (this.dialogAppUserTitle === 'operator') {
        this.temp.operatorSelectList = selectName
      } else {
        this.temp.decryptorSelectList = selectName
      }

      // this.operatorSelectList = selectName
      this.operatorSelectDisable = false
      this.dialogAppUserVisible = false
    },

    cancleAppUserData() {
      // this.selectItem = []
      this.dialogAppUserVisible = false
    },

    disableDropDownList(select) {
      this.$refs[select].blur()
    }
  }
}
</script>

<style lang="scss">
.filter-label {
  display: inline-block;
  position: relative;
  font-size: 14px;
  color: #606266;
}
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.select-style i {
  display: none;
}
</style>
