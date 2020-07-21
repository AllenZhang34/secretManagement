<template>
  <div class="app-container">
    <div class="filter-container">
      <span class="filter-label">证书名称:</span>
      <el-input v-model="value" placeholder="请输入" style="width:300px;margin-right: 10px;" />
      <span class="filter-label">证书类型:</span>
      <el-select v-model="value" placeholder="请选择" style="margin-right: 10px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span class="filter-label">有效期:</span>
      <el-date-picker
        v-model="value7"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2"
        style="margin-right: 10px;"
      />
      <el-button type="text" style="margin-right;">清除</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>

    </div>
    <div class="filter-container" style="margin-bottom: 10px;">
      <el-button class="filter-item" type="primary" icon="el-icon-upload" @click="handleUpload">
        添加证书
      </el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="address"
          label="证书名称"
        />
        <el-table-column
          prop="date"
          label="证书类型"
          width="180"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="navifateTo()">{{ scope.row.date }}
            </el-button></template>
        </el-table-column>
        <el-table-column label="状态" align="center" min-width="80px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enabled" :active-value="true" :inactive-value="false" @change="handleChangeStatus($event,scope.row)" />
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="有效期"
        />
        <el-table-column
          prop="address"
          label="创建时间"
        />
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="text" @click="handleUpdate(row)">
              下载证书
            </el-button>
            <el-button v-if="row.status!='deleted'" type="text" style="color:red" @click="handleDelete(row)">
              替换证书
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>

</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'DataentryList',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        pageSize: 10,
        name: '',
        pageIndex: 1
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    navifateTo() {
      this.$router.push({
        path: `/fitness/dataEntryDetail`
      })
    },
    handleUpload() {
      this.$router.push({
        path: `/fitness/upload`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body{
    background-color: #f2f3f5;
}
.filter-label{
    display:inline-block;
    position: relative;
    font-size: 14px;
    color: #606266;
}
</style>
