import {FFmpegKit, ReturnCode, FFprobeKit} from 'ffmpeg-kit-react-native';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

function getVideoDimension(video) {
  return new Promise((resolve, reject) => {
    FFprobeKit.getMediaInformationAsync(video, async complete => {
      const data = await complete.getOutput();
      try {
        resolve({
          width: JSON.parse(data).streams[0].width,
          height: JSON.parse(data).streams[0].height,
        });
      } catch (error) {
        reject('JSON parse error');
      }
    }).catch(e => reject(e));
  });
}

export function checkVideosDimension(videos) {
  //return mindimension
  return new Promise((resolve, reject) => {
    let haveChange = false;
    let oldDevice = '';
    videos.some(item => {
      if (oldDevice === '') {
        oldDevice = item.deviceID;
      } else {
        if (oldDevice !== item.deviceID) {
          haveChange = true;
          return true;
        }
      }
    });
    if (!haveChange) {
      resolve(false);
    } else {
      const listDimentionPromise = [];
      videos.map(item => {
        listDimentionPromise.push(getVideoDimension(item.path));
      });
      Promise.all(listDimentionPromise)
        .then(datas => {
          let haveDiff = false;
          let minDimention = null;
          datas.map(data => {
            if (minDimention === null) {
              minDimention = data;
            } else if (data.width !== minDimention.width) {
              haveDiff = true;
              if (data.width < minDimention.width) {
                minDimention = data;
              }
            }
          });
          if (haveDiff) {
            resolve(minDimention);
          } else {
            resolve(true);
          }
        })
        .catch(e => {
          reject(e);
        });
    }
  });
}

export function formatVideoSpeed(videoPath, speed, isNeedToFormatDimentions) {
  return new Promise((resolve, reject) => {
    if (
      speed === 1 &&
      (isNeedToFormatDimentions === false || isNeedToFormatDimentions === true)
    ) {
      resolve(videoPath);
    } else {
      const newVideoRL = videoPath.replace('.mp4', '1.mp4');
      const newAutioURL = videoPath.replace('.mp4', '2.m4a');
      const finalVideoURL = videoPath.replace('.mp4', '3.mp4');
      const finalVideoURL2 = videoPath.replace('.mp4', '4.mp4');
      FFmpegKit.execute(
        '-y -itsscale ' +
          1 / speed +
          ' -an -i ' +
          videoPath +
          ' -c copy -preset ultrafast ' +
          newVideoRL,
      ).then(async session => {
        const returnCode = await session.getReturnCode();
        if (ReturnCode.isSuccess(returnCode)) {
          FFmpegKit.execute(
            '-y -i ' +
              videoPath +
              ' -filter:a "atempo=' +
              speed +
              '" -vn -preset ultrafast ' +
              newAutioURL,
          ).then(async session1 => {
            const returnCode1 = await session1.getReturnCode();
            if (ReturnCode.isSuccess(returnCode1)) {
              FFmpegKit.execute(
                '-y -i ' +
                  newVideoRL +
                  ' -i ' +
                  newAutioURL +
                  ' -c:v copy -c:a copy -preset ultrafast ' +
                  finalVideoURL,
              ).then(async session2 => {
                const returnCode2 = await session2.getReturnCode();
                if (ReturnCode.isSuccess(returnCode2)) {
                  getVideoDimension(videoPath).then(di => {
                    if (
                      isNeedToFormatDimentions !== false &&
                      isNeedToFormatDimentions !== true &&
                      di.width !== isNeedToFormatDimentions.width
                    ) {
                      FFmpegKit.execute(
                        '-i ' +
                          finalVideoURL +
                          ' -vf scale=' +
                          isNeedToFormatDimentions.width +
                          ':' +
                          isNeedToFormatDimentions.height +
                          ' -c:v libx264 -profile:v high444 -c:a copy -preset ultrafast ' +
                          finalVideoURL2,
                      ).then(async session3 => {
                        const returnCode3 = await session3.getReturnCode();
                        if (ReturnCode.isSuccess(returnCode3)) {
                          RNFS.unlink(videoPath)
                            .then(() => console.log('FILE DELETED'))
                            .catch(err =>
                              console.log('FILE DELETED error: ', err.message),
                            );
                          RNFS.unlink(newVideoRL)
                            .then(() => console.log('FILE DELETED'))
                            .catch(err =>
                              console.log('FILE DELETED error: ', err.message),
                            );
                          RNFS.unlink(newAutioURL)
                            .then(() => console.log('FILE DELETED'))
                            .catch(err =>
                              console.log('FILE DELETED error: ', err.message),
                            );
                          RNFS.unlink(finalVideoURL)
                            .then(() => console.log('FILE DELETED'))
                            .catch(err =>
                              console.log('FILE DELETED error: ', err.message),
                            );
                          resolve(finalVideoURL2);
                        } else {
                          reject('error: ', returnCode3);
                        }
                      });
                    } else {
                      RNFS.unlink(videoPath)
                        .then(() => console.log('FILE DELETED'))
                        .catch(err =>
                          console.log('FILE DELETED error: ', err.message),
                        );
                      RNFS.unlink(newVideoRL)
                        .then(() => console.log('FILE DELETED'))
                        .catch(err =>
                          console.log('FILE DELETED error: ', err.message),
                        );
                      RNFS.unlink(newAutioURL)
                        .then(() => console.log('FILE DELETED'))
                        .catch(err =>
                          console.log('FILE DELETED error: ', err.message),
                        );
                      resolve(finalVideoURL);
                    }
                  });
                } else {
                  reject('error: ', returnCode2);
                }
              });
            } else {
              reject('error: ', returnCode1);
            }
          });
        } else {
          reject('error: ', returnCode);
        }
      });
    }
  });
}

function convertMP4ToTS(videoPath) {
  return new Promise((resolve, reject) => {
    const fileTSPath = videoPath.replace('.mp4', '.ts');
    FFmpegKit.execute(
      '-y -i ' +
        videoPath +
        ' -c copy -bsf:v h264_mp4toannexb -f mpegts -preset ultrafast ' +
        fileTSPath,
    ).then(async session => {
      const returnCode = await session.getReturnCode();
      if (ReturnCode.isSuccess(returnCode)) {
        RNFS.unlink(videoPath)
          .then(() => console.log('FILE DELETED'))
          .catch(err => console.log('FILE DELETED error: ', err.message));
        resolve(fileTSPath);
      } else {
        reject(returnCode);
      }
    });
  });
}

export function joinAllVideos(videos) {
  return new Promise((resolve, reject) => {
    // bellow code used to concat video if needed
    checkVideosDimension(videos)
      .then(vi => {
        const listPromise = [];
        videos.forEach(element => {
          listPromise.push(formatVideoSpeed(element.path, element.speed, vi));
        });
        Promise.all(listPromise)
          .then(listReturnData => {
            if (listReturnData.length === 1) {
              resolve(listReturnData[0]);
            } else {
              if (Platform.OS === 'android' && vi) {
                let inputCommand = '';
                let indexCommand = '';
                listReturnData.map((item, index) => {
                  inputCommand = inputCommand + '-i ' + item + ' ';
                  indexCommand =
                    indexCommand + '[' + index + ':v:0][' + index + ':a:0]';
                });
                const finalFilePath = listReturnData[0].replace(
                  '.mp4',
                  'final.mp4',
                );
                const command =
                  inputCommand +
                  '-filter_complex "' +
                  indexCommand +
                  'concat=n=' +
                  listReturnData.length +
                  ':v=1:a=1[outv][outa]" -map "[outv]" -map "[outa]" -vsync 2 -preset ultrafast ' +
                  finalFilePath;
                FFmpegKit.execute(command).then(async session2 => {
                  const returnCode2 = await session2.getReturnCode();
                  if (ReturnCode.isSuccess(returnCode2)) {
                    listReturnData.map(item => {
                      RNFS.unlink(item)
                        .then(() => console.log('FILE DELETED'))
                        .catch(err =>
                          console.log('FILE DELETED error: ', err.message),
                        );
                    });
                    resolve(finalFilePath);
                  } else {
                    reject(returnCode2);
                  }
                });
              } else {
                const listTSPromise = [];
                listReturnData.forEach(element => {
                  listTSPromise.push(convertMP4ToTS(element));
                });
                Promise.all(listTSPromise)
                  .then(listTsReturn => {
                    let command = '';
                    listTsReturn.map((item, index) => {
                      command =
                        command +
                        item +
                        (index === listTsReturn.length - 1 ? '' : '|');
                    });
                    const finalFilePath = listReturnData[0].replace(
                      '.mp4',
                      'final.mp4',
                    );
                    FFmpegKit.execute(
                      '-y -i "concat:' +
                        command +
                        '" -c copy -bsf:a aac_adtstoasc -preset ultrafast ' +
                        finalFilePath,
                    ).then(async session2 => {
                      const returnCode2 = await session2.getReturnCode();
                      if (ReturnCode.isSuccess(returnCode2)) {
                        if (Platform.OS === 'android') {
                          const deg = videos[0]?.deviceID?.includes('back')
                            ? '270'
                            : '90';
                          const finalFilePath2 = listReturnData[0].replace(
                            '.mp4',
                            'final2.mp4',
                          );
                          FFmpegKit.execute(
                            '-i ' +
                              finalFilePath +
                              ' -map_metadata 0 -metadata:s:v rotate="' +
                              deg +
                              '" -codec copy ' +
                              finalFilePath2,
                          ).then(async session3 => {
                            const returnCode3 = await session3.getReturnCode();
                            if (ReturnCode.isSuccess(returnCode3)) {
                              RNFS.unlink(finalFilePath)
                                .then(() => console.log('FILE DELETED'))
                                .catch(err =>
                                  console.log(
                                    'FILE DELETED error: ',
                                    err.message,
                                  ),
                                );
                              listTsReturn.map(item => {
                                RNFS.unlink(item)
                                  .then(() => console.log('FILE DELETED'))
                                  .catch(err =>
                                    console.log(
                                      'FILE DELETED error: ',
                                      err.message,
                                    ),
                                  );
                              });
                              resolve(finalFilePath2);
                            }
                          });
                        } else {
                          listTsReturn.map(item => {
                            RNFS.unlink(item)
                              .then(() => console.log('FILE DELETED'))
                              .catch(err =>
                                console.log(
                                  'FILE DELETED error: ',
                                  err.message,
                                ),
                              );
                          });
                          resolve(finalFilePath);
                        }
                      } else {
                        reject('error: ', returnCode2);
                      }
                    });
                  })
                  .catch(error => reject(error));
              }
            }
          })
          .catch(error => reject(error));
      })
      .catch(e => reject(e));
    // const listPromise = [];
    // videos.forEach((element) => {
    //   listPromise.push(formatVideoSpeed(element.path, element.speed, false));
    // });
    // Promise.all(listPromise)
    //   .then((listReturnData) => {
    //     resolve(listReturnData);
    //   })
    //   .catch((error) => reject(error));
  });
}
