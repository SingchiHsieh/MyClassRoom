// (async function(){
//     document.querySelector("video").srcObject =await navigator.mediaDevices.getUserMedia({
//         video:true,
//         audio:true
//     })
// })();

new Vue({
    el:"#vueapp",
    mounted(){
        this._initVueApp()
    },
    methods:{
        async _initVueApp(){
            this.$refs.video.srcObject = await navigator.mediaDevices.getUserMedia({
                video:true,
                audio:false
            }),

            this._context2d = this.$refs.canvas.getContext("2d")

        },
        btnTakePhoto(){
            this._context2d.drawImage(this.$refs.video,0,0,400,300)
        }
    }
});