<template>
  <el-row class="tac">
    <el-col :span="5">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
        unique-opened="true"
      >
        <el-menu-item index="/vueHome">
          <i class="el-icon-menu"></i>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-goods"></i>
            <span>工具箱</span>
          </template>
          <el-menu-item index="/encoding-transform">文件编码转换器</el-menu-item>
          <!-- <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group> -->
          <!-- <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu> -->
        </el-sub-menu>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="12">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>
