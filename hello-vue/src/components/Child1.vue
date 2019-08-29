<template>
  <div>
    <h2>Child1</h2>
    <p>{{title}}</p>
    <h3>{{msg}}</h3>
    <button @click="toParent">传递到父元素</button>
    <!-- <button @click="$boardcast('boardcast','我是Child1')">广播子元素</button> -->
    <grand-child1></grand-child1>
  </div>
</template>
<script>
import GrandChild1 from "@/components/inject";


export default {
  name: "Child1",
  props: ["title"],
  data() {
    return {
      msg: ""
    };
  },
  components: {
    GrandChild1,
  },
  methods: {
    toParent() {
      this.$emit("getmsg", "爸爸,我知道错了");
    }
  },
  mounted() {
  }
};
</script>

