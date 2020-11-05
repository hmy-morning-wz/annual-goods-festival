import {
  request
} from '../util/service'
import commm from '../util/common'
import {TMALL_MEMBER_URL,TMALL_FOLLOW_URL,SHOW_TASK,OPEN_BAG} from '/constant'
import { mapActionsToMethod } from 'herculex/dist/mapHelpersToMethod'
const mock = false

async function getPrizeResult(data){
  const originData = await request(`/oper-act-tmall/welfareBagOpen/prizeResult`,data, {
      on: mock,
      delay:3000,
       data: {
        code:"20000",
        data:[{
          userId:'',
        }]
      }
    }, 'post', {
      urlType: 'default',
      headers: {
        'content-type': 'application/json'
      }
    })
    if (!originData.API_ERROR && originData.code=='20000') {
      return {
        success: true,
        data: originData.data,
        message:originData.sub_msg || originData.msg
      }
    }
    return {
      success: false,
      code:originData.code,
      sub_code:originData.sub_code,
      message:originData.sub_msg || originData.msg
    }
}

async function hasOpenBag(data){
  /**
   * {
  "sellInfoList": [
    {
      "sellerId": "string",
      "taskTypeList": [
        0
      ]
    }
  ],
  "userId": "string"
}
{
  "code": "20000",
  "msg": "Success",
  "data": [
    {
      "sellerId": "2201304374934",
      "openStatus": 2
    }
  ]
}

0:未拆 1:拆一半 2:已拆
   */
  console.log('hasOpenBag',data)
  const originData = await request(`/oper-act-tmall/welfareBagOpen/hasOpenBag`,data, {
      on: mock,
       delay:3000,
      data: {       
  "code": "20000",
  "msg": "Success",
  "data": [
    {
      "sellerId": "2201304374934",
      "openStatus": 2
    }
  ]
      }
    }, 'post', {
      urlType: 'default',
      headers: {
        'content-type': 'application/json'
      }
    })
    // 数据处理
    console.log('返回数据：', originData);
    if (!originData.API_ERROR && originData.code=='20000') {
      return {
        success: true,
        data: originData.data,
        message:originData.sub_msg || originData.msg
      }
    }

    return {
      success: false,
      code:originData.code,
      sub_code:originData.sub_code,
      message:originData.sub_msg || originData.msg
    }
}

///LuckyBag/openLuckyBag
/*
userId	string	必须 支付宝id	
sellerId	string	必须 商户id=福袋id	
sellerName	string	必须 商户名称	
campIdList	string []	必须 活动id列表（用于发券）	
item 类型: string 非必须 用list不用数组	备注: 用list不用数组
userType	number 必须 用户的类型（1是会员，2不是会员））	
taskTypeList	number [] 必须 任务类型（1：入会；2：关注；3：浏览）	
item 类型: number 非必须 用list不用数组 备注: 用list不用数组
*/

/**
 * 
 * sellerId	string 必须 商户id	
sellerName	string	 必须 商户名称	
voucherId	string	必须 奖励id	
prizeName	string	必须 奖励名称	
completeTime	string	必须 完成时间
 * 
 */

async function openLuckyBag(data){
  console.log('openLuckyBag',data)
  const originData = await request(`/oper-act-tmall/LuckyBag/OpenLuckyBag`,data, {
      on: mock,
       delay:3000,
      data: {
        code:"20000",
        data:{
          prizeList:[{
          sellerId:'',//	string 必须 商户id	
          sellerName:'',//	string	 必须 商户名称	
          voucherId:'',//	string	必须 奖励id	
          prizeName:'优惠券',//	string	必须 奖励名称	
          completeTime:'',//	string	必须 完成时间
        },{
          sellerId:'',//	string 必须 商户id	
          sellerName:'',//	string	 必须 商户名称	
          voucherId:'',//	string	必须 奖励id	
          prizeName:'乘车券',//	string	必须 奖励名称	
          completeTime:'',//	string	必须 完成时间
        }]
        }
      }
    }, 'post', {
      urlType: 'default',
      headers: {
        'content-type': 'application/json'
      }
    })
    // 数据处理
    console.log('返回数据：', originData);
    if (!originData.API_ERROR && originData.code=='20000') {
      return {
        success: true,
        data: originData.data,
        message:originData.sub_msg || originData.msg
      }
    }

    return {
      success: false,
      code:originData.code,
      sub_code:originData.sub_code,
      message:originData.sub_msg || originData.msg
    }
}
///http://sit-operation.allcitygo.com/oper-act-tmall/userTask/getUserTaskList
/*
sellerId	string	非必须 商家sellerId	
taskTypeList	number []	非必须 任务类型（1：入会；2：关注；3：浏览）	
item 类型: number 非必须 
userId	string	非必须用户id
*/


/**
 * 
 * id	number	必须 用户任务表id	
userId	string	必须 用户id	
sellerId	string	必须 商家sellerId	
taskType	number	必须 任务类型（1：入会；2：关注；3：浏览）	
status	number	必须 完成状态（0：未完成；1：已完成）	
userType	number	必须 用户类型（1：老会员；2：新会员）
 * 
 * 
 */


async function getUserTaskList(data){
  console.log('getUserTaskList',data)
  const originData = await request(`/oper-act-tmall/userTask/getUserTaskList`,data, {
      on: mock,
       delay:3000,
      data: {
        code:"20000",
        data:[{
          id:0,
          userId:'',
          sellerId:'',
          taskType:1,
          status:1,
          userType:''
        },{
          id:0,
          userId:'',
          sellerId:'',
          taskType:3,
          status:1,
          userType:2
        }]
      }
    }, 'post', {
      urlType: 'default',
      headers: {
        'content-type': 'application/json'
      }
    })
    // 数据处理
    console.log('返回数据：', originData);
    if (!originData.API_ERROR && originData.code=='20000') {
      return {
        success: true,
        data: originData.data,
        message:originData.sub_msg || originData.msg
      }
    }

    return {
      success: false,
      code:originData.code,
      sub_code:originData.sub_code,
      message:originData.sub_msg || originData.msg
    }
}



async function addUserTask(data){
  console.log('addUserTask',data)
  /**
   * sellerId	string	非必须 商家sellerId	
status	number	非必须 完成状态（0：未完成；1：已完成）	
taskType	number	非必须 任务类型（1：入会；2：关注；3：浏览）	
userId	string	非必须 用户id	
userType	number	非必须 用户类型（1：老会员；2：新会员）
   */
  ///http://sit-operation.allcitygo.com/oper-act-tmall/userTask/addUserTask
  const originData = await request(`/oper-act-tmall/userTask/addUserTask`,data, {
      on: mock,
       delay:3000,
      data: {
        code:"20000",
        data:null
      }
    }, 'post', {
      urlType: 'default',
      headers: {
        'content-type': 'application/json'
      }
    })
    // 数据处理
    console.log('返回数据：', originData);
    if (!originData.API_ERROR && originData.code=='20000') {
      return {
        success: true,
        data: originData.data,
        message:originData.sub_msg || originData.msg
      }
    }

    return {
      success: false,
      code:originData.code,
      sub_code:originData.sub_code,
      message:originData.sub_msg || originData.msg
    }
}

export default {
  openLuckyBag,
  addUserTask,
  tmallResult:async (param)=>{
      //code=FAIL_DONE&tbid=tb100000001&nickname=taobao小二&sellerId=${sellerId}&taskId=${taskId} 
      //code=SUCCESS&tbid=tb100000001&nickname=taobao小二&sellerId=${sellerId}&taskId=${taskId}
      let app = getApp()
      let data = {
       sellerId:param.sellerId,
       //status:param.code ==='SUCCESS'?1:0,
       taskType:param.taskType=="member"?1:(param.taskType=="follow"?2:(param.taskType=="goshop"?3:param.taskType)),
       userId:app.alipayId,
       //userType:param.code ==='FAIL_DONE'?1:2       
     }
     param.code ==='SUCCESS'&& (data.status = 1, data.userType =2)   
     if(param.taskType!="goshop" && param.code==='FAIL_DONE')  {
       data.userType =1    //用户类型（1：老会员；2：新会员）
       data.status = 1  
       if(param.taskType==="follow") {
         app.Tracker.click(`关注任务-${data.sellerId}-完成`)
       }
      else {
        app.Tracker.click(`入会任务-${data.sellerId}-完成`)
      }
     }else  if(param.taskType=="goshop")  {
        data.status = 1  
        data.userType = 0
        app.Tracker.click(`浏览店铺-${data.sellerId}-任务完成`)
     }
     if(data.status || data.userType)
     {
       let res =  await addUserTask(data)
       if(res && res.success) {
         app.Tracker.click("完成任务接口调用成功",data)
       }else {
         app.Tracker.click("完成任务接口调用失败",res)
       }
     }else {
         console.log('not need addUserTask')
     }
     return {success:true}
  },
  hasOpenBag :async (param)=>{
    console.log('hasOpenBag',param)
    let app = getApp()
    let task1Type  = param.task1Type=="member"?1:(param.task1Type=="follow"?2:(param.task1Type=="goshop"?3:param.task1Type))
    let task2Type  = param.task2Type=="member"?1:(param.task2Type=="follow"?2:(param.task2Type=="goshop"?3:param.task2Type))
    let data = {
       "sellInfoList": [
      {
        "sellerId":param.sellerId ,
        "taskTypeList": [
         task1Type,task2Type
        ]
      }
   ],
  "userId": app.alipayId 
  }
  return await hasOpenBag(data)
  },
   //福袋是否拆开状态
  getHasOpenBag: async (data) => {
    let app = getApp()
    let params = {
      userId:app.alipayId,
      sellInfoList: []
    }
    data.forEach((item,index) => {
        item.taskTypeList = []; 
        if(item.task1Type === "member"){
          item.task1Type = 1;
        }else if(item.task1Type === "follow"){
          item.task1Type = 2;
        }else if(item.task1Type === 'goshop'){
          item.task1Type = 3;
        }else if(item.task1Type==="") {
           item.task1Type = null
        }
        if(item.task2Type === "member"){
          item.task2Type = 1;
        }else if(item.task2Type === "follow"){
          item.task2Type = 2;
        }else if(item.task2Type === 'goshop'){
          item.task2Type = 3;
        }else if(item.task2Type==="") {
           item.task2Type = null
        }
       item.task2Type ? item.taskTypeList.push(item.task1Type,item.task2Type) : item.taskTypeList.push(item.task1Type)
       const obj = {
         sellerId: item.sellerId,
         taskTypeList: item.taskTypeList,
       }
       params.sellInfoList.push(obj);
    })
    const originData = await request(`/oper-act-tmall/welfareBagOpen/hasOpenBag`,params, {
      on: false,
      data: {}
    }, 'post', {
        urlType: 'default',
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        }, // headers 定制传输
        authType: false // 授权类型auth_base/auth_user
      })
    // 数据处理
    if (!originData.API_ERROR && originData.msg === 'Success' && originData.data) {
      return {
        success: true,
        data: originData.data
      }
    }
    my.hideLoading()
    return {
      success: false
    }
  },
  openBag:async (param)=>{
    console.log('openBag',param)
    my.showLoading();

         //检查是否都完成
/*
sellerId	string	非必须 商家sellerId	
taskTypeList	number []	非必须 任务类型（1：入会；2：关注；3：浏览）	
item 类型: number 非必须 
userId	string	非必须用户id
*/

     let app = getApp()
     if(param.task1Type && (param.task1Type===""||param.task2Type==="null"||param.task1Type.length==0 )) {
        param.task1Type = null
     }
     if(param.task2Type && (param.task2Type===""||param.task2Type==="null"||param.task2Type.length==0 )) {
        param.task2Type = null
     }     
     if(param.draw2Id && (param.draw2Id===""||param.draw2Id==="null"||param.draw2Id.length==0 )) {
        param.draw2Id = null
     }
     if(param.draw1Id && (param.draw1Id===""||param.draw1Id==="null"||param.draw1Id.length==0 )) {
        param.draw1Id = null
     }
     let task1Type  = param.task1Type=="member"?1:(param.task1Type=="follow"?2:(param.task1Type=="goshop"?3:param.task1Type))
     let task2Type  = param.task2Type=="member"?1:(param.task2Type=="follow"?2:(param.task2Type=="goshop"?3:param.task2Type))
     let allTskCount = (task1Type && task2Type)?2:1
     let taskTypeList = []
     if(allTskCount===2) {
       taskTypeList=[task1Type,task2Type]
     }else {
       task1Type && (taskTypeList=[task1Type])
       task2Type && (taskTypeList=[task2Type])
     }
     let res =  await getUserTaskList({
       sellerId:param.sellerId,
       taskTypeList,      
       userId:app.alipayId         
     })
     
     if(res && res.success &&  res.data) {
       //.....
      let taskCount = 0
      let isMemmber = 0
      let isMemmberText =""
      res.data.forEach((t)=>{
/*
 * 
 * id	number	必须 用户任务表id	
userId	string	必须 用户id	
sellerId	string	必须 商家sellerId	
taskType	number	必须 任务类型（1：入会；2：关注；3：浏览）	
status	number	必须 完成状态（0：未完成；1：已完成）	
userType	number	必须 用户类型（1：老会员；2：新会员）
 * 
 * 
 */
        if(t.status===1) taskCount++
        
        if(t.taskType===1 || t.taskType===2) {
            isMemmber = t.userType===1
            if(t.taskType===1) isMemmberText = "已经是店铺会员"
            else if(t.taskType===2) isMemmberText = "已经关注过店铺"
        }
      })
      let openParam = {
        userId:app.alipayId,
        sellerId:param.sellerId,
        sellerName:param.name,//	string	必须 商户名称		
        userType:isMemmber?1:2,//	number 必须 用户的类型（1是会员，2不是会员））   
      }
      if(isMemmber &&allTskCount==2 && taskCount>=allTskCount) {
        Object.assign(openParam,{
        campIdList:[param.draw2Id],//	string []	必须 活动id列表（用于发券）	
        taskTypeList 
        //:[task1Type,task2Type],//	number [] 必须 任务类型（1：入会；2：关注；3：浏览）
        })
      }else if(allTskCount &&taskCount===allTskCount){
        let campIdList= []
        
        if(allTskCount==2) {
          campIdList = [param.draw1Id,param.draw2Id]
        }else {
           if(isMemmber &&  param.draw2Id)  {
             campIdList=[param.draw2Id]
           }else {
             campIdList=[param.draw1Id]
           }     
        }
        Object.assign(openParam,{
        campIdList,//	string []	必须 活动id列表（用于发券）	
        taskTypeList 
        //:[task1Type,task2Type],//	number [] 必须 任务类型（1：入会；2：关注；3：浏览）
        })
      } else {
        console.log("完成任务数量："+taskCount,"是否老会员"+isMemmber)
        my.hideLoading()

        return {
        win:false,
        code:SHOW_TASK
        }
      }
      
      /*
userId	string	必须 支付宝id	
sellerId	string	必须 商户id=福袋id	
sellerName	string	必须 商户名称	
campIdList	string []	必须 活动id列表（用于发券）	
item 类型: string 非必须 用list不用数组	备注: 用list不用数组
userType	number 必须 用户的类型（1是会员，2不是会员））	
taskTypeList	number [] 必须 任务类型（1：入会；2：关注；3：浏览）	
 
 
*/
      
      let result = await openLuckyBag(openParam)
      /**
 * 
 * sellerId	string 必须 商户id	
sellerName	string	 必须 商户名称	
voucherId	string	必须 奖励id	
prizeName	string	必须 奖励名称	
completeTime	string	必须 完成时间
 * 
 */
  if(result && result.success){
      console.log("openLuckyBag success",result)
  app.Tracker.click("抽奖接口调用成功",result.data)
  let prizeList = result.data &&   result.data.prizeList || []
  let prize1Name=prizeList.length && prizeList[0] && prizeList[0].prizeName 
  let prize2Name=prizeList.length>=2 && prizeList[1] && prizeList[1].prizeName 
   //{bottomText:"更多福袋>",banner:"https://gw.alipayobjects.com/zos/rmsportal/pYHsMlnkokGhKGRRjaYJ.png",logo:'https://gw.alipayobjects.com/zos/rmsportal/pYHsMlnkokGhKGRRjaYJ.png',bgImage:'/images/youhuiquan.png',win:true,kefu:"支付宝客服电话：95188",isMemmber:false,result1:"10元乘车红包",result2:"10元抵扣券"}
   
      let out = { 
        sellerId:param.sellerId,
        name:param.name,  
        success:true,   
        banner:param.image,//"https://gw.alipayobjects.com/zos/rmsportal/pYHsMlnkokGhKGRRjaYJ.png",
        logo:param.icon_img,//'https://gw.alipayobjects.com/zos/rmsportal/pYHsMlnkokGhKGRRjaYJ.png',
        bannnerUrl:param.bannnerUrl,
        shopUrl:param.shopUrl,
        win:prize1Name || prize2Name,  
        isMemmber,
        isMemmberText,
        result1:prize1Name,
        result2:prize2Name
        }   
        console.log("openLuckyBag out",out)
         my.hideLoading()
        return out 
    }else {
      console.log("openLuckyBag fail",result)
      app.Tracker.click("抽奖接口调用失败",result)
       my.hideLoading()
       return {
        sellerId:param.sellerId,
        name:param.name,
        success:true,
        win:false,
        banner:param.image,
        logo:param.icon_img,
        bannnerUrl:param.bannnerUrl,
        shopUrl:param.shopUrl,     
        isMemmber,  
        isMemmberText,     
        }
    }

     }else {
       console.log("getUserTaskList fail",res)
       my.hideLoading()
       return {
        sellerId:param.sellerId,
        name:param.name,  
        win:false,
        code:SHOW_TASK
        }
     }

  },
  getTaskInfo:async (param)=>{
    let app = getApp()
     let task1Type  = param.task1Type=="member"?1:(param.task1Type=="follow"?2:(param.task1Type=="goshop"?3:param.task1Type))
     let task2Type  = param.task2Type=="member"?1:(param.task2Type=="follow"?2:(param.task2Type=="goshop"?3:param.task2Type))
      let data = {
        sellerId:param.sellerId,
        taskTypeList:[task1Type,task2Type],      
        userId:app.alipayId 
      }
      if(!param.task2Type){
        data.taskTypeList = [task1Type]
      }
     let res =  await getUserTaskList(data)
      if(res && res.success &&  res.data && res.data.length )  {
        res.data = res.data.map((t)=>{
          t.taskType = t.taskType==1?"member":(t.taskType==2?'follow':(t.taskType==3?'goshop': t.taskType))
          return t
        })
      }
     return res
  },
  getPrizeResult:async (param)=>{
    let app = getApp()
     let res =  await getPrizeResult({    
       userId:app.alipayId,       
      //  userId: 2088702372862094,       
     })
      if(res && res.success &&  res.data && res.data.length )  {
      }
     return res
  },
  goTask:(data)=>{//{taskId:'xxx',taskType:'member',sellerId:xxxxx,url:xxx}
   console.log("goTask",data)
   let {taskId,taskType,sellerId,url} = data || {}
   if( (!sellerId) || !(taskId)) {
    console.error("goTask param need sellerId and taskId")
    my.showToast({         
          content: '系统开小差了，请稍后再试'
        })
    return
   }
   let app = getApp()
  if(taskType==='goshop') {   
    if(url){
      
   let url_path = '/pages/webview/webview?url=' + encodeURIComponent(url) + `&taskType=${taskType}&sellerId=${sellerId}&taskId=${taskId}`
   my.navigateTo({
     url: url_path
   });
    app.Tracker.click("去做到店任务函数调用成功",data)
    }else {
        console.error("goshop need url",url)
         my.showToast({         
          content: '系统开小差了，请稍后再试'
        })
    }
  } else if(taskType==='follow') //TMALL_FOLLOW_URL
  {
   let url = commm.makeUrl(TMALL_FOLLOW_URL[app.env],{followId:sellerId,userId:app.alipayId,taskType:taskType})
   let url_path = '/pages/webview/webview?url=' + encodeURIComponent(url) + `&taskType=${taskType}&sellerId=${sellerId}&taskId=${taskId}`
   my.navigateTo({
     url: url_path
   }); 
    app.Tracker.click("去做关注任务函数调用成功",data)
  }else  if(taskType==='member')
   {
   let url = commm.makeUrl(TMALL_MEMBER_URL[app.env],{taskId,sellerId,userId:app.alipayId,taskType:taskType})
   let url_path = '/pages/webview/webview?url=' + encodeURIComponent(url) + `&taskType=${taskType}&sellerId=${sellerId}&taskId=${taskId}`
   my.navigateTo({
     url: url_path
   }); 
    app.Tracker.click("去做入会任务函数调用成功",data)
  }else {
    console.error("不支持的任务类型 （taskType 不是 goshop,follow,member）",taskType)
     my.showToast({         
          content: '系统开小差了，请稍后再试'
        })
  }
  }
  

}
