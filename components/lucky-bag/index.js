
const app = getApp()
import luckyBag from '/services/luckyBag'
import Tracker from '@tklc/miniapp-tracker-sdk'
Component(Tracker.Component.hook({
  mixins: [],
  data: {
    taskState: false,
    currentItemId: 1,
    recordState: false,
    recordList: [],
    taskList: {
      sellerId: '',
      taskOne: { taskState: false, taskId: '', taskType: '', url: '' },
      taskTwo: { taskState: false, taskId: '', taskType: '', url: '' },
    },
    taskArray: [],
  },
  props: {
    backClass: [],
  },
  didMount() {
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    swiperChange: function (e) {
      var currentItemId = e.detail.current;
      this.setData({
        currentItemId: currentItemId
      })
    },
    async handleOpen(event) {
       my.showLoading({
         content: '加载中...',
         delay: '1000',
       });
      let parameter = {}
      if(event){
      if(this.props.backClass.length == 1){
          this.setData({
            currentItemId: 0,
        })
      }
      if(this.data.currentItemId !== event.currentTarget.dataset.currentTaskId)return
      }
      this.props.backClass.forEach((item, index) => {
        if (index === this.data.currentItemId) {
          parameter = item
        }
      })
      this.setData({
        taskList: {
          sellerId: '',
          taskOne: { taskState: false, taskId: '', taskType: '', url: '' },
          taskTwo: { taskState: false, taskId: '', taskType: '', url: '' },
        },
      })
      let getTaskInfo = await luckyBag.getTaskInfo(parameter);
      my.hideLoading()
      let taskList = this.data.taskList;
      taskList.taskOne.taskId = parameter.id;
      taskList.taskOne.taskType = parameter.task1Type == 1 ? "member" : (parameter.task1Type == 2 ? "follow" : (parameter.task1Type == 3 ? "goshop" : parameter.task1Type))
      taskList.sellerId = parameter.sellerId;
      taskList.taskOne.url = parameter.task1Url;
      taskList.taskTwo.taskId = parameter.id;
      taskList.taskTwo.taskType = parameter.task2Type == 1 ? "member" : (parameter.task2Type == 2 ? "follow" : (parameter.task2Type == 3 ? "goshop" : parameter.task2Type))
      taskList.taskTwo.url = parameter.task2Url;
      if (!getTaskInfo.data) {
      } else {
        getTaskInfo.data.forEach((item, index) => {
          for (const key in taskList) {
            if (key === 'taskOne') {
              if (item.taskType === taskList[key].taskType) {
                taskList[key].taskState = true;
              }
            } else if (key === 'taskTwo') {
              if (item.taskType === taskList[key].taskType) {
                taskList[key].taskState = true;
              }
            } else if (key === 'taskThree') {
              if (item.taskType === taskList[key].taskType) {
                taskList[key].taskState = true;
              }
            }
          }
        })
        // 任务完成没开奖的再次开奖 add by linxh
       let onOpenBag = this.props.onOpenBag;
       let taskCount =  parameter.task1Type &&  parameter.task2Type ?2:1
       if(onOpenBag && getTaskInfo.data.length==taskCount && parameter.openStatus===0) {
         onOpenBag(parameter)
       }
       // add by linxh end
      }
      this.setData({
        taskList: taskList
      })
      if (parameter.task2Type) {
        this.setData({
          taskState: true,
        })
      } else {
        let param = this.data.taskList.taskOne;
        param.sellerId = this.data.taskList.sellerId;
        delete param.taskState;
        luckyBag.goTask(param)
      }
    },
    async hanldeRecord() {
      const recordList = await luckyBag.getPrizeResult()
      if (recordList.data) {
        this.setData({
          recordList: recordList.data,
        })
      }
      this.setData({
          recordState: true,
      })
      this.props.onOpenRecord({recordState:this.data.recordState})
    },
    handleClose() {
      this.setData({
        taskState: false,
        recordState: false,
      })
      this.props.onOpenRecord({recordState:this.data.recordState})
    },
    //跳转去做任务
    handleTask(event) {
      let parameter = {};
      if (event.currentTarget.dataset.taskId == "1") {
        parameter = this.data.taskList.taskOne;
      } else if (event.currentTarget.dataset.taskId == "2") {
        parameter = this.data.taskList.taskTwo;
      }
      parameter.sellerId = this.data.taskList.sellerId;
      delete parameter.taskState;
      luckyBag.goTask(parameter)
    }
  },
}));
