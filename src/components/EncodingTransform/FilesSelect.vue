
<template>
  <div id="fileSelect">
    <el-transfer
      v-model="selectedFiles"
      filterable
      filter-placeholder="请输入城市拼音"
      :data="files"
      target-order="original"
      :titles="['不转码的文件', '进行转码的文件']"
    />
  </div>
  <el-button
      style="margin-left: 10px"
      size="medium"
      type="success"
      @click="finish">
  下一步
  </el-button>
</template>

<script>
export default {
  name: "FilesSelect",
  emits: ["selected"],
  props: {
    remote_baseurl: String,
  },
  data() {
    return {
      files: [],
      selectedFiles: [],
    };
  },
  methods: {
    finish() {
      console.log("selected:");
      console.dir(this.selectedFiles);

      let _selected = [];
      let _unselected = [];
      const _set = new Set(this.selectedFiles);
      // console.log("set:");
      // console.dir(_set);

      this.files.forEach(file => {
        if (_set.has(file.key)) {
          _selected.push(file.raw);
        }
        else {
          _unselected.push(file.raw);
        }
      })

      const payload = {
        selected: _selected,
        unselected: _unselected,
      };

      // console.log("payload");
      // console.dir(payload);

      this.$store.commit("setSelectedFiles", payload);

      // console.log("store:");
      // console.dir(this.$store.state);

      this.$emit("selected");
    }
  },
  mounted() {
    let _data = this.files;
    let _value = this.selectedFiles;
    // console.log("state:");
    // console.dir(this.$store.state);
    this.$store.state.encodingTransformer.selected.forEach((e) => {
      _data.push({
        key: e.fid,
        label: e.name,
        disabled: false,
        raw: e,
      });
      _value.push(e.fid);
    });
    this.$store.state.encodingTransformer.unselected.forEach((e) => {
      _data.push({
        key: e.fid,
        label: e.name,
        disabled: false,
        raw: e,
      });
    });
  },
};
</script>

<style>
#fileSelect {
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
}
.el-transfer-panel {
  text-align: start;
  width: 400px;
  height: 400px;
}
</style>
