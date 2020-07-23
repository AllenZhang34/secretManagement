<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>连接系统配置</span>
        </div>
        <div class="filter-container">
          <el-input
            v-model="connectSystemListQuery.connectSystemName"
            placeholder="名称"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleConnectSystemFilter"
          />
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleConnectSystemFilter"
          >搜索</el-button>
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-edit"
            @click="handleConfigCreate"
          >添加连接系统</el-button>
        </div>
        <div>
          <el-table :data="connectSystemList" border style="width: 100%;">
            <el-table-column label="连接系统ID" align="center" width="220">
              <template slot-scope="{row}">
                <span>{{ row.connectSystemId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="连接系统名称" align="center" width="220">
              <template slot-scope="{row}">
                <span>{{ row.connectSystemName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="{row}">
                <span>{{ row.connectSystemDescription }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="{row}">
                <el-button type="primary" size="small" @click="handleConfigUpdate(row)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleConfigDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="connectSystemListTotal>0"
            :total="connectSystemListTotal"
            :page.sync="connectSystemListQuery.page"
            :limit.sync="connectSystemListQuery.limit"
            @pagination="getConnectSystemList"
          />
        </div>
      </el-card>
    </el-row>

    <el-row style="margin-top:30px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>应用类型配置</span>
        </div>
        <div class="filter-container">
          <el-input
            v-model="connectAppTypeListQuery.appTypeName"
            placeholder="名称"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleAppTypeFilter"
          />
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleAppTypeFilter"
          >搜索</el-button>
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-edit"
            @click="handleConfigCreate"
          >添加应用类型</el-button>
        </div>
        <div>
          <el-table :data="appTypeList" border style="width: 100%;">
            <el-table-column label="应用类型ID" align="center" width="220">
              <template slot-scope="{row}">
                <span>{{ row.appTypeId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="应用类型名称" align="center" width="220">
              <template slot-scope="{row}">
                <span>{{ row.appTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="{row}">
                <span>{{ row.appTypeDescription }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="{row}">
                <el-button type="primary" size="small" @click="handleConfigUpdate(row)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleConfigDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-row>

    <el-row style="margin-top:30px;">
      <el-card class="box-card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>服务器密码机地址配置</span>
          </div>
          <div class="filter-container">
            <el-input
              v-model="connectSystemListQuery.connectSystemName"
              placeholder="名称"
              style="width: 200px;"
              class="filter-item"
              @keyup.enter.native="handleConnectSystemFilter"
            />
            <el-button
              class="filter-item"
              type="primary"
              icon="el-icon-search"
              @click="handleConnectSystemFilter"
            >搜索</el-button>
            <el-button
              class="filter-item"
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-edit"
              @click="handleConfigCreate"
            >添加服务器密码机地址</el-button>
          </div>
          <div>
            <el-table :data="connectSystemList" border style="width: 100%;">
              <el-table-column label="服务器密码机ID" align="center" width="220">
                <template slot-scope="{row}">
                  <span>{{ row.connectSystemId }}</span>
                </template>
              </el-table-column>
              <el-table-column label="服务器密码机名称" align="center" width="220">
                <template slot-scope="{row}">
                  <span>{{ row.connectSystemName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="描述" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.connectSystemDescription }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                  <el-button type="primary" size="small" @click="handleConfigUpdate(row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="handleConfigDelete(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-card>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="角色名称">
          <el-input v-model="temp.rolename" />
        </el-form-item>

        <el-form-item label="描述">
          <el-input
            v-model="temp.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
          />
        </el-form-item>

        <el-form-item label="权限对象">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { parseTime } from "@/utils";
export default {
  name: "ConfigmanagementList",
  components: {
    Pagination,
  },
  filters: {
    parseTime: parseTime,
  },
  data() {
    return {
      connectSystemListTotal: 0,
      connectSystemList: [],
      appTypeList: [],
      connectSystemListQuery: {},
      connectAppTypeListQuery: {},
      dialogFormVisible: false,
      textMap: {
        update: "编辑用户",
        create: "创建用户",
      },
      temp: {
        id: undefined,
        type: "",
        name: "",
        description: "",
      },
      dialogStatus: "",
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        name: [
          { required: true, message: "请输入用户名称", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getConnectSystemList();
  },
  methods: {
    handleConnectSystemFilter() {},
    handleConfigCreate() {},
    handleAppTypeFilter() {},
    getConnectSystemList() {},
  },
};
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item {
  min-height: 100px;
}
</style>
