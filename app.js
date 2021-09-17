/*
 * @Author: 陈诚
 * @Date: 2021-08-16 09:18:31
 * @LastEditTime: 2021-09-13 10:00:17
 * @LastEditors: E-Dreamer
 * @Description: 
 */
const express = require('express')
const fs  = require("fs");
const app = express();
const path = require('path')

app.use(express.static('./'))

// app.post('/basedata',(res)=>{
//   return res.json({
    
//   })
// })
app.listen(3350, () => {
  console.log('http://localhost:3350/')
})