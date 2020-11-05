const app = getApp()
import common from '/util/common'
import store from './store'

const createPage = function (options) {
  return Page(store.register(options))
};
createPage({
  data: {
    rule: false,
    backClass: [],
    footMarker: '— 公交出行 精彩豪礼 —',
    dataReady: false,
    areaName1: '',
    areaName2: '',
    areaName3: '',
    showArea1: '',
    showArea2: '',
    showArea3: '',
    recordState: false,
  },
  async onLoad(query) {
     my.showNavigationBarLoading()
    this.setData({
      dataReady: false
    })
    app.Tracker.Page.init(this, query);
    this.dispatch('$global:updateSystemInfo')
    await this.dispatch('$global:getPageJSON', 'pages/index/index')

    const env = app.env
    if (env === 'sit') {
      my.setNavigationBar({
        title: this.data.$getters.curpage.title + '[测试]'
      });
    } else {
      my.setNavigationBar({
        title: this.data.$getters.curpage.title//'绿色出行日'
      });
    }


    let backClass = this.data.$getters.curpage.backClass;
    try {
      await this.dispatch('getHasOpenBag', backClass)
      this.dispatch('getSaleList', this.data.$getters.curpage)
      backClass.forEach((item, index) => {
        this.state.bagStatusList.forEach((item2, index2) => {
          if (item.sellerId == item2.sellerId) {
            item.openStatus = item2.openStatus;
          }
        })
      })
      backClass.sort(this.sortBy('openStatus'))

    } catch (e) {
      console.error(e)
      app.Tracker.err('js_catch',{e:e.toString()})
      backClass = null
    }

    this.setData({
      backClass: backClass,
      ruleText: this.data.$getters.curpage.ruleText,
      areaName1: this.data.$getters.curpage.areaName1 || '秒杀专区',
      areaName2: this.data.$getters.curpage.areaName2 || '必买清单',
      areaName3: this.data.$getters.curpage.areaName3 || '品牌专区',
      showArea1: this.data.$getters.curpage.showArea1,
      showArea2: this.data.$getters.curpage.showArea2,
      showArea3: this.data.$getters.curpage.showArea3,
      footMarker: this.data.$getters.curpage.footMarker
    })
    this.dispatch('getMustBuyList', this.data.$getters.curpage)
    this.dispatch('getBrandList', this.data.$getters.curpage)
    this.setData({
      dataReady: true
    })

    let { taskId, code } = query || {}
    console.log("onLoad query", query)
    if (taskId && code) {
      this.openBag({ taskId, code })
    }
    app.openBag = (data) => {
      data && this.openBag(data)
    }
    this.setData({ loaded: true })
    my.hideNavigationBarLoading()
  },
  //将已拆完红包排在后面
  sortBy(property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  },
  hanldeRecord(e){
    this.setData({
      recordState:e.recordState
    })
  },
  async onShow() {
    if (this.data.dataReady) {
      this.dispatch('getSaleList', this.data.$getters.curpage)
      this.dispatch('getBrandList', this.data.$getters.curpage)
    }
  },

  onUnload() {
    app.openBag = undefined
  },
  saveBagRef(ref) {
    // 存储自定义组件实例，方便以后调用
    this.bagRef = ref; // 等于 { key: 'value' }
  },
  async onOpenBag(data) {
    let res = await this.dispatch('draw', data)
    if (res && res.success) {
      let { draw_result } = this.data.$getters.curpage || {}
      this.setData({ drawSeller: res, drawResult: true, drawResultCfg: draw_result || {} })
      this.bagRef && this.bagRef.handleClose({})
    }
  },
  async openBag({taskId}){    
   let {backClass,draw_result} = this.data.$getters.curpage || {}
    draw_result && draw_result.bgImage &&  draw_result.bgImage.indexOf("http")==-1 && (draw_result.bgImage=null)        
    let bag =backClass && backClass.filter((t)=>{return t.id===taskId}) //backClass && backClass[0] 
    if(bag && bag.length &&  (!bag[0].openStatus)){
    let res = await this.dispatch('draw',bag[0])
    if(res && res.success ){
      this.setData({drawSeller:res,drawResult:true,drawResultCfg:draw_result||{}} )
      this.bagRef && this.bagRef.handleClose({})
    }else {//更新任务列表
       if(bag[0].task1Type &&bag[0].task2Type  ) {//有两个任务的 没拆开的
         this.bagRef && this.bagRef.handleOpen()
       }
    }
    }else {
      console.warn("not found bag by taskId or openStatus is opened",taskId)
    }
  },


  handleH5Jump(event) {
    my.navigateTo({
      url: `../webview/webview?url=${event.target.dataset.link}`
    })
  },
  goTop() {
    my.pageScrollTo({
      scrollTop: 0,
    });
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
  async onModalClose() {
    let backClass = this.data.$getters.curpage.backClass;
    await this.dispatch('getHasOpenBag', backClass)
    backClass.forEach((item, index) => {
      this.state.bagStatusList.forEach((item2, index2) => {
        if (item.sellerId == item2.sellerId) {
          item.openStatus = item2.openStatus;
        }
      })
    })

    this.setData({ backClass, drawResult: false })
  },
  onModalClick(e) {

  },
  onBannerClick(e) {

  },
  onRuleClose(e) {
    this.setData({ rule: false })
  },
  onRulePopup() {
    this.setData({ rule: true })
  }
});
