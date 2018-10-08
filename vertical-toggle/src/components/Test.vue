<template>
  <div class="hello">
    <button @click="exportJSON">导出jsonn</button>
    <div>
      <input id="file" type="file" accept=".json"/>
      <button @click="importJSON">导入json</button>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
export default {
  data () {
    return {
      // 待导出的json数据
      CfgInfo: {
        CAN: {
          Chn: 0,
          name: 'CAN通道'
        },
        LIN: {
          Chn: 1,
          name: 'LIN通道'
        }
      },
      // 将导入的json保存在这个对象下
      ImportJSON: {}
    }
  },
  methods: {
    // 导出json
    exportJSON () {
      // 将json转换成字符串
      const data = JSON.stringify(this.CfgInfo)
      const blob = new Blob([data], {type: ''})
      FileSaver.saveAs(blob, 'hahaha.json')
    },
    // 导入json
    importJSON () {
      const file = document.getElementById('file').files[0]
      const reader = new FileReader()
      reader.readAsText(file)
      const _this = this
      reader.onload = function () {
        // this.result为读取到的json字符串，需转成json对象
        _this.ImportJSON = JSON.parse(this.result)
        // 检测是否导入成功
        console.log(_this.ImportJSON)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
