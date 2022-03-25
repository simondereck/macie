Component({

  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    actionSheetHidden: {
      type: Boolean,
      value: true,
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true
  },

  methods: {
    openActionSheet(e) {
      var self = this;
      self.setData({
        actionSheetHidden: !self.data.actionSheetHidden
      });
    },
    listenerActionSheet: function () {
      var self = this;
      self.setData({
        actionSheetHidden: !self.data.actionSheetHidden
      })
    },
    listenerOptionChange: function (event) {
      var self = this;
      let type = event.currentTarget.dataset.type;
      this.triggerEvent('methodSelect', type);
      this.listenerActionSheet();
    }
  }
})