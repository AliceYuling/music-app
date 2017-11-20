import jsonp from 'common/js/jsonp.js';
import {commonParams, options} from './config.js';

export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  });

  return jsonp(url, data, options);
};
