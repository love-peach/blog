/**
 * @desc    创建服务端axios请求
 * @file    create-api-server.js
 * @author  zhangWuQiang
 */
import qs from 'qs';
import axios from 'axios';
import {parseCookie} from '../util/util';

export function createAPI({server}) {
    let api;
    axios.defaults.timeout = server.timeout;
    axios.defaults.baseURL = server.baseurl;
    axios.defaults.withCredentials = true;

    if (process.__API__) {
        api = process.__API__;
    } else {
        api = {
            get(url, params = {}) {
                let cookies = {};
                if (params.cookies) {
                    cookies = JSON.parse(JSON.stringify(params.cookies));
                }
                return new Promise((resolve, reject) => {
                    axios({
                        url,
                        params,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'X-Requested-With': 'XMLHttpRequest',
                            cookie: parseCookie(cookies)
                        },
                        method: 'get'
                    }).then(res => {
                        resolve(res.data);
                    }).catch(error => {
                        reject(error);
                    });
                });
            },
            post(url, params = {}) {
                let cookies = {};
                if (params.cookies) {
                    cookies = JSON.parse(JSON.stringify(params.cookies));
                }
                return new Promise((resolve, reject) => {
                    axios({
                        url,
                        data: qs.stringify(params),
                        method: 'post',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'cookie': parseCookie(cookies)
                        }
                    }).then(res => {
                        resolve(res.data);
                    }).catch(error => {
                        reject(error);
                    });
                });
            }
        };
    }
    return api;
}
