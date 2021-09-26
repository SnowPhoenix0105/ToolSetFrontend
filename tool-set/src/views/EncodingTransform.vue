<template>
  <el-col id="mainCol">
    <el-steps :active="active" finish-status="success" :align-center="true">
      <el-step title="上传文件"></el-step>
      <el-step title="筛选文件"></el-step>
      <el-step title="设置转码信息"></el-step>
      <el-step title="下载转码后文件"></el-step>
    </el-steps>
    <!-- <el-row justify="center">
      <el-button
        style="margin-left: 10px"
        size="medium"
        type="success"
        @click="front"
      >
        上一步
      </el-button>
      <el-button
        style="margin-left: 10px"
        size="medium"
        type="success"
        @click="next"
      >
        下一步
      </el-button>
    </el-row> -->
    <el-row justify="center">
      <div id="content">
        <div id="upload-files" v-if="active == 0">
          <upload-files
            :remote_baseurl="remote_baseurl"
            @uploaded="next"
          ></upload-files>
        </div>
        <div id="files-select" v-if="active == 1">
          <files-select
            :remote_baseurl="remote_baseurl"
            @front="front" 
            @selected="next"
          ></files-select>
        </div>
        <div id="base-info" v-if="active == 2">
          <base-info
            :remote_baseurl="remote_baseurl"
            @front="front" 
            @selected="next"
          ></base-info>
        </div>
        <div id="result" v-if="active == 3">
          <result :remote_baseurl="remote_baseurl" @front="front" @back="reset"></result>
        </div>
      </div>
    </el-row>
  </el-col>
</template>

<script>
import UploadFiles from "../components/EncodingTransform/UploadFiles.vue";
import FilesSelect from "../components/EncodingTransform/FilesSelect.vue";
import BaseInfo from "../components/EncodingTransform/BaseInfo.vue";
import Result from "../components/EncodingTransform/Result.vue";

export default {
  data() {
    return {
      active: 0,
      remote_baseurl: "/api/encoding-transform",
    };
  },
  name: "EncodingTransform",
  components: {
    UploadFiles,
    FilesSelect,
    BaseInfo,
    Result,
  },
  methods: {
    reset() {
      this.active = 0;
    },
    next() {
      if (this.active < 4) {
        this.active++;
      }
    },
    front() {
      if (this.active > 0) {
        this.active--;
      }
    },
  },
};
</script>

<style scopde>
#mainCol {
  width: 100%;
  right: 10px;
}
#upload-files {
  padding-top: 50px;
}
#content {
  margin-left: 5%;
  margin-right: 5%;
}
</style>
