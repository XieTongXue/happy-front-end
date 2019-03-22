<template>
  <div class="reading" :style="{minHeight: minHeight + 'px'}">
      <div class="blog" v-for="(item, index) in blogs" :key="index" @click="getDetail(item._id)">
        <div class="avatar">
          <img src="../../assets/images/avatar.png" alt="我只是静态图片，可以考虑自己扩展功能噢">
        </div>
        <div class="main">
          <p class="title">{{item.title}}</p>
          <p class="content">{{item.content}}</p>
        </div>
      </div>
      <mu-dialog :open="dialog" title="博客详情" @close="close">
        <div>标题：{{currTitle}}</div>
        <div>内容：{{currContent}}</div>
        <mu-flat-button slot="actions" @click="close" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="close" label="确定"/>
      </mu-dialog>
  </div>
</template>

<script>
import setMinHeight from '@/common/js/util.js'
import blogApi from '@/api/blog-api.js'
export default {
  data () {
    return {
      minHeight: 0,
      dialog: false,
      currTitle: '',
      currContent: '',
      blogs: [
        {
          _id: 'id1',
          title: '原始博客标题1，请先发博客~',
          content: '哈哈哈哈哈，我是原始博客内容，请先发博客啊啊啊'
        },
        {
          _id: 'id2',
          title: '原始博客标题2，请先发博客~',
          content: '哈哈哈哈哈，我是原始博客内容，请先发博客啊啊啊'
        }
      ]
    }
  },
  created () {
    setMinHeight(this, 104)
    this.getBlogs()
  },
  methods: {
    getDetail (id) {
      for (let i = 0; i < this.blogs.length; i++) {
        if (this.blogs[i]._id === id) {
          this.currTitle = this.blogs[i].title
          this.currContent = this.blogs[i].content
          this.dialog = true
          return
        }
      }
    },
    close () {
      this.dialog = false
    },
    getBlogs () {
      blogApi.getBlogs().then((res) => {
        if (res.status === 200) {
          this.blogs = res.data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/style/variable.less');
  .reading {
    font-family: @font-family;
    font-size: @font-size;
    .blog {
      display: flex;
      padding: 0.2rem 0.2rem 0.1rem 0.2rem;
      box-sizing: border-box;
      .avatar {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .main {
        padding-left: 0.3rem;
        .content, .title {
          width: 5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #909399;
        }
        .title {
          margin-bottom: 0.1rem;
          color: #303133;
        }
      }
    }
  }
</style>
