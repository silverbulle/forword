<template>
  <div >
    <div class="main"></div>
    <div class="AllRightReserve"><label>版权：江西师范大学计算机信息工程学院智能信息处理实验室</label></div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      value: new Date()
    }
  }
}
</script>

<style>
.main{
  width: 1070px;
  height: 500px;
  background-color: aqua;
}
.AllRightReserve{
  font-family: "微软雅黑";
  font-size: 8px;
  margin-left: 750px;
  margin-top: 15px;
}

</style>
