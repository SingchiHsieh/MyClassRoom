new Vue({
    el:"#vueapp",

    data:{
        currentWebmData:null,
        recording:false,
        paused:false,

        screenCurrentWebmData:null,
        screenRecording:false,
        screenPaused:false,

    },

    mounted(){
        this._initVueApp();
    },

    methods:{
        async _initVueApp(){
            this._stream = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:true
            })
            this._screenStream = await navigator.mediaDevices.getDisplayMedia({
                audio:false,
                video:true
            })

            this.$refs.preview.srcObject = this._stream
            this._recorder = new MediaRecorder(this._stream,{mimeType:"video/webm;codecs=h264"})
            this._recorder.ondataavailable = this.recorder_dataAvailiableHandler.bind(this)

            this.$refs.previewScreen.srcObject = this._screenStream
            this._screenRecorder = new MediaRecorder(this._screenStream,{mimeType:"video/webm;codecs=h264"})
            this._screenRecorder.ondataavailable = this.screenRecorder_dataAvailiableHandler.bind(this)
        },

        recorder_dataAvailiableHandler(e){
            console.log(e)
            this.currentWebmData = e.data;
        },
        screenRecorder_dataAvailiableHandler(e){
            console.log(e)
            this.screenCurrentWebmData = e.data;
        },

        btnRecordClicked(){
            this.recording=true
            this._recorder.start()
        },
        btnPauseClicked(){
            this.paused=true
            this._recorder.pause()
        },
        btnResumeClicked(){
            this.paused=false
            this._recorder.resume()
        },
        btnStopClicked(){
            this.recording=false
            this._recorder.stop()
        },
        btnPlayClicked(){
            this.$refs.player.src = URL.createObjectURL(this.currentWebmData);
        },

        btnScreenRecordClicked(){
            this.screenRecording=true
            this._screenRecorder.start()
        },
        btnScreenPauseClicked(){
            this.screenPaused=true
            this._screenRecorder.pause()
        },
        btnScreenResumeClicked(){
            this.screenPaused=false
            this._screenRecorder.resume()
        },
        btnScreenStopClicked(){
            this.screenRecording=false
            this._screenRecorder.stop()
        },
        btnScreenPlayClicked(){
            this.$refs.ScreenPlayer.src = URL.createObjectURL(this.screenCurrentWebmData);
        },
    }
})