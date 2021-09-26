<template>
  <el-col>
    <el-row>
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
    </el-row>
    <el-row justify="center">
      <el-col :offset="3" :span="8">
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
          type="success"
          @click="finish"
        >
          下一步
        </el-button>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
export default {
  name: "FilesSelect",
  emits: ["front", "selected"],
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

      this.files.forEach((file) => {
        if (_set.has(file.key)) {
          _selected.push(file.raw);
        } else {
          _unselected.push(file.raw);
        }
      });

      const payload = {
        selected: _selected,
        unselected: _unselected,
      };

      this.$store.commit("setSelectedFiles", payload);

      this.$emit("selected");
    },
  },
  mounted() {
    let _data = this.files;
    let _value = this.selectedFiles;
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
  height: 500px;
  --el-transfer-panel-body-height: 450px;
}
</style>
