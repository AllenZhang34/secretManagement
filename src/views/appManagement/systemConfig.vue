<template>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="应用名称" prop="appName">
          <el-input v-model="temp.appName" tabindex="1" placeholder="请输入应用名称"/>
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
            v-model="temp.operatorValue"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请选择操作者"
            :remote-method="remoteGetOperatorMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in operatorOptions"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="解密者" prop="appDecryptor">
          <el-select
            v-model="temp.decryptorValue"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请选择解密者"
            :remote-method="remoteGetDecryptorMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in decryptorOptions"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createAppData():updateAppData()"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchAppList,
  fetchApp,
  createApp,
  updateApp,
  deleteApp
} from "@/api/appmanagement";

import Pagination from "@/components/Pagination";
import { parseTime } from "@/utils";

export default {
  name: "AppManagementList",
  components: {
    Pagination
  },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        appName: undefined
      },
      textMap: {
        update: "编辑应用系统",
        create: "创建应用系统"
      },
      dialogStatus: "",
      appTypeOptions: ["类型1", "类型2"],
      appSystemOptions: ["系统1", "系统2"],
      appCertificateOptions: ["证书1", "证书2"],
      operatorStates: [
        "Allen",
        "Star",
        "Hart",
        "Melissa",
        "California",
        "Colorado"
      ],
      decryptorStates: [
        "Allen",
        "Star",
        "Hart",
        "Melissa",
        "California",
        "Colorado"
      ],
      operatorList: [],
      decryptorList: [],
      operatorOptions: [],
      decryptorOptions: [],
      loading: false,
      temp: {
        appName: "",
        appType: "",
        appSystem: "",
        appCertificate: "",
        operatorValue: [],
        decryptorValue: [],
        status: "active"
      },
      dialogFormVisible: false,
      rules: {
        appName: [
          {
            required: true,
            message: "请填写应用名称",
            trigger: "change"
          }
        ],

        appSystem: [
          {
            required: true,
            message: "请选择系统类型",
            trigger: "change"
          }
        ],

        appType: [
          {
            required: true,
            message: "请选择应用类型",
            trigger: "change"
          }
        ],

        appCertificate: [
          { required: true, message: "请选择证书", trigger: "change" }
        ],
        operatorValue: [
          { required: true, message: "请选择操作者", trigger: "change" }
        ],
        decryptorValue: [
          { required: true, message: "请选择解密者", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
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
    remoteGetOperatorMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.operatorOptions = this.operatorStates.filter(item => {
            return item.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.operatorOptions = [];
      }
    },

    remoteGetDecryptorMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.decryptorOptions = this.decryptorStates.filter(item => {
            return item.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.decryptorOptions = [];
      }
    },

    handleModifyStatus(row, event) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = event;
    },

    getList() {
      this.listLoading = true;
      fetchAppList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1 * 1000);
      });
    },

    handleAppFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    resetTemp() {
      this.temp = {
        appName: "",
        appType: "",
        appSystem: "",
        appCertificate: "",
        operatorValue: "",
        decryptorValue: "",
        status: "active"
      };
    },

    handleAppCreate() {
      this.resetTemp();
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    createAppData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          createApp(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "创建成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },

    updateAppData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateApp(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "更新成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },

    handleDelete(row, index) {
      this.$confirm("确定要删除该应用系统吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await deleteApp(row.id);
          this.list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
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
</style>
