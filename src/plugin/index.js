// 基于vue扩展功能(全局组件，原型方法|属性，自定义指令，过滤器)
import MyBread from '@/components/my-bread'
// 注册组件 导入自己封装的频道组件
import MyChannel from '@/components/my-channel'
// 注册封面组件
import MyImage from '@/components/my-image'
export default {
    install: (Vue) => {
      // Vue 使用vue的构造函数  当main.js使用use的使用传入进来的
        Vue.component(MyBread.name, MyBread)
        Vue.component(MyChannel.name, MyChannel)
        Vue.component(MyImage.name, MyImage)
    }
}