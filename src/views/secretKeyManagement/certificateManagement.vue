<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.certificateName"
        placeholder="证书名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handlCertificateFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handlCertificateFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCertificateCreate"
      >添加证书</el-button>
    </div>
    <div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="拼命加载中"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="证书名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.certificateName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="证书类型" align="center">
          <template slot-scope="{row}">
            <el-tag
              effect="plain"
              :type="row.certificateType | certificateTypeFilter"
            >{{ row.certificateType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="系统" align="center">
          <template slot-scope="{row}">
            <span>{{ row.appSystem }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <el-tag
              :type="row.certificateStatus | certificateStatusFilter"
            >{{ row.certificateStatus }}</el-tag>
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
            <el-button type="text" @click="handleCertificateUpdate(row)">替换证书</el-button>
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
        <el-form-item label="证书名称" prop="certificateName">
          <el-input v-model="temp.certificateName" tabindex="1" placeholder="请输入证书名称" />
        </el-form-item>

        <el-form-item label="证书类型" prop="certificateType">
          <el-select v-model="temp.certificateType" class="filter-item" placeholder="请选择证书类型">
            <el-option
              v-for="item in certificateTypeOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="证书上传" prop="certificateUpload">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeCertificateUpload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createCertificateData():updateCertificateData()"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchCertificateList,
  createCertificate,
  updateCertificate
} from "@/api/certificatemanagement";

import Pagination from "@/components/Pagination";
import { parseTime } from "@/utils";

export default {
  name: "CertificateManagementList",
  components: {
    Pagination
  },
  filters: {
    certificateTypeFilter(type) {
      const typeMap = {
        应用证书: "",
        用户证书: "warning"
      };
      return typeMap[type];
    },
    certificateStatusFilter(status) {
      const statusMap = {
        有效: "success",
        失效: "danger"
      };
      return statusMap[status];
    },
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
        update: "替换证书",
        create: "添加证书"
      },
      dialogStatus: "",
      certificateTypeOptions: ["应用证书", "用户证书"],
      temp: {
        certificateName: "",
        certificateType: "",
        appSystem:"系统1",
        certificateStatus:"有效"
      },
      dialogFormVisible: false,
      rules: {
        certificateName: [
          {
            required: true,
            message: "请填写证书名称",
            trigger: "change"
          }
        ],

        certificateType: [
          {
            required: true,
            message: "请选择证书",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    beforeCertificateUpload(file) {
      console.log(file);
    },

    getList() {
      this.listLoading = true;
      fetchCertificateList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1 * 1000);
      });
    },

    handlCertificateFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    resetTemp() {
      this.temp = {
        certificateName: "",
        certificateType: "",
        appSystem:"",
        certificateStatus:""
      };
    },

    handleCertificateCreate() {
      this.resetTemp();
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    handleCertificateUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      //this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    createCertificateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.certificateTimestamp = new Date(this.temp.timestamp);
          this.temp.timestamp = new Date(this.temp.timestamp);
          createCertificate(this.temp).then(() => {
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

    updateCertificateData() {
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
