Component({
  mixins: [],
  data: {
    publicId:''
  },
  props: {
    publicId:''
  },
  didMount() { 
    let publicId = this.props.publicId
    this.setData({
      publicId: publicId
    })
    console.log('didMount====', publicId)
  },
  didUpdate() { },
  didUnmount() { },
  methods: {


    onFollow() {
      console.log("onFollow")
    },
    onAppear(e) {
      //type "appear"
      console.log("onAppear", e)
    }

  },


});
