export default {
  /**
   * 开启关闭loading
   * @param {vuex默认参数} state 
   */
  handleLoding(state,payload){
    state.loading = payload.status;
  },
  /**
   * 存储用户信息
   * @param {状态} state 
   * @param {用户信息} payload 
   */
  changeId(state,payload){
    state.userInfo.adminId = payload.userInfo.userId
    state.userInfo.organId = payload.userInfo.entId
    state.userInfo.userName = payload.userInfo.username
    state.userInfo.pass = payload.userInfo.password
    state.userInfo.name = payload.userInfo.name
    state.userInfo.roleId = payload.userInfo.role_id
    state.userInfo.roleType = payload.userInfo.role_type
    state.userInfo.sex = payload.userInfo.sex
    state.userInfo.status = payload.userInfo.status
    state.userInfo.tel = payload.userInfo.telphone
  },
  /**
   * 将用户权限存放在vuex中
   * @param {*} state 
   * @param {*} payload 
   */
  setLimitPath(state,payload){
    state.limitPath = payload.path;
  },
  /**
   * 从localStorage获取用户信息
   */
  getUserInfo(state){
    state.userInfo.adminId = window.localStorage.getItem("adminId");//管理员ID 
    state.userInfo.organId = window.localStorage.getItem("organId");//机构ID
  },
}