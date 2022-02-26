
const playList = document.querySelector('.playList');
const audio = document.querySelector('audio');
const heading = document.querySelector('h4');
const singer = document.querySelector('.infor-songCurrent p')
const background = document.querySelector('.background');
const imgSong = document.querySelector('.img-songCurrent')
const progress = document.querySelector('.progress');
const progressWrap = document.querySelector('.progress-wrap')
const seekTime = document.querySelector('.seek-time');
const songHasbeenSing = [];
const statusSong = document.querySelector('.status-song');

const volumeBtn = document.querySelector('.status-song-volume');
const playBtn = document.querySelector('.btn-toggle-play')
const duration = document.querySelector('.duration');
const nextBtn = document.querySelector('.btn-next');
const randomBtn = document.querySelector('.btn-random')
const prevBtn = document.querySelector('.btn-prev');
const repeatBtn = document.querySelector('.btn-repeat')
const likeBtn = document.querySelector('.status-song-like')
const optionsBtn = document.querySelector('.status-song_menu');

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});
wavesurfer.load('./music/DeVuong-DinhDungACV-7121634.mp3');

var app = {
    
    isRepeat: false,
    isPlaying: false,
    isMute: false,
    isLike: false,
    isMenu: false,
    isRamdom: false,
    currentIndex: 0,
    songs: [
       
        {
            name: 'Đế Vương',
            singer:'Đình Dũng',
            img: './img/img1.jpg',
            path: './music/DeVuong-DinhDungACV-7121634.mp3',
            
        },
        
        {
            name: 'Ái Nộ',
            singer:'Masew fr Khôi Vũ',
            img: './img/img3.jpg',
            path: './music/AiNo1-MasewKhoiVu-7078913.mp3',
        },
        {
            name: 'Câu Hẹn Câu Thề',
            singer: 'Đình Dũng',
            img: './img/img5.jpg',
            path: './music/CauHenCauThe-DinhDung-6994741.mp3',

        },
        {
            name: 'Câu Hứa Chưa Vẹn Tròn',
            singer: 'Phát Huy',
            img: './img/img4.jpg',
            path: './music/CauHuaChuaVenTron-PhatHuyT4-7093319.mp3',

        },
        {
            name: 'Có Hẹn Với Thanh Xuân',
            singer: 'MONSTAR',
            img: './img/img7.jpg',
            path: './music/cohenvoithanhxuan-MONSTAR-7050201.mp3',
        },
        {
            name: 'Cưới Thôi',
            singer: 'Maser ft Masiu,Bray',
            img: './img/img8.jpg',
            path: './music/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3',

        },
        {
            name: 'Sài Gòn Đau Lòng Quá',
            singer: 'Hứa Kim Tuyền ft Hoàng Duyên',
            img: './img/img6.jpg',
            path: './music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3',

        },
        {
            name: 'The Lương',
            singer: 'Phục Chinh',
            img: './img/img4.jpg',
            path: './music/TheLuong-PhucChinh-6971140.mp3',

        },
        {
            name: '72 Phép Thần Thông',
            singer: 'YunoBigBoi ft Ngô Kiến Huy',
            img: './img/img9.jpg',
            path: './music/72PhepThanThong1-NgoKienHuyYunoBigBoi-6916502.mp3',

        },
        {
            name: 'Trên Tình Bạn Dưới Yêu',
            singer:'MIN ft 16Typh',
            img: './img/img10.jpg',
            path: './music/TrenTinhBanDuoiTinhYeu-MIN16Typh-6938265.mp3',

        },
    ],
    defindproperties: function() {
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },
    loadDuration: function() {
       audio.src = this.currentSong.path;
       audio.onloadedmetadata = function() {
           document.querySelector('.duration').textContent = app.setDuration(audio.duration);
       }
    },

    setDuration: function(duration){
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor((duration - hours * 3600) / 60);
        let seconds = Math.floor(duration - hours * 3600 - minutes * 60);

        hours = hours < 10 ? (hours > 0 ? "0" + hours : 0) : hours;

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
             seconds = "0" + seconds;
         }
        return (hours !== 0 ? hours + ":" : "") + minutes + ":" + seconds;
    },

  

    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        singer.textContent = this.currentSong.singer;
        imgSong.style.backgroundImage = `url('${this.currentSong.img}')`
        background.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path;

    },

    nextSong: function(){
        this.currentIndex++;
        if ( this.currentIndex ===this.songs.length){
            app.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function(){
        this.currentIndex--;
        if ( this.currentIndex <= 0){
            app.currentIndex = this.songs.length-1;
        }
        this.loadCurrentSong();
    },
    randomSong: function(){
        var checkSong = true;
        do{
            const songHasRandom = Math.floor(Math.random() *(this.songs.length - 0) + 0);
            for (var i of songHasbeenSing){
                if (i === songHasRandom){
                    checkSong = false;
                    break;
                }else {
                    checkSong = true;
                }
            }
            if (checkSong){
                app.currentIndex = songHasRandom;
                songHasbeenSing.push(songHasRandom);
                app.loadCurrentSong();
            }
            if (songHasbeenSing.length >= 10){
               songHasbeenSing.splice(0, songHasbeenSing.length)
            }   
        }while(checkSong == false);
            
            
    },

    scrollIntoView: function() {
        document.querySelector('.song.active').scrollIntoView(
            {
                behavior: 'smooth',
                block: 'nearest',
            }
        )
    },

    render: function(){
        const htmls = this.songs.map( function(song,index) {
            return `<div class="song ${index === app.currentIndex ? 'active' : ''}" date-index= "${index}" >
            <div class="img-song" style="background-image: url(${song.img});"></div>
            <div class="song-infor">
                <h4 class="name-song">${song.name}</h4>
                <p class="singer">${song.singer}</p>
            </div>
            <div class="song-time"></div>
            <div class="spectrum-code">
                <div></div>
                <div></div>
                <div></div>
            </div>
                <div class="setting-wrap ">
                    <i class="fas fa-ellipsis-v status-song_menu"></i>
                    <div class="song-Setting">
                        <div>Xóa</div>
                        <div>Thêm vào danh sách</div>
                    </div>
                </div>
        </div>`
        })
        playList.innerHTML = htmls.join('');
    },

    

    handleEvent: function(){
        // xu ly khi click 
        playBtn.onclick = function(){
            if (app.isPlaying){
                audio.pause();
            }else{
                audio.play();
            }
        }
        // Su kien tren dien thoai
        const width = window.innerWidth;
        var cdThumb;
        if (width > 320 && width < 480 ){
           cdThumb =  imgSong.animate([
                {transform : 'rotate(360deg)'}
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
            )
            cdThumb.pause()
            const WidthSong = imgSong.offsetWidth 
            window.onscroll = function() {
                
                const scroll = window.scrollY;
                
                const scrollCurrent = WidthSong - scroll;
                if (scrollCurrent > 0 ){
                    imgSong.style.width = scrollCurrent + 'px';
                    imgSong.style.height = scrollCurrent + 'px';
                    document.querySelector('.progress-wrap').style.display = 'flex'
                    document.querySelector('.curentSong-Time').style.display = 'flex'
                    imgSong.style.opacity = scrollCurrent / WidthSong ;
 
                    document.querySelector('.main-song').style.background = `rgba(232, 238, 237, ${scroll/scrollCurrent})`
                }else {
                    imgSong.style.width = 0;
                    imgSong.style.height = 0;
                    document.querySelector('.progress-wrap').style.display = 'none'
                    document.querySelector('.curentSong-Time').style.display = 'none'
                }
                // console.log(scroll)
            }
        }
        audio.onplay = function(){
            app.isPlaying = true;
            document.querySelector('.player').classList.add('playing')
            cdThumb.play()
        }
        audio.onpause = function (){
            app.isPlaying = false
            document.querySelector('.player').classList.remove('playing')
            cdThumb.pause()
        }
        // when ended song

        audio.onended = function(){
        
            if (app.isRamdom){
                app.randomSong();
                audio.play()
            }else if(app.isRepeat){
                audio.play();
            }
            else {
                app.nextSong();
                audio.play();
            }
            app.render();
            app.scrollIntoView();
        },

        // when clikc nextSong Btn
        nextBtn.onclick = function(){
            if ( app.isRamdom){
                app.randomSong();
                audio.play();
            }else if(app.isRepeat){
                audio.play();
            }else{
                app.nextSong();
                audio.play();
            }
            app.render();
            app.scrollIntoView();
        }
        //  when user click on prevBtn
        prevBtn.onclick = function(){
            app.prevSong();
            audio.play();
            app.render();
            document.querySelector('.player').classList.add('playing')
            app.scrollIntoView();
        }
        // when user click on ramdomBtn
        randomBtn. onclick = function () {
            if (app.isRamdom){
                randomBtn.classList.remove('active');
                app.isRamdom = false;
            }else {
                randomBtn.classList.add('active');
                app.    isRamdom = true;
            }
        }
        // when user click on repeatBtn
        repeatBtn.onclick = function () {
            if (app.isRepeat){
                repeatBtn.classList.remove('active');
                app.isRepeat = false;
            }else {
                repeatBtn.classList.add('active');
                app.isRepeat = true;
            }
        }

        volumeBtn.onclick = function(){
            if (app.isMute){
                statusSong.classList.remove('mute');
                app.isMute = false;
                audio.volume = 1;
            }else{
                statusSong.classList.add('mute');
                app.isMute = true; 
                audio.volume = 0;
            }
        }

        likeBtn.onclick = function(){
            if (app.isLike){
                statusSong.classList.remove('like');
                app.isLike = false;

            }else{
                statusSong.classList.add('like');
                app.isLike = true; 
            }
        }
        optionsBtn.onclick = function(){
            if (app.isMenu){
                app.isMenu = false;
                optionsBtn.classList.remove('click')

            }else {
                optionsBtn.classList.add('click')
                app.isMenu = true;
            }
        }


        playList.onclick = function(e) {
            const songNode =e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.setting-wrap')){
                if (songNode){
                   app.currentIndex = Number(songNode.getAttribute('date-index'));
                   app.loadCurrentSong();
                   app.render();
                   audio.play();
                }
            }
        }
        // update progress
        audio.ontimeupdate = function(){
            var time = audio.currentTime;
            seekTime.textContent = app.setDuration(time);
            if (audio.duration){
                const progressCurrent = (audio.currentTime / audio.duration ) * 100;
                progress.style.width = `${progressCurrent}%`;
            }
        }

        progressWrap.onclick = function(e) {     
            const width = e.offsetX;
            const time = (width / 400) * audio.duration;
            progress.style.width = width +'px';
            audio.currentTime = time;
            seekTime.textContent = app.setDuration(time);
        }

    },
    start: function(){
        songHasbeenSing.push(this.currentIndex);
        this.setDuration();
        this.defindproperties();
        this.loadDuration();
        this.loadCurrentSong();
        this.render();
        this.handleEvent();
        // this.scrollIntoView();
    }
}

app.start();


