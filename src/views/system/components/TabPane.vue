<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="ID"
      width="65"
      element-loading-text="请给我点时间！"
    >
      <template slot-scope="{row}">
        <span>{{ row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Title">
      <template slot-scope="{row}">
        <span>{{ row.title }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" align="center" label="Author">
      <template slot-scope="{row}">
        <span>{{ row.description }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import { fetchConfigList } from '@/api/article'

// export default {
//   filters: {
//     statusFilter(status) {
//       const statusMap = {
//         published: 'success',
//         draft: 'info',
//         deleted: 'danger'
//       }
//       return statusMap[status]
//     }
//   },
//   props: {
//     type: {
//       type: String,
//       default: 'CN'
//     }
//   },
//   data() {
//     return {
//       list: null,
//       listQuery: {
//         page: 1,
//         limit: 5,
//         type: this.type,
//         sort: '+id'
//       },
//       loading: false
//     }
//   },
//   created() {
//     this.getList()
//   },
//   methods: {
//     getList() {
//       this.loading = true
//       this.$emit('create') // for test
//       fetchList(this.listQuery).then(response => {
//         this.list = response.data.items
//         this.loading = false
//       })
//     }
//   }
// }
</script>

