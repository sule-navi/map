<!--
 * @Author: Sule
 * @Date: 2021-04-08 13:50:14
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-08 15:45:57
 * @Description: 
-->
<template>
  <div class="wrappers" v-loading="state.loading">
    <div class="container-top">
      <span class="database-text">我是列表</span>
      <el-button type="primary" size="mini">按钮1</el-button>
      <el-button type="danger" class="top-btn" size="mini">按钮2</el-button>
      <el-input placeholder="请搜索" class="search-input" clearable>
        <template #append>
          <el-button icon="el-icon-search"></el-button>
        </template>
      </el-input>
    </div>
    <el-table
      ref="tableData"
      :data="state.tableData"
      height="85%"
      border
      highlight-current-row
      style="width: 100%; height: 85%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="idx" width="50" label="序号"></el-table-column>
      <el-table-column label="名称" width="180">
        <template #default="scope">
          <span class="listName"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
          <el-button size="mini" type="primary" plain>操作按钮</el-button>
      </el-table-column>
    </el-table>
    <div class="container-bottom">
        <el-button type="primary" size="mini" class="top-btn">底部按钮</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      loading: true,
      tableData: [],
      multipleSelection: [],
    });
    const handleSelectionChange = (val) => {
      state.multipleSelection = val;
    };
    onMounted(() => {
       state.loading = false;
       state.tableData = [
        {
          idx: 1,
          name: "我是标题1，哈哈哈哈",
        },
        {
          idx: 2,
          name: "我是标题2，哈哈哈哈",
        },
        {
          idx: 3,
          name: "我是标题3，哈哈哈哈",
        },
      ];
    })
    return {
      state,
      handleSelectionChange,
    };
  },
};
</script>
<style scoped>
.wrappers {
  height: 100%;
  padding-bottom: 30px;
}
.container-top {
  width: 100%;
  height: 60px;
  background-color: #fff;
}
.database-text {
  float: left;
  line-height: 60px;
  margin-left: 10px;
}
.search-input {
  width: 300px;
  float: right;
  margin-top: 15px;
  margin-right: 2px;
}
.top-btn {
  margin-left: 20px;
  margin-top: 14px;
}
.container-bottom {
  height: 55px;
  background-color: #fff;
}
.el-pagination {
  float: right;
  margin-top: 14px;
  margin-right: 20px;
}
.listName {
  color: #3a8ee6;
  cursor: pointer;
}

.listRedName {
  color: #fc2020;
  cursor: pointer;
}
</style>
