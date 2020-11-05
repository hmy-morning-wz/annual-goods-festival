import { connect } from 'herculex';
import Tracker from '@tklc/miniapp-tracker-sdk'
Component(connect({
  
})(Tracker.Component.hook({
  mixins: [],
  data: { 
  },
  props: {  
    bgImage:'/images/youhuiquan.png',
    kefu:"支付宝客服电话：95188",
    buttonText1:"更多福袋",
    buttonText2:"进店逛逛",
    className: '',
    topImageSize: 'md',
    showClose: true,
    hiddenButton:false,
    closeType: '0'
   
    },
  didMount() {

      
  },
  didUpdate() {},
  didUnmount() {},

  methods: {
   onAppear(){},
   onModalClick(e) {
       console.log('onModalClick',e)
       let onModalClick = this.props.onModalClick;

      if (onModalClick) {
        onModalClick(e);
      }else {
        
      }
      let obj = e.currentTarget.dataset.obj
      if(obj ){
         if(obj.win && (!obj.isMemmber)) {//进店逛逛
                let url = obj.shopUrl
                let url_path = '/pages/webview/webview?url=' + encodeURIComponent(url) 
                my.navigateTo({
                     url: url_path
                }); 
         }else {
            let onModalClose = this.props.onModalClose;
              if (onModalClose) {
               onModalClose(e);
            }
         }
      }
    
    },
   onModalClose(e) {
      console.log('onModalClose',e)     
      let onModalClose = this.props.onModalClose;
      if (onModalClose) {
        onModalClose(e);
      }else {
       
      }
    },
    onBannerClick(e){
      console.log('onBannerClick',e)
      let onBannerClick = this.props.onBannerClick;
      if (onBannerClick) {
        onBannerClick(e);
      }else {
      
      }
   let obj = e.currentTarget.dataset.obj
   if(obj){
        let url = obj.bannnerUrl
        let url_path = '/pages/webview/webview?url=' + encodeURIComponent(url) 
        my.navigateTo({
            url: url_path
        }); 
   }

    }
  },
})));
