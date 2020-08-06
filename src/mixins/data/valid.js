/**
 * 表单验证公共字段
 */
var mustFill = { required: true, message: '该字段为必填项', trigger: 'blur' };
var mustNumber = {
  validator:(rule, value, callback) => {
    var reg = /^[0-9]*$/;
    if (!reg.test(value)) {
      return callback(new Error('输入内容只能为整数'));
    } else {
      callback();
    }
  },
  trigger: 'blur' 
}
export {
  mustFill,
  mustNumber
}