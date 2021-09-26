<template>
  <el-col>
    <el-row justify="center">
      <el-col :span="18">
        <div id="buttons">
      <el-button
        style="margin-left: 10px"
        size="medium"
        type="info"
        plain
        @click="$emit('front')"
      >
        上一步
      </el-button>
          <el-button
            style="margin-left: 10px"
            size="medium"
            type="primary"
            @click="download"
            >下载转码zip</el-button
          >

          <el-button
            style="margin-left: 10px"
            size="medium"
            type="success"
            @click="$emit('back')"
            :disabled="!downloaded"
            >完成</el-button
          >
        </div>
      </el-col>
    </el-row>
    <div id="resultTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        header-cell-style="text-align: center;"
      >
        <el-table-column
          prop="encoding"
          label="编码"
          width="80%"
          align="left"
        ></el-table-column>
        <el-table-column prop="name" label="文件" width="400%" align="left">
        </el-table-column>
      </el-table>
    </div>
  </el-col>
</template>

<script>
export default {
  name: "Result",
  props: {
    remote_baseurl: String,
  },
  emits: ["front", "back"],
  data() {
    return {
      tableData: [],
      downloaded: false,
    };
  },
  async mounted() {
    const resultMap = this.$store.state.encodingTransformer.result;
    for (const [name, encoding] of resultMap) {
      this.tableData.push({ name, encoding });
    }
  },
  methods: {
    async download() {
      this.downloaded = true;
      const response = await this.$axios.get(
        this.$props.remote_baseurl + "/file/download",
        {
          headers: {
            Authorization: "Bearer " + this.$store.state.userCenter.accessToken,
          },
          responseType: "blob",
        }
      );

      console.log("response");
      console.dir(response);

      // 提取文件名
      const fileName =
        response.headers["content-disposition"].match(/filename=(.*)/)[1];
      // 将二进制流转为blob
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
        window.navigator.msSaveBlob(blob, decodeURI(fileName));
      } else {
        // 创建新的URL并指向File对象或者Blob对象的地址
        const blobURL = window.URL.createObjectURL(blob);
        // 创建a标签，用于跳转至下载链接
        const tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", decodeURI(fileName));
        // 兼容：某些浏览器不支持HTML5的download属性
        if (typeof tempLink.download === "undefined") {
          tempLink.setAttribute("target", "_blank");
        }
        // 挂载a标签
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        // 释放blob URL地址
        window.URL.revokeObjectURL(blobURL);
      }
    },
  },
};
</script>

<style>
#resultTable {
  /* margin-left: 20%;
  margin-right: 30%; */
  text-align: center;
}
#buttons {
  margin-top: 5%;
}
</style>