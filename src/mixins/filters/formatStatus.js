var formatStatus = {
  filters:{
    /**转换tips状态 */
    formatType(num){
      switch (num) {
        case 1:
          return "danger"    
        case 2:
          return "success"
        default:
          break;
      }
    },
    /**转换状态码 */
    formatStatus(num){
      switch (num) {
        case 1:
          return "禁用中"
        case 2:
          return "启用中"
        default:
          break;
      }
    }
  }
}
export {formatStatus};