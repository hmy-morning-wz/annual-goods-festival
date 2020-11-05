import Store from 'herculex'
import luckyBag from '/services/luckyBag'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
    flashSaleList: [],
    brandAreaList: [],
    bgColor: '',
    bagStatusList: [],
    mustBuyList: []
  },
  getters: {
    curpage: (state, getters, global) => global.getIn(['pageJson', 'pages/index/index'])
  },
  mutations: {
    FLASH_SALE: (state, config) => {
      let array = []
      let now = new Date().getTime();
      config.forEach((item) => {
        let s = ''
        let e = ''
        s = Date.parse(item.startTime)
        e = Date.parse(item.endTime)
        let start = new Date(s).getTime();
        let end = new Date(e).getTime();
        let state = 1;
        let percent = 1
        if (now < start) {
          state = 1
          percent = 1
        } else if (now > end) {
          state = 3
          percent = 0
        } else {
          state = 2
          percent = (end - now) / (end - start)
        }
        const obj = {
          image: item.icon_img,
          state: state,
          percent: percent,
          goodsName: item.goodsName,
          adTxt: item.adTxt,
          price: item.price,
          goodsLink: item.goodsLink
        }
        array.push(obj)
      })
      console.log('timetimetimetime11111111111',array)
      state.flashSaleList = array
    },
    BRAND_LIST: (state, config) => {
      console.log(config, 'sdkhbsjkagywaugiwsxvvvvvvvvvvvvvvvva')
      let brandList = config.brandList || []
      let brandGoodsList = config.brandGoodsList || []
      let result = []
      brandList.forEach((item) => {
        let obj = {
          brandLink: item.brandLink,
          brandPic: item.icon_img,
          brandName: item.brandName,
          goodsList: []
        }
        let arr = []
        brandGoodsList.forEach((good) => {
          if (good.brandName === item.brandName) {
            arr.push(good)
          }
        })
        obj.goodsList = arr
        result.push(obj)
      })
      console.log(result, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
      state.brandAreaList = result
    },
    BAG_STATUS_LIST: (state, config) => {
      state.bagStatusList = config;
    },
    MUST_BUY_LIST: (state, config) => {
      state.mustBuyList = config.mustBuyList || []
    }
  },
  actions: {
    //获取秒杀列表
    async getSaleList({ commit, state }, data) {
      commit('FLASH_SALE', data.flashSaleList)
    },
    //获取品牌专区列表
    async getBrandList({ commit, state }, data) {
      commit('BRAND_LIST', data)
    },
    async draw({ commit, state }, param) {
      const result = await luckyBag.openBag(param)// {buttonText:"更多福袋>",banner:"https://gw.alipayobjects.com/zos/rmsportal/pYHsMlnkokGhKGRRjaYJ.png",logo:'https://gw.alipayobjects.com/zos/rmsportal/pYHsMlnkokGhKGRRjaYJ.png',bgImage:'/images/youhuiquan.png',win:true,kefu:"支付宝客服电话：95188",isMemmber:false,result1:"10元乘车红包",result2:"10元抵扣券"}
      commit('UPDATE_DRAW', { openBagResult: result });
      return result;
    },
    async getHasOpenBag({ commit, state }, payload) {
      const { success, data } = await luckyBag.getHasOpenBag(payload)
      commit("BAG_STATUS_LIST",data);
    },
    async getMustBuyList({ commit, state }, data) {
      commit('MUST_BUY_LIST', data)
    },
  
  }
})