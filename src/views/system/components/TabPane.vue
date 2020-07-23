<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="ID"
      width="65"
      element-loading-text="加载中"
    >
      <template slot-scope="{row}">
        <span>{{ row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column label="名称">
      <template slot-scope="{row}">
        <span>{{ row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" align="center" label="描述">
      <template slot-scope="{row}">
        <span>{{ row.description }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
      <template slot-scope="{row}">
        <el-button type="text" @click="handleUpdate(row)">编辑</el-button>
        <el-button type="text" style="color:red" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchConfigList,createConfig,updateConfig,deleteConfig} from '@/api/configmanagement'

export default {
  filters: {
  },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        type: this.type
      },
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchConfigList(this.listQuery).then(response => {
        this.list = response.data.items
        this.loading = false
      })
    }
  }
}
</script>

