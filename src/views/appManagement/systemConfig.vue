<template>
  <div class="mixin-components-container">
    <el-row :gutter="10">
      <el-col :md="leftColMd">
        <el-card class="box-card">
          <div class="app-container">
            <div class="filter-container">
              <el-input
                v-model="listQuery.appName"
                placeholder="应用名称"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleAppFilter"
              />
              <el-button
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                @click="handleAppFilter"
              >搜索</el-button>
              <el-button
                class="filter-item"
                style="margin-left: 10px;"
                type="primary"
                icon="el-icon-edit"
                @click="handleAppCreate"
              >添加应用系统</el-button>
            </div>
            <div>
              <el-table
                v-loading="listLoading"
                :data="list"
                element-loading-text="拼命加载中"
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
                    <span>{{ row.appName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="应用类型" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.appType }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="系统" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.appSystem }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                  <template slot-scope="{row}">
                    <el-switch
                      v-model="row.status"
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
                    <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                  <template slot-scope="{row}">
                    <el-button type="text" @click="handleUpdate(row)">编辑</el-button>
                    <el-button type="text" style="color:red" @click="handleDelete(row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <pagination
              v-show="total>0"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="getList"
            />
          </div>
        </el-card>
      </el-col>
      <el-col v-if="dialogFormVisible" :md="rightColMd">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <div style="text-align: right;">
              <el-button style="padding: 0px;" type="text" icon="el-icon-circle-close" @click="hideFrom" />
            </div>
            <span>{{ formTitle }}</span>

          </div>
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-position="left"
            label-width="90px"
            style="width: 400px; margin-left:50px;"
          >
            <el-form-item label="应用名称" prop="appName">
              <el-input v-model="temp.appName" placeholder="请输入应用名称" />
            </el-form-item>

            <el-form-item label="应用类型" prop="appType">
              <el-select v-model="temp.appType" class="filter-item" placeholder="请选择应用类型">
                <el-option v-for="item in appTypeOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>

            <el-form-item label="系统" prop="appSystem">
              <el-select v-model="temp.appSystem" class="filter-item" placeholder="请选择系统类型">
                <el-option v-for="item in appSystemOptions" :key="item" :label="item" :value="item" />
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

            <el-form-item label="操作者" prop="appOperator">
              <el-select
                v-model="operatorSelect"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请添加操作者"
                :remote-method="getAppUserListList"
                :loading="appUserListLoading"
              >
                <el-option
                  v-for="item in appUserList"
                  :key="item.id"
                  :label="item.appUserName"
                  :value="item.id"
                />
              </el-select>
              <el-button
                style="margin-left: 10px;"
                type="text"
                icon="el-icon-circle-plus-outline"
                @click="handleAppUserCreate('operator')"
              >添加操作者</el-button>
            </el-form-item>

            <el-form-item label="解密者" prop="appDecryptor">
              <el-select
                v-model="decryptorSelect"
                multiple
                placeholder="请添加解密者"
                @focus="handleSelect('decryptorSelect')"
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
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="dialogStatus==='create'?createAppData():updateAppData()"
            >确认</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
            <el-option v-for="item in appSystemOptions" :key="item" :label="item" :value="item" />
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
            ref="multipleTable"
            v-loading="appUserListLoading"
            :data="appUserList"
            :row-key="getRowKeys"
            element-loading-text="拼命加载中"
            border
            fit
            highlight-current-row
            @selection-change="handleSelectionChange"
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
          @pagination="getAppUserListList"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAppUserVisible = false">取消</el-button>
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
      list: [],
      appUserList: [],
      total: 0,
      appUserTotal: 0,
      listLoading: true,
      appUserListLoading: true,
      listQuery: {
        page: 1,
        limit: 5,
        appName: undefined
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
      formTitle: '创建应用系统',
      dialogStatus: 'create',
      appTypeOptions: ['类型1', '类型2'],
      appSystemOptions: ['系统1', '系统2'],
      appCertificateOptions: ['证书1', '证书2'],
      appUserTypeOptions: ['通用用户', '业务用户'],
      operatorList: [],
      decryptorList: [],
      operatorOptions: [],
      decryptorOptions: [],
      loading: false,
      temp: {
        appName: '',
        appType: '',
        appSystem: '',
        appCertificate: '',
        operatorValue: [],
        decryptorValue: [],
        status: 'active'
      },
      dialogFormVisible: false,
      dialogAppUserVisible: false,
      operatorSelect: [],
      decryptorSelect: [],
      rules: {
        appName: [
          {
            required: true,
            message: '请填写应用名称',
            trigger: 'change'
          }
        ],

        appSystem: [
          {
            required: true,
            message: '请选择系统类型',
            trigger: 'change'
          }
        ],

        appType: [
          {
            required: true,
            message: '请选择应用类型',
            trigger: 'change'
          }
        ],

        appCertificate: [
          { required: true, message: '请选择证书', trigger: 'change' }
        ],
        operatorValue: [
          { required: true, message: '请选择操作者', trigger: 'change' }
        ],
        decryptorValue: [
          { required: true, message: '请选择解密者', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    leftColMd() {
      return this.dialogFormVisible === false ? 24 : 15
    },
    rightColMd() {
      return this.dialogFormVisible === false ? 0 : 9
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    // this.operatorList = this.operatorStates.map(item => {
    //   return { operatorValue: `value:${item}`, label: `label:${item}` };
    // });
    // this.decryptorList = this.decryptorStates.map(item => {
    //   return { decryptorValue: `value:${item}`, label: `label:${item}` };
    // });
  },
  methods: {
    getRowKeys(row) {
      return row.id
    },

    remoteGetOperatorMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.operatorOptions = this.operatorStates.filter((item) => {
            return item.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.operatorOptions = []
      }
    },

    remoteGetDecryptorMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.decryptorOptions = this.decryptorStates.filter((item) => {
            return item.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.decryptorOptions = []
      }
    },

    handleModifyStatus(row, event) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = event
    },

    getList() {
      this.listLoading = true
      fetchAppList(this.listQuery).then((response) => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },

    handleAppFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    resetTemp() {
      this.temp = {
        appName: '',
        appType: '',
        appSystem: '',
        appCertificate: '',
        operatorValue: '',
        decryptorValue: '',
        status: 'active'
      }
    },

    handleAppCreate() {
      this.formTitle = '创建应用系统'
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.formTitle = '编辑应用系统'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createAppData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createApp(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
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

    updateAppData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateApp(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
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

    handleDelete(row, index) {
      this.$confirm('确定要删除该应用系统吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteApp(row.id)
          this.list.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    hideFrom() {
      this.dialogFormVisible = false
    },
    handleAppUserCreate(useType) {
      this.dialogAppUserTitle = useType
      this.dialogAppUserVisible = true
      this.getAppUserListList()
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection()
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    getAppUserListList(query) {
      const that = this
      if (query && query.length > 0) {
        this.appUserListQuery.appUserName = query
      }
      fetchAppUserList(this.appUserListQuery).then((response) => {
        that.appUserList = response.data.items
        that.appUserTotal = response.data.total
        that.appUserListLoading = false
        if (!query && that.operatorSelect.length > 0) {
          that.appUserList.forEach(element => {
            that.operatorSelect.forEach(item => {
              if (element.id === item) {
                that.$refs.multipleTable.toggleRowSelection(element)
              }
            })
          })
        }
      })
    },

    handleAppUserFilter() {
      this.appUserListQuery.page = 1
      this.getAppUserListList()
    },

    createAppUserData() {
      const selectName = []
      this.multipleSelection.forEach(element => {
        selectName.push(element.appUserName)
      })
      this.temp.operatorValue = selectName
      console.log(this.$refs.multipleTable)
    },

    handleSelect(type) {
      console.log(type)
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  background-color: #f2f3f5;
}
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
</style>
