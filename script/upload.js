/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require("fs");
const path = require("path");
const qiniu = require("qiniu");
const chalk = require("chalk");

const { version } = require(path.resolve("./package.json"));
const { bucket, accessKey, secretKey } = require(path.resolve("./.qiniu.js"));

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
// 构建上传策略函数
function getUpToken(key) {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: `${bucket}:${key}`,
    returnBody:
      '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
  });
  return putPolicy.uploadToken(mac);
}
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z1;
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = null; //  new qiniu.form_up.PutExtra();
// 上传文件
function uploadFile(key, localFile) {
  const uptoken = getUpToken(key);
  formUploader.putFile(uptoken, key, localFile, putExtra, (err, ret) => {
    if (!err) {
      console.log(
        chalk.bold.green("上传成功 hash:"),
        ret.hash,
        chalk.bold.green("key:"),
        ret.key,
        chalk.bold.green("persistentId:"),
        ret.persistentId
      );
    } else {
      console.error(chalk.bold.red("上传失败"), err);
    }
  });
}
//  目录上传方法
function uploadDirectory(dirPath, relative = "") {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      throw err;
    }
    //  遍历目录下的内容
    files.forEach((fileOrDir) => {
      const filePath = `${dirPath}/${fileOrDir}`;
      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          throw statErr;
        }
        const relativeName = `${relative}${relative ? "/" : ""}${fileOrDir}`;
        //  是目录就接着遍历 否则上传
        if (stats.isDirectory()) {
          uploadDirectory(filePath, relativeName);
        } else {
          const key = `date-picker/${version}/${relativeName}`;
          uploadFile(key, filePath);
        }
      });
    });
  });
}

module.exports = () => {
  const staticPath = path.resolve(__dirname, "../demo");
  uploadDirectory(staticPath);
};

const staticPath = path.resolve(__dirname, "../demo");
uploadDirectory(staticPath);
