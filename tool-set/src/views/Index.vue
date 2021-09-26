<template>
  <div>
    <el-row :gutter="20" v-for="row in toolset" :key="row[0].id">
      <el-col :lg="4" :md="6" :sm="8" :xs="12" v-for="item in row" :key="item.id">
        <router-link :to="item.link" class="menu">
          <div class="item">
            <img class="icon" :src="item.icon" />
            <div class="name">
              {{ item.name }}
            </div>
            <div class="desc">
              {{ item.desc }}
            </div>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import encodingTransformImg from "../assets/indexIcon/encodingTransform.png";

export default {
  name: "Index",
  data() {
    return {
      toolset: [],
    };
  },
  async mounted() {
    const list = [
      {
        link: "/encoding-transform",
        name: "文件编码转换器",
        desc: "对文件夹内文件进行编码判断，并转换为目标编码，可以通过指定字符集来提高判断准确度",
        icon: encodingTransformImg,
      },
    ];
    let col = [];
    list.forEach((item, i) => {
      col.push({
        id: i,
        ...item,
      });
      if (col.length == 6) {
        this.toolset.push(col);
        col = [];
      }
    });
    if (col.length != 0) {
      this.toolset.push(col);
    }
  },
};
</script>

<style>
a.menu {
    text-decoration: none;
}
div.name {
  margin-top: 10px;
  text-align: center;
  color: black;
  font-weight: bolder;
}
div.desc {
  text-indent: 1em;
  margin: 20px 10px 10px 10px;
  color: grey;
}
.el-row {
  margin-bottom: 20px;
}
.item {
  width: 100%;
  border: 1px solid var(--el-border-color-base);
}
img.icon {
  width: 100%;
  align-content: center;
  text-align: center;
}
</style>