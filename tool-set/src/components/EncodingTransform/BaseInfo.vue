<template>
  <div id="baseInfo">
    <el-form :model="form" label-width="100px">
      <el-form-item label="目标编码">
        <el-select v-model="form.selectedTarget" placeholder="请选择目标编码">
          <!-- <el-option label="UTF-8" value="utf8"></el-option>
          <el-option label="GBK" value="gbk"></el-option> -->
          <el-option
            v-for="target in form.allTargets"
            :key="target.id"
            :label="target.name"
            value="target.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="源文件字符集">
        <el-checkbox-group v-model="form.selectedCharSets" :min="1">
          <el-checkbox
            v-for="charSet in form.allCharSets"
            :key="charSet.cid"
            :label="charSet.cid"
            :name="String(charSet.cid)"
            >{{ charSet.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
    </el-form>
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
  </div>
</template>

<script>
import { ensureLoginAsync } from "../../utils/user";
export default {
  name: "BaseInfo",
  emits: ["selected", "front"],
  props: {
    remote_baseurl: String,
  },
  data() {
    return {
      form: {
        allCharSets: [],
        selectedCharSets: [],
        allTargets: [
          { name: "UTF-8", id: "utf8" },
          { name: "GBK", id: "gbk" },
        ],
        selectedTarget: "utf8",
      },
    };
  },
  methods: {
    async finish() {
      let promise = ensureLoginAsync(this.$store);

      let _selected = [];

      this.$store.state.encodingTransformer.selected.forEach((file) => {
        _selected.push(file.fid);
      });

      let body = {
        target: this.form.selectedTarget,
        charset: this.form.selectedCharSets,
        selected: _selected,
      };

      await promise;

      promise = this.$axios.post(
        this.$props.remote_baseurl + "/encoding/baseinfo",
        body,
        {
          headers: {
            Authorization: "Bearer " + this.$store.state.userCenter.accessToken,
          },
        }
      );

      const fidMap = new Map();
      this.$store.state.encodingTransformer.selected.forEach(file => {
          fidMap.set(file.fid, file.name);
      });
      const encodingMap = new Map()
        .set("utf8", "UTF-8")
        .set("gbk", "GBK");

      const response = await promise;
      const data = response.data;
      const result = new Map();
      for (const fid in data) {
          const name = fidMap.get(Number(fid));
          const encoding = encodingMap.get(data[fid])
          result.set(name, encoding);
      }

      this.$store.commit("setResult", result);

      this.$emit("selected");
    },
  },
  async mounted() {
    let response = await this.$axios.get(
      this.$props.remote_baseurl + "/charset/list"
    );
    response.data.forEach((e) => {
      this.form.allCharSets.push(e);
      this.form.selectedCharSets.push(e.cid);
    });
    console.log("form:");
    console.dir(this.form);
  },
};
</script>

<style>
#baseInfo {
  margin-top: 40px;
  margin-left: 10%;
  margin-right: 10%;
  padding: 5%;
  border: 1px;
  border-style: solid;
}

#charSetSelection {
  border: 1px;
  border-style: solid;
}
</style>