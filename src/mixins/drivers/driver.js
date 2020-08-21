//导入driver
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

export default {
  data() {
    return {
      driver: null,
      checked:false,
      steps: [
        {
          element: '#menuWarpper',
          popover: {
            title: '菜单导航',
            description: '点击菜单可切换右侧菜单内容',
            position: 'right'
          },
          padding: 0
        },
        {
          element: '#collapseOpen',
          popover: {
            title: '折叠按钮',
            description: '点击收缩和展开菜单导航',
            position: 'bottom'
          },
          padding: 0
        },
        {
          element: '#profile',
          popover: {
            title: '个人中心',
            description: '点击图标，显示账户操作',
            position: 'left'
          },
          padding: 0
        }
      ]
    }
  },
  components: {

  },
  mounted() {
    this.driver = new Driver({
      className: "driverClass", // className to wrap driver.js popover
      animate: true, // Animate while changing highlighted element
      opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
      padding: 10, // Distance of element from around the edges
      allowClose: false, // Whether clicking on overlay should close or not
      overlayClickNext: false, // Should it move to next step on overlay click
      doneBtnText: "完成", // Text on the final button
      closeBtnText: "关闭", // Text on the close button for this step
      nextBtnText: "下一步", // Next button text for this step
      prevBtnText: "上一步", // Previous button text for this step
      onReset: ()=> {
        //设置下次不再提示
        window.localStorage.setItem('isNeedDrive',false);
      }
    })
  },
  methods: {
    guide() {
      this.driver.defineSteps(this.steps)
      console.log(this.driver);
      this.driver.start()
    }
  }
}