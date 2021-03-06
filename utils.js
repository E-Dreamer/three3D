/*
 * @Author: 陈诚
 * @Date: 2021-08-18 14:29:22
 * @LastEditTime: 2021-09-13 14:25:38
 * @LastEditors: E-Dreamer
 * @Description: 
 */
//节流
function throttle(event, time) {
  let pre = 0;
  return function (...args) {
    if (Date.now() - pre > time) {
      pre = Date.now();
      event.apply(this, args);
    }
  }
}
// 深拷贝
function deepClone(obj,map = new Map()){
  if(typeof obj === 'object' && obj !== null){
    if(map.has(obj)) return map.get(obj);

    let data = Array.isArray(obj) ? [] : {};
    map.set(obj,data);
    for(let k in obj){
      if(obj.hasOwnProperty(k)){
        data[k] = deepClone(obj[k],map)
      }
    }
    return data;
  }
  return obj;
}
/**
 * @description: 
 * @param {*} Latitude 纬度
 * @param {*} Longitude 经度
 * @param {*} TimeZone 时区
 * @return {*}
 */
function computeSunRiseSunSet(Latitude, Longitude, TimeZone) {
  var curTime = new Date();
  // Variable names used: B5, C, C2, C3, CD, D, DR, H, HR, HS, L0, L5, M, MR, MS, N, PI, R1, RD, S1, SC, SD, str
  var retVal = new Object();
  var PI = Math.PI;
  var DR = PI / 180;
  var RD = 1 / DR;
  var B5 = Latitude;
  var L5 = Longitude;
  var H = -1 * (curTime.getTimezoneOffset() / 60 * -1); // Local timezone
  // Overriding TimeZone to standardize on UTC
  // H = 0;
  var M = curTime.getMonth() + 1;
  var D = curTime.getDate();
  B5 = DR * B5;
  var N = parseInt(275 * M / 9) - 2 * parseInt((M + 9) / 12) + D - 30;
  var L0 = 4.8771 + .0172 * (N + .5 - L5 / 360);
  var C = .03342 * Math.sin(L0 + 1.345);
  var C2 = RD * (Math.atan(Math.tan(L0 + C)) - Math.atan(.9175 * Math.tan(L0 + C)) - C);
  var SD = .3978 * Math.sin(L0 + C);
  var CD = Math.sqrt(1 - SD * SD);
  var SC = (SD * Math.sin(B5) + .0145) / (Math.cos(B5) * CD);
  if (Math.abs(SC) <= 1) {
    var C3 = RD * Math.atan(SC / Math.sqrt(1 - SC * SC));
    var R1 = 6 - H - (L5 + C2 + C3) / 15;
    var HR = parseInt(R1);
    var MR = parseInt((R1 - HR) * 60);
    retVal.SunRise = parseTime(HR + ":" + MR);
    var TargetTimezoneOffset = (TimeZone * 60 * 60 * 1000) + (retVal.SunRise.getTimezoneOffset() * 60 * 1000);
    var transformedSunRise = new Date(retVal.SunRise.getTime() + TargetTimezoneOffset);
    var strSunRise = "日出" + transformedSunRise.getHours() + ":" + (transformedSunRise.getMinutes() < 10 ? "0" + transformedSunRise.getMinutes() : transformedSunRise.getMinutes());
    //日出的秒数
    var strSunRiseSecond = transformedSunRise.getHours() * 60 * 60 + transformedSunRise.getMinutes() * 60
    var S1 = 18 - H - (L5 + C2 - C3) / 15;
    var HS = parseInt(S1);
    var MS = parseInt((S1 - HS) * 60);
    retVal.SunSet = parseTime(HS + ":" + MS);
    var transformedSunSet = new Date(retVal.SunSet.getTime() + TargetTimezoneOffset);
    var strSunSet = "日落" + transformedSunSet.getHours() + ":" + (transformedSunSet.getMinutes() < 10 ? "0" + transformedSunSet.getMinutes() : transformedSunSet.getMinutes());
    var strSunSetSecond = transformedSunSet.getHours() * 60 * 60 + transformedSunSet.getMinutes() * 60
    retVal.Noon = new Date((retVal.SunRise.getTime() + retVal.SunSet.getTime()) / 2);
    var transformedNoon = new Date(retVal.Noon.getTime() + TargetTimezoneOffset);
    var strNoon = "正午" + transformedNoon.getHours() + ":" + (transformedNoon.getMinutes() < 10 ? "0" + transformedNoon.getMinutes() : transformedNoon.getMinutes());
  } else {
    if (SC > 1) {
      // str="Sun up all day";
      strSunRise = ".";
      strNoon = ".";
      strSunSet = ".";
      var tDate = new Date();
      // Set Sunset to be in the future ...
      retVal.SunSet = new Date(tDate.getFullYear() + 1, tDate.getMonth(), tDate.getDay(), tDate.getHours());
      // Set Sunrise to be in the past ...
      retVal.SunRise = new Date(tDate.getFullYear() - 1, tDate.getMonth(), tDate.getDay(), tDate.getHours() - 1);
    }
    if (SC < -1) {
      // str="Sun down all day";
      strSunRise = ".";
      strNoon = ".";
      strSunSet = ".";
      // Set Sunrise and Sunset to be in the future ...
      retVal.SunRise = new Date(tDate.getFullYear() + 1, tDate.getMonth(), tDate.getDay(), tDate.getHours());
      retVal.SunSet = new Date(tDate.getFullYear() + 1, tDate.getMonth(), tDate.getDay(), tDate.getHours());
    }
  }
  retVal.strSunRise = strSunRise;
  retVal.strNoon = strNoon;
  retVal.strSunSet = strSunSet;
  retVal.str = strSunRise + ' | ' + strNoon + ' | ' + strSunSet;
  retVal.strSunRiseSecond = strSunRiseSecond;
  retVal.strSunSetSecond = strSunSetSecond;
  return retVal;
}
// parseTime(string aTime) - takes a string of time in the format HH:MM:SS
//                           and returns Javascript Date Object
//
function parseTime(aTime) {
  var aDateTimeObject = 'none';
  if (aTime !== undefined && aTime.length) {
    aDateTimeObject = GMTTime();
    try {
      var theHour = parseInt(aTime.split(':')[0]);
      var theMinutes = parseInt(aTime.split(':')[1]);
      aDateTimeObject.setHours(theHour);
      aDateTimeObject.setMinutes(theMinutes);
    } catch (ex) {}
  }
  return aDateTimeObject;
}
// GMTTime() - returns time adjusted to GMT (Universal Time)
function GMTTime() {
  var aDate = new Date();
  var aDateAdjustedToGMTInMS = aDate.getTime() + (aDate.getTimezoneOffset() * 60 * 1000);
  return (new Date(aDateAdjustedToGMTInMS));
}
// 原生获取经纬度
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       console.log(position.coords.longitude);
//       console.log(position.coords.latitude);
//     },
//     function (e) {
//       console.log(e.message);
//     }, {
//       enableHighAccuracy: true, //是否要求高精度的地理位置信息
//       timeout: 10000, //对地理位置信息的获取操作做超时限制，如果再该事件内未获取到地理位置信息，将返回错误
//       maximumAge: 60 * 1000 //设置缓存有效时间，在该时间段内，获取的地理位置信息还是设置此时间段之前的那次获得的信息，超过这段时间缓存的位置信息会被废弃
//     }
//   )
// }

function getPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let data = {
          lat: latitude,
          lng: longitude,
          utc: (0 - new Date().getTimezoneOffset() / 60)
        }
        resolve(data)
      }, function () {
        reject(arguments)
      }, {
        enableHighAccuracy: true, //是否要求高精度的地理位置信息
        timeout: 10000, //对地理位置信息的获取操作做超时限制，如果再该事件内未获取到地理位置信息，将返回错误
        maximumAge: 0 //设置缓存有效时间，在该时间段内，获取的地理位置信息还是设置此时间段之前的那次获得的信息，超过这段时间缓存的位置信息会被废弃
      })
    } else {
      reject('你的浏览器不支持当前地理位置信息获取')
    }
  })
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        let data = {
          lng: r.point.lng,
          lat: r.point.lat
        }
        resolve(data)
      } else {
        reject('failed' + this.getStatus())
      }
    });
  })
}
export {
  throttle,
  getCurrentPosition,
  computeSunRiseSunSet,
  getPosition,
  deepClone
}