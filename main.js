
const playList = document.querySelector('.playList');
const audio = document.querySelector('audio');
const heading = document.querySelector('h4');
const singer = document.querySelector('.infor-songCurrent p')
const background = document.querySelector('.background');
const imgSong = document.querySelector('.img-songCurrent')
const progress = document.querySelector('.progress');

const playBtn = document.querySelector('.btn-toggle-play')
const duration = document.querySelector('.duration');
const nextBtn = document.querySelector('.btn-next');
const randomBtn = document.querySelector('.btn-random')
const prevBtn = document.querySelector('.btn-prev');
var app = {
    isPlaying: false,
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

    updateProgres: function(){
       progress.style.left = 0;
       console.log({progress})
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

    render: function(){
        const htmls = this.songs.map( function(song) {
            return `<div class="song">
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
                document.querySelector('.player').classList.remove('playing')
            }else{
                audio.play();
                document.querySelector('.player').classList.add('playing')
            }

        }
        audio.onplay = function(){
            app.isPlaying = true;
        }
        audio.onpause = function (){
            app.isPlaying = false
        }
        // when ended song

        audio.onended = function(){
            app.nextSong();
            audio.play();
            document.querySelector('.player').classList.add('playing')
        },
        // when clikc nextSong Btn
        nextBtn.onclick = function(){
            if ( app.isRamdom){
                app.randomSong();
                audio.play();
            }else{
                app.nextSong();
                audio.play();
            }
            document.querySelector('.player').classList.add('playing')
            
        }
        //  when user click on prevBtn
        prevBtn.onclick = function(){
            app.prevSong();
            audio.play();
            document.querySelector('.player').classList.add('playing')
        }
        // when user click on ramdomBtn
       
        // update progress
        audio.ontimeupdate = function(){
            if (audio.duration){
                const progressCurrent = (audio.currentTime / audio.duration ) * 100;
                progress.style.width = `${progressCurrent}%`;
               
            }
        }
    },
    start: function(){
        this.setDuration();
        this.defindproperties();
        this.loadDuration();
        this.loadCurrentSong();
        this.render()
        this.handleEvent();
        this.updateProgres();

    }
}

app.start();


