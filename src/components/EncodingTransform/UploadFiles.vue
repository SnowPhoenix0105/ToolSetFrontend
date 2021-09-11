<template>
  <el-upload
    id="MultiFileUpload"
    ref="Upload"
    action="http://localhost:8002/file/echo_info"
    multiple
    :auto-upload=false
    :show-file-list=false
  >
    <template #trigger>
      <el-button size="medium" type="primary">选取文件夹</el-button>
    </template>
    <el-button
      style="margin-left: 10px"
      size="medium"
      type="success"
      @click="submitUpload"
      >上传</el-button
    >
    <template #tip>
      <div class="el-upload__tip">选择文件夹，将上传文件夹内所有文件</div>
    </template>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  props: {
    uploadUrl: String
  },
  mounted() {
    let MultiFileUpload = document.getElementById("MultiFileUpload");
    let el_up__input = MultiFileUpload.getElementsByTagName("input")[0];
    el_up__input.webkitdirectory = true;
    el_up__input.mozdirectory = true;
  },
  methods: {
    submitUpload() {
      console.log("submitUpload called");
      // this.$refs.Upload.submit();
      let files = this.$refs.Upload.uploadFiles;
      console.dir(files);
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i].raw);
      }
      this.$axios
        .post(this.$props.uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          function (response) {
            // 请求成功
            console.log(response.data);
          },
          function (err) {
            console.dir(err);
          }
        );
    },
  },
};
</script>

<style>
</style>
