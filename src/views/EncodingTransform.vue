<template>
  <el-button style="margin-top: 12px" @click="front">上一步</el-button>
  <el-button style="margin-top: 12px" @click="next">下一步</el-button>
  <el-steps 
    :active="active" 
    finish-status="success" 
    :align-center="true"
    >
    <el-step title="步骤 1"></el-step>
    <el-step title="步骤 2"></el-step>
    <el-step title="步骤 3"></el-step>
  </el-steps>
  <div id="upload-files" v-if="active==0">
    <upload-files :uploadUrl="upload_url"></upload-files>
  </div>
</template>

<script>
import UploadFiles from "../components/EncodingTransform/UploadFiles.vue";

export default {
  data() {
    return {
      active: 0,
      upload_url: "http://localhost:8002/file/echo_info",
    };
  },
  name: "EncodingTransform",
  components: { UploadFiles },
  methods: {
    next() {
      if (this.active < 2) {
        this.active++;
      }
    },
    front() {
      if (this.active > 0) {
        this.active--;
      }
    },
  }
};
</script>

<style>
#upload-files {
  padding-top: 100px;
}

</style>