import luckyBag from '/services/luckyBag'
import store from './store'
const app = getApp()

const createPage = function(options) {
  return Page(store.register(options))
};
createPage({
  data: {},
  async onLoad() {
        app.Tracker.Page.init();  
        let res =await luckyBag.getTaskInfo({sellerId:'2201304374934',task1Type:'member',task2Type:'goshop'})
        console.log('getTaskInfo',res)
        let res2 = await luckyBag.hasOpenBag({sellerId:'2201304374934',task1Type:'member',task2Type:'goshop'})
        console.log('hasOpenBag',res2)
  },
  goTask(){
    luckyBag.goTask({taskId:'2201304374934',taskType:'member',sellerId:'2201304374934'})
  },
  goFollowTask(){
    luckyBag.goTask({taskId:'2201304374934',taskType:'follow',sellerId:'2201304374934'})
  },
   goShopTask(){
    luckyBag.goTask({taskId:'2201304374934',taskType:'goshop',sellerId:'2201304374934',url:"https://www.taobao.com"})
  },
  async onDrawResult(){
    let res = await this.dispatch('draw',{name:"测试名称",sellerId:'2201304374934',task1Type:'member',task2Type:'goshop'})
    if(res && res.success) {
         this.setData({drawSeller:res,drawResult:true,drawResultCfg:{}} )
    }else {
      my.showToast({content:"未完成任务"});
    }
  },
  onModalClose(e){
    this.setData({drawResult:false})
  },
  onModalClick(e){

  },
  onBannerClick(e){
    
  }
});
