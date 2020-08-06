var formatStatus = {
  filters:{
    /**转换tips状态 */
    formatType(num){
      if (num == 1) {
        return "danger"  
      } else if(num == 2) {
        return "success"
      } else {
        return "info"
      }
    },
    /**转换状态码 */
    formatStatus(num){
      if (num == 1) {
        return "禁用中"  
      } else if(num == 2) {
        return "启用中"
      } else {
        return "已删除"
      }
    }
  }
}
export {formatStatus};