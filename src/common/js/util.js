/**
 * Created by linying on 2017/7/8.
 * 解释url参数
 * @example ?id=12345&a=b,可在开发者工具的Console中输入window.location.search查看。
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let url = window.location.search;
  let arr = url.match(reg);
  console.log('---url---');
  console.log(url);
  console.log('---arr---');
  console.log(arr);
  // arr=['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
      console.log('---obj---');
      console.log(obj);
    });
  }
  return obj;
};
