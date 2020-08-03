<template>
  <div>
    <div class="filter-container">
      <el-input
        v-model="configListQuery.configName"
        placeholder="名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleConfigListFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleConfigListFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleConfigCreate"
      >{{ createTitle }}</el-button>
    </div>
    <div>
      <el-table :data="configList" border style="width: 100%;">
        <el-table-column label="连接系统ID" align="center" width="220">
          <template slot-scope="{row}">
            <span>{{ row.configId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="连接系统名称" align="center" width="220">
          <template slot-scope="{row}">
            <span>{{ row.configName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="{row}">
            <span>{{ row.configDescription }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="220">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" @click="handleConfigUpdate(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleConfigDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="configListTotal>0"
        :total="configListTotal"
        :auto-scroll="false"
        :page.sync="configListQuery.page"
        :limit.sync="configListQuery.limit"
        @pagination="getConfigList"
      />
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="名称" prop="configName">
          <el-input v-model="temp.configName" />
        </el-form-item>

        <el-form-item label="描述" prop="configDescription">
          <el-input
            v-model="temp.configDescription"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createConfig():updateConfig()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'ConfigTable',
  components: {
    Pagination
  },
  props: {
    createTitle: {
      type: String,
      default: ''
    },
    configList: {
      type: Array,
      default: () => []
    },
    configListQuery: {
      type: Object,
      default: () => ({ page: 1, limit: 5, configName: undefined })
    },
    configListTotal: {
      type: Number,
      default: 0
    }

  },
  data() {
    return {

      temp: {
        configId: '',
        configName: '',
        configDescription: ''

      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        configName: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        configDescription: [
          { required: true, message: '请输入描述', trigger: 'change' }
        ]
      }

    }
  },
  computed: {

  },
  methods: {
    handleConfigListFilter() {
      this.$emit('configListFilter', this.configListQuery)
    },
    resetTemp() {
      this.temp = {
        configId: undefined,
        configName: '',
        configDescription: ''
      }
    },
    handleConfigCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getConfigList() {
      this.$emit('configListFilter', this.configListQuery)
    },
    createConfig() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$emit('createConfig', this.temp)
          this.dialogFormVisible = false
        }
      })
    },

    handleConfigUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateConfig() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.$emit('updateConfig', tempData)
          this.dialogFormVisible = false
        }
      })
    },
    handleConfigDelete(row, index) {
      this.$emit('deleteConfig', row.configId, index)
    }

  }
}
</script>

<style scoped>

</style>
