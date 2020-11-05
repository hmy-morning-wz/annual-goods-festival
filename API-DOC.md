# 产品原型

https://lanhuapp.com/url/nSuND-vtPb1



# api doc
http://yapi.unservice.net/ 

http://sit-operation.allcitygo.com/operation-mall/swagger-ui.html
 


# 入会链路
福袋列表: 投放json

获得任务完成状态:接口
getTaskInfo({tasks:['xxx',....]})
完成任务-点击入会
goTask({taskId:'xxx',taskType:'member',sellerId:xxxxx})

点击入会 ->(福袋id，任务id，商家sellerId) 千叶H5?sellerId=xxxxx&activityId=xxxxx |--> 入会成功   ?code=SUCCESS&tbid=xxxxx&nickname=xxxxx&sellerId=xxxxxx  
                                 |  
                                 |--> 已经是会员 ?code=FAIL_DONE&tbid=xxxxx&nickname=xxxxx&sellerId=xxxxxx 

                                 --> postmessage({...}) ,更新接口  redirectTo() index?activityId=xxxxx&taskId=xxxx&sellerId=xxxxxx&code=SUCCESS


import luckyBag from '/services/luckyBag'
luckyBag.goTask({taskId:'xxx',taskType:'member',sellerId:xxxxx})



# h5工程
https://gitlab.allcitygo.com:8000/front/annual-goods-festival-H5  


https://pages.tmall.com/wow/pegasus/test-site/687205/y02468?taskId=test12345&sellerId=2201304374934&userId=2088702372862094

域名  
测试 https://sit-operation.allcitygo.com/annual-goods/  
https://sit-operation.allcitygo.com/annual-goods/result.html?code=FAIL_DONE&tbid=tb100000001&nickname=taobao%E5%B0%8F%E4%BA%8C&sellerId=undefined&taskId=undefined&userId=undefined






# 