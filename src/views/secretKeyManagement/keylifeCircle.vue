<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyId"
        placeholder="密钥ID"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleKeyFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleKeyFilter"
      >搜索</el-button>
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
        <el-table-column label="密钥ID" align="center">
          <template slot-scope="{row}">
            <span>{{ row.keyID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="密钥名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.keyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.keyType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="长度" align="center">
          <template slot-scope="{row}">
            <span>{{ row.keyLength }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效期" align="center">
          <template slot-scope="{row}">
            <span>{{ row.keyTimestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <span>{{ row.keyStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template slot-scope="{row}">
            <span>{{ row.createTimestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="text" @click="handleUpdate(row)">延期</el-button>
            <el-button type="text" style="color:red" @click="handleDelete(row)">归档</el-button>
            <el-button type="text" style="color:red" @click="handleDelete(row)">作废</el-button>
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
</template>

<script>
import {
  fetchKeyList
} from "@/api/keymanagement";

import Pagination from "@/components/Pagination";
import { parseTime } from "@/utils";

export default {
  name: "CertificateManagementList",
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
        keyId: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchKeyList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },


    handleKeyFilter() {
      this.listQuery.page = 1;
      this.getList();
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
