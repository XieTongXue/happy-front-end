/**
 * 其实这个demo不用这种方法去适配也行，将footer改为fiexd即可，之所以写这种，是因为
 * 之前做过的一些pc端的管理系统，要求内容高度不够时，footer位于最底端，高度超过屏幕时，
 * footer位于内容后边，此时不能使用fixed。
 * @param {vue对象} obj
 * @param {高度} height
 */
export default function setMinHeight (obj, height) {
  obj.minHeight = document.documentElement.clientHeight - height
  window.onresize = function () {
    obj.minHeight = document.documentElement.clientHeight - height
  }
}
