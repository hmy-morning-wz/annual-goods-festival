import Store from 'herculex'
import luckyBag from '/services/luckyBag'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
   
  },
  getters: {
    
  },
  mutations: {
   
  },
  actions: {
    async draw({ commit, state },param) {
    
       const result =await luckyBag.openBag(param)//{buttonText:"更多福袋>",banner:"https://gw.alipayobjects.com/zos/rmsportal/pYHsMlnkokGhKGRRjaYJ.png",logo:'https://gw.alipayobjects.com/zos/rmsportal/pYHsMlnkokGhKGRRjaYJ.png',bgImage:'/images/youhuiquan.png',win:true,kefu:"支付宝客服电话：95188",isMemmber:false,result1:"10元乘车红包",result2:"10元抵扣券"}
     
      commit('UPDATE_DRAW', {drawSeller:result});
      return result;
    }
  }
})