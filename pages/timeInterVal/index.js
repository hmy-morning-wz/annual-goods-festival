const app = getApp()
import common from '/util/common'
import store from './store'


const createPage = function(options) {
  return Page(store.register(options))
};
createPage({
  data: {
 

  },
  async onLoad() {   
    app.Tracker.Page.init();    
    this.dispatch('$global:updateSystemInfo')
    await this.dispatch('$global:getPageJSON', 'pages/index/index')
    const env = app.env
    if(env==='sit'){
      my.setNavigationBar({
         title:'绿色出行日[测试]'
      });
    }else {
       my.setNavigationBar({
         title:'绿色出行日'
      });
    }
   this.setData({loaded:true})
   
    
  
  },
  async onShow() {
    
  },
  
  
  onFollow() {
    console.log("onFollow")
  },
  onAppear(e) {
    //type "appear"
    console.log("onAppear", e)
  },

  
  onReachBottom() {
    // 页面被拉到底部
     console.log("onReachBottom")
   
  },
});
