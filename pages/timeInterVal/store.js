import Store from 'herculex'

export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
   
  },
  getters: {
      curpage: (state, getters, global) => global.getIn(['pageJson', 'pages/index/index'])
  },
  mutations: {
   
  },
  actions: {
   
  }
})