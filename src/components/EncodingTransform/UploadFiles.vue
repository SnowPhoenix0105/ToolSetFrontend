<template>
  <el-upload
    id="MultiFileUpload"
    ref="Upload"
    action="http://localhost:8002/file/echo_info"
    multiple
    :auto-upload="false"
    @change="() => selected=true"
  >
    <template #trigger>
      <el-button size="medium" type="primary">选取文件夹</el-button>
    </template>
    <el-button
      style="margin-left: 10px"
      size="medium"
      type="success"
      @click="submitUpload"
      :disabled="!selected"
      >上传</el-button
    >
    <template #tip>
      <div class="el-upload__tip">选择文件夹，将上传文件夹内所有文件</div>
    </template>
  </el-upload>
</template>

<script>
import { ensureLoginAsync } from '../../utils/user';
export default {
  name: "UploadFiles",
  data() {
    return {
      fileList: [],
      selected: false,
    };
  },
  props: {
    remote_baseurl: String,
  },
  emits: ["uploaded"],
  mounted() {
    let MultiFileUpload = document.getElementById("MultiFileUpload");
    let el_up__input = MultiFileUpload.getElementsByTagName("input")[0];
    el_up__input.webkitdirectory = true;
    el_up__input.mozdirectory = true;
  },
  methods: {
    async submitUpload() {
      // console.log("submitUpload called");
      // this.$refs.Upload.submit();
      let files = this.$refs.Upload.uploadFiles;
      if (files.length < 1) {
        this.$notify({
          title: "错误",
          message: "上传的文件夹为空，或未进行上传",
          type: 'error',
        });
        return;
      }
      // console.dir(files);
      // console.dir(this.$store);
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i].raw);
      }
      let store = this.$store;
      await ensureLoginAsync(store);
      let response = await this.$axios.post(this.$props.remote_baseurl + "/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + store.state.userCenter.accessToken,
        },
      });
      // console.log("response:");
      // console.dir(response.data);
      const payload = {
        selected: response.data.selected,
        unselected: response.data.unselected,
      };
      // console.log("payload in caller:");
      // console.dir(payload);
      this.$store.commit("setSelectedFiles", payload);
      this.$emit('uploaded');
      // console.log("store.state")
      // console.dir(this.$store.state);
    },
  },
};
</script>

<style>
</style>
