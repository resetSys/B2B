export default {
  /**
   * 开启关闭loading
   * @param {vuex默认参数} state 
   */
  handleLoding(state,payload){
    state.loading = payload.status;
  },
}