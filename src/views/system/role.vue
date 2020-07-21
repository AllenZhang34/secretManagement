<template>
  <div class="app-container">
    <el-button
      class="filter-item"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-upload"
      @click="handleRoleCreate"
    >创建角色</el-button>

    <div>
      <el-table
        :data="roleList"
        border
        style="width: 100%;margin-top:30px;"
      >
        <el-table-column label="角色ID" align="center" width="220">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" align="center" width="220">
          <template slot-scope="{row}">
            <span>{{ row.rolename }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="{row}">
            <span>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" @click="handleRoleUpdate(row)">编辑</el-button>
            <el-button type="danger" size="small"  @click="handleRoleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
          <el-input v-model="temp.roleobject" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createRoleData():updateRoleData()"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole
} from "@/api/rolemanagement";

const defaultRole = {
  id: undefined,
  rolename: "",
  description: "",
  roleobject: ""
};

export default {
  name: "RolemanagementList",
  data() {
    return {
      temp: Object.assign({}, defaultRole),
      roleList: null,
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑角色",
        create: "创建角色"
      },
      rules: {
        rolename: [
          {
            required: true,
            message: "role name is required",
            trigger: "change"
          }
        ],
        /*timestamp: [
						{
							type: "date",
							required: true,
							message: "timestamp is required",
							trigger: "change"
						}
					],*/
        description: [
          {
            required: true,
            message: "description is required",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    async getRoles() {
      const res = await getRoles();
      this.roleList = res.data;
    },

    handleRoleCreate() {
      this.temp = Object.assign({}, defaultRole);
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },

    handleRoleUpdate(row, index) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },

    async createRoleData() {
      await createRole(this.temp);
      this.roleList.unshift(this.temp);
      this.dialogFormVisible = false;
      const { description, rolename, roleobject } = this.temp;
      this.$notify({
        title: "Success",
        dangerouslyUseHTMLString: true,
        message: `
            <div>角色名称: ${rolename}</div>
            <div>角色描述: ${description}</div>
            <div>权限对象: ${roleobject}</div>
          `,
        type: "success"
      });
    },

    async updateRoleData() {
      const tempData = Object.assign({}, this.temp);
      await updateRole(tempData);
      const index = this.roleList.findIndex(v => v.id === this.temp.id);
      this.roleList.splice(index, 1, this.temp);
      this.dialogFormVisible = false;
      this.$notify({
        title: "更新成功",
        message: "更新成功",
        type: "success",
        duration: 2000
      });
    },

    handleRoleDelete(row, index) {
      this.$confirm("确定要删除该角色吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await deleteRole(row.id);
          this.roleList.splice(index, 1);
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
