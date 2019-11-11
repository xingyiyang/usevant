<template>
  <div class="hello">
    <van-contact-list
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
import { ContactList,Toast,ContactEdit,Popup  } from 'vant'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list:[],
      instance: null,
      showEdit: false,
      editingContact: {},
      isEdit: false
    }
  },
  created(){
    this.instance = axios.create({
      baseURL:'http://localhost:9000/api',
      timeout: 1000
    })
    this.getList()
    
  },
  components: {
    [ContactList.name]: ContactList,
    [Toast.name]: Toast,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup,
  },
  methods: {
    //获取联系人列表
    getList(){
      this.instance.get('contactList').then(res => {
        console.log(res)
        this.list = res.data.data
      }).catch(err => {
        console.log(err)
        Toast('请求失败')
      })
    },
    //添加联系人
    onAdd(){
      this.showEdit = true
      this.isEdit = false
    },
    //编辑联系人
    onEdit(info){
      this.showEdit = true
      this.isEdit = true
      this.editingContact = info
    },
    //保存联系人
    onSave(info){
      if(this.isEdit){
        //编辑保存
        this.instance.put('/contact/edit', info).then(res => {
          if(res.data.code === 200){
            Toast('编辑成功')
          }
          this.showEdit = false
          this.getList()
          this.editingContact = null
        }).catch(err => {
          console.log(err)
          Toast('编辑失败')
        })
      }else{
        //新建保存
        this.instance.post('/contact/new/json', info).then(res => {
          if(res.data.code === 200){
            Toast('新建成功')
          }
          this.showEdit = false
          this.getList()
          this.editingContact = null
        }).catch(err => {
          console.log(err)
          Toast('新建失败')
        })
      }
    },
    //删除联系人
    onDelete(info){
      this.instance.delete('/contact', {
        params:{
          id: info.id
        }
      }).then(res => {
        if(res.data.code === 200){
          Toast('删除成功')
          this.showEdit = false
          this.getList()
        }
      }).catch(() => {
        Toast('删除失败')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
