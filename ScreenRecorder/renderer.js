// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const jQuery = window.jQuery = require("jquery")
require("popper.js")
require("bootstrap")
const Vue = require('vue/dist/vue.min.js')

//渲染进程electron18,在main.js中初始化
const remote = require('@electron/remote')

const PlayerCanvas = require("./PlayerCanvas")

const SCREEN_WIDTH = 1920
const SCREEN_HEIGHT = 1080


const fs = require("fs")

new Vue({
    el:"#vueapp",
    data:{
        recording:false,
    },
    mounted() {
        this._initVueApp();
        this._playerCanvas = new PlayerCanvas(SCREEN_WIDTH,SCREEN_HEIGHT)
    },
    methods:{
        async _initVueApp(e){
            let stream = await navigator.mediaDevices.getUserMedia({
                audio:false,
                video:{
                    mandatory: {
                        chromeMediaSource:'desktop',
                        minWidth: SCREEN_WIDTH,
                        maxWidth: SCREEN_WIDTH,
                        minHeight: SCREEN_HEIGHT,
                        maxHeight: SCREEN_HEIGHT
                    }
                }
            });

            this.$refs.preview.srcObject = stream;
        },

        btnStartRecordClicked: async function (e) {
            //this.xxx 其他地方访问

            //
            this._stream = new MediaStream();

            await this.attachAudioStream();

            this._cameraStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
            this._playerCanvas.setCameraVideo(this.creatVideoElementWithStream(this._cameraStream));

            //视频轨
            this._screenStream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        minWidth: SCREEN_WIDTH,
                        maxWidth: SCREEN_WIDTH,
                        minHeight: SCREEN_HEIGHT,
                        maxHeight: SCREEN_HEIGHT
                    }
                }
            });

            this._playerCanvas.setScreenVideo(this.creatVideoElementWithStream(this._screenStream));

            let playerCanvasStream = this._playerCanvas.canvas.captureStream();
            playerCanvasStream.getTracks().forEach(t=>this._stream.addTrack(t))
            this.$refs.preview.srcObject = playerCanvasStream;

            this.startRecord();
        },

        btnStopClicked(e) {
            this.recording = false;
            this._recorder.stop()
        },

        creatVideoElementWithStream(stream){
            let video = document.createElement("video");
            video.autoplay = true;
            video.srcObject = stream;
            return video
        },

         startRecord(options) {
             this._recorder = new MediaRecorder(this._stream, {mimeType: "video/webm;codecs=h264"});

             this._recorder.ondataavailable = async e => {
                 let path = remote.dialog.showSaveDialogSync(remote.getCurrentWindow(),{
                     title:"保存文件",
                     defaultPath:"ScreenData.webm"
                 });

                 fs.writeFileSync(path, new Uint8Array(await e.data.arrayBuffer()))
             };

             this._recorder.start();
             this.recording = true;
         },

        async attachAudioStream(){
            this._audioStream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
            this._audioStream.getAudioTracks().forEach(value => this._stream.addTrack(value))
        }
    }
});