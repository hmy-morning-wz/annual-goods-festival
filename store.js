import { GlobalStore } from 'herculex'
import { getCardInfo } from './components/card-component/utils/'

import pageJson from './services/pageJson'
import common from '/util/common'
import moment from 'moment'
import {pageId} from './constant'
export default new GlobalStore({
  state: {
     systemInfo:{},
     config:{},
     card:{},
     ele_cards:{},
     cardListStatus:{},
     pageJson:{}
  },
  mutations: {


    UPDATE_SYSTEM: (state, sys) => {
      //console.log('设置系统信息', sys)
      state.systemInfo = sys
    },
        CARD_INFO: (state, cardInfo) => {
      console.log('设置卡片信息 CARD_INFO', cardInfo)
      let t = {}
      if (cardInfo && cardInfo.data) {
        let cardType = cardInfo.cardType
        let data = cardInfo.data
        t.cardTitle = data.cardTitle
        t.cardType = cardType
       // t.balanceMode = data.balanceMode
        t.cardLogo = data.styleConfig && data.styleConfig.logoUrl
        t.imageUrl = data.styleConfig && data.styleConfig.imageUrl
        t.applyUrl = data.extInfo && data.extInfo.cardApplyUrl
        t.status = data.cardModels && data.cardModels.length > 0 ? 'received' : 'noReceive'
        t.cardNo = data.cardModels && data.cardModels.length > 0 ? data.cardModels[0].cardNo : ''
        state.ele_cards[cardType] = t
        if (data && data.cardModels && data.cardModels.length > 0) {
          state.cardListStatus[cardType] = true
        }
      } else {
        let cardType = cardInfo.cardType
        state.ele_cards[cardType] = {}
      }

    },
    SET_CONFIG_JSON:(state, res) => {
    
      state.config = res
    },
    SET_CARD_JSON:(state, res) => {    
      state.card[res.id] = res
    },
    SET_PAGE_JSON:(state, res)=>{
       state.pageJson[res.pageUrl] = common.replaceJSON(res.data, getApp().replaceConfig)
       console.log("SET_PAGE_JSON",res.data)
    }
  },
  plugins: ['logger'],
  actions: {
    // 获取系统信息
    async updateSystemInfo({ commit }) {
      console.log('updateSystemInfo->')
      let res = await common.getSystemInfoSync() // 阻塞式获取系统信息
     // console.log('getSystemInfoSync', res)
      let version = res.version.replace('.', '').replace('.', '')
      if (parseInt(version) < 10132) {
        my.showToast({
          type: 'success',
          content: '您当前支付宝版本过低，须更新'
        })
        my.canIUse('ap.updateAlipayClient')
        my.ap.updateAlipayClient()
      } else {
        version = my.SDKVersion.replace('.', '').replace('.', '')
        if (parseInt(version) < 1110) {// 1.11.0
          my.showToast({
            type: 'success',
            content: '您当前支付宝基础库版本过低，须更新'
          })
          my.canIUse('ap.updateAlipayClient') && my.ap.updateAlipayClient()
        }
      }
      // console.log('成功获取系统信息', res)
      commit('UPDATE_SYSTEM', res)
    },

   
    async getPageJSON({ commit }, pageUrl) {
      console.log('getPageJSON', pageUrl)
      let app = getApp()
      await app.loadUserId()
      let appId = app.appId
      let aliUserId = app.alipayId    
      let pageCfg = pageId[pageUrl]
      let item = pageCfg && pageCfg[app.env]
      if (item ) {
        let { locationId, templateId } = item
        let local = null
        try {
          let ret = await common.getStorageSync({ key: `PAGE_JSON_${locationId}_${templateId}` })
          console.log('getPageJSON getStorageSync', ret)
          local = ret && ret.success && ret.data && ret.data.data
          if (ret && ret.success && ret.data && (Date.now() - ret.data.timestamp) < 30 * 60000) {
            commit('SET_PAGE_JSON', {
              pageUrl,
              data: ret.data.data
            })
            pageJson.queryPageJson({ appId, aliUserId, locationId, templateId }).then((res) => {
              console.log('getPageJSON queryPageJson then', res)
              if (res && res.success && res.data) {
                commit('SET_PAGE_JSON', {
                  pageUrl,
                  data: res.data
                })
                my.setStorage({
                  key: `PAGE_JSON_${locationId}_${templateId}`,
                  data: {
                    timestamp: Date.now(),
                    data: res.data
                  },
                  success: (res) => {
                    console.log('getPageJSON setStorage success')
                  }
                })
              }
            })
            console.log('getPageJSON use Storage')
            return
          }
        } catch (err) {
          console.warn(err, 'getStorageSync fail')
        }

        let res = await pageJson.queryPageJson({ appId, aliUserId, locationId, templateId })
        console.log('getPageJSON queryPageJson await', res)
        if (res && res.success && res.data) {
          commit('SET_PAGE_JSON', {
            pageUrl,
            data: res.data
          })
          my.setStorage({
            key: `PAGE_JSON_${locationId}_${templateId}`,
            data: {
              timestamp: Date.now(),
              data: res.data
            },
            success: (res) => {
              console.log('getPageJSON setStorage success')
            }
          })
        } else if (local) {
          console.log('getPageJSON queryPageJson fail use local')
          commit('SET_PAGE_JSON', {
            pageUrl,
            data: local
          })
        }
        //return res
      } else {
        console.warn('getPageJSON no config ', pageUrl)
      }


    }


  
  }
    
 

})
