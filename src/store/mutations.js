export default {
  /**
   * 开启关闭loading
   * @param {vuex默认参数} state 
   */
  handleLoding(state,payload){
    state.loading = payload.status;
  },
  /**
   * 
   * @param {状态} state 
   * @param {管理员id，机构id} payload 
   */
  changeId(state,payload){
    state.adminId = payload.adminId; 
    state.organId = payload.organId;
  },
}