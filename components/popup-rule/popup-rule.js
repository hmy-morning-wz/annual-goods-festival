import { connect } from 'herculex';
import Tracker from '@tklc/miniapp-tracker-sdk'
Component(connect({
  mapStateToProps: ['ruleText' ]
})(Tracker.Component.hook({
  mixins: [],
  data: {},
  props: {
    showClose: true,
    hiddenButton:false,
    closeType: '0'
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
     onModalClose(e) {
      console.log('onModalClose',e)     
      let onModalClose = this.props.onModalClose;
      if (onModalClose) {
        onModalClose(e);
      }else {
       
      }
    },
  },
})))
