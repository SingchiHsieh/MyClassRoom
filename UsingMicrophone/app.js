// (async function (){
//     // let devices = await navigator.mediaDevices.enumerateDevices();
//     // console.log(devices)
//     let stream = await navigator.mediaDevices.getUserMedia({video:false,audio:true});
//     document.querySelector('audio').srcObject =stream;
// })();

new Vue({
    el:"#vueapp",
    data:{
        audioInputDevices: [],
        selectedAudioInputIndex:0
    },
    mounted(){
        this._initVueApp();
    },

    methods: {
        async _initVueApp(){
            let devices = await navigator.mediaDevices.enumerateDevices();
            console.log(devices);
            let audioInputDevices = devices.filter(value => value.kind==="audioinput");
            console.log(audioInputDevices)
            this.audioInputDevices.length=0;
            this.audioInputDevices.push(...audioInputDevices)
            // console.log(this.audioInputDevices)
            this.showSelectedDevice()
        },

        async showSelectedDevice(){
            let deviceInfo = this.audioInputDevices[this.selectedAudioInputIndex]
            let stream = await navigator.mediaDevices.getUserMedia({video:false,audio:deviceInfo})
            this.$refs.audio.srcObject = stream
        }
    },

    watch: {
        selectedAudioInputIndex(val, oldVal) {
            this.showSelectedDevice();
        }
    }
});