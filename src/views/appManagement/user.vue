<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.appUserName"
        placeholder="用户名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleAppUserFilter"
      />
      <el-select
        v-model="listQuery.appUserType"
        placeholder="用户类型"
        clearable
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleAppUserFilter"
      >
        <el-option v-for="item in appUserTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select
        v-model="listQuery.appSystem"
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
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleAppUserCreate"
      >添加用户</el-button>
    </div>
    <div class="filter-container" style="margin-bottom: 10px;">
      <!--<el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-document"
        @click="handleAppUserUpload"
      >批量上传</el-button>
      <el-input
        v-model="filename"
        placeholder="请输入文件名称（默认：应用用户列表）"
        style="width:250px;"
        prefix-icon="el-icon-document"
      />-->
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleAppUserExportTemplate"
      >下载模板</el-button>
      <upload-excel-component
        class="filter-item"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      />
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-key"
        @click="handleAppUserGenerateKey"
      >生成密钥</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="danger"
        icon="el-icon-delete"
        @click="handleAppUserDelete"
      >删除用户</el-button>
    </div>

    <div>
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="list"
        element-loading-text="拼命加载中"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" />
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
        <el-table-column label="签名密钥对" align="center">
          <template slot-scope="{row}">
            <el-tag :type="row.signaturekey | keyFilter">{{ row.signaturekey }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="加密密钥对" align="center">
          <template slot-scope="{row}">
            <el-tag :type="row.encryptionkey | keyFilter">{{ row.encryptionkey }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template slot-scope="{row}">
            <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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

    <el-dialog title="添加应用用户" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="用户名" prop="appUserName">
          <el-input v-model="temp.appUserName" />
        </el-form-item>

        <el-form-item label="用户类型" prop="appUserType">
          <el-select v-model="temp.appUserType" class="filter-item" placeholder="请选择用户类型">
            <el-option v-for="item in appUserTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="系统类型" prop="appSystem">
          <el-select v-model="temp.appSystem" class="filter-item" placeholder="请选择系统类型">
            <el-option v-for="item in appSystemOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createAppUserData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchAppUserList,
  fetchAppUser,
  createAppUser,
  updateAppUser,
  deleteAppUser,
} from "@/api/appusermanagement";

import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import Pagination from "@/components/Pagination";
import { parseTime } from "@/utils";

export default {
  name: "AppUserManagementList",
  components: {
    Pagination,
    UploadExcelComponent,
  },
  filters: {
    keyFilter(key) {
      const keyMap = {
        none: "info",
        generate: "success",
        archive: "danger",
      };
      return keyMap[key];
    },
    parseTime: parseTime,
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      filename: "应用用户模板",
      multipleSelection: [],
      listQuery: {
        page: 1,
        limit: 20,
        appUserName: undefined,
        appSystem: undefined,
        appUserType: undefined,
      },
      appUserTypeOptions: ["通用用户", "业务用户"],
      appSystemOptions: ["系统1", "系统2"],
      temp: {
        id: undefined,
        appUserName: "",
        appUserType: "",
        appSystem: "",
        timestamp: new Date(),
      },
      dialogFormVisible: false,
      rules: {
        appUserName: [
          {
            required: true,
            message: "user name is required",
            trigger: "change",
          },
        ],

        appUserType: [
          {
            required: true,
            message: "user type is required",
            trigger: "change",
          },
        ],

        appSystem: [
          { required: true, message: "system is required", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchAppUserList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },

    handleAppUserFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    resetTemp() {
      this.temp = {
        id: undefined,
        appUserName: "",
        appUserType: "",
        appSystem: "",
        timestamp: new Date(),
      };
    },

    handleAppUserCreate() {
      this.resetTemp();
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    createAppUserData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          createAppUser(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "创建成功",
              message: "创建成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleAppUserExportTemplate() {
            
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = [
            "用户名",
            "用户类型",
            "系统",
            "签名密钥对",
            "加密密钥对",
            "日期"
          ];
          const data = [];
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          });
          this.$refs.multipleTable.clearSelection();
          this.downloadLoading = false;
        });
     
    },
    // handleAppUserExport() {
    //   if (this.multipleSelection.length) {
    //     this.downloadLoading = true;
    //     import("@/vendor/Export2Excel").then(excel => {
    //       const tHeader = [
    //         "用户名",
    //         "用户类型",
    //         "系统",
    //         "签名密钥对",
    //         "加密密钥对",
    //         "日期"
    //       ];
    //       const filterVal = [
    //         "appUserName",
    //         "appUserType",
    //         "appSystem",
    //         "signaturekey",
    //         "encryptionkey",
    //         "timestamp"
    //       ];
    //       const list = this.multipleSelection;
    //       const data = this.formatJson(filterVal, list);
    //       excel.export_json_to_excel({
    //         header: tHeader,
    //         data,
    //         filename: this.filename
    //       });
    //       this.$refs.multipleTable.clearSelection();
    //       this.downloadLoading = false;
    //     });
    //   } else {
    //     this.$message({
    //       message: "请选择一条应用用户信息",
    //       type: "warning"
    //     });
    //   }
    // },

    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },

    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },

    handleSuccess({ results, header }) {
      let aData = [];
      debugger;
      results.forEach((item) => {
        debugger;
        let oUploadData = {
          appUserName: item["用户名"],
          appUserType: item["用户类型"],
          appSystem: item["系统"],
          signaturekey: item["签名密钥对"],
          encryptionkey: item["加密密钥对"],
          timestamp: item["日期"],
        };
        aData.push(oUploadData);
      });
      this.list = aData.concat(this.list);
    },

    handleAppUserGenerateKey() {
      console.log("生成密钥");
    },

    handleAppUserDelete(row, index) {
      this.$confirm("确定要删除该用户吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteUser(row.id);
          this.list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
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
