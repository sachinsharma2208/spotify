console.log("welcome to spotify");

// Initialize the Variables 
let songIndex = 0;
let audioElement = new Audio('3.mp3');
let masterPlay = document.getElementById('masterPlay');
let rangeSlider = document.getElementById('rangeSlider');
let gif = document.getElementById('gif');
let masterSongName= document.getElementById('masterSongName');
let songitems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Tera Chehra", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    {songName: "Ek Number", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    {songName: "Finding her", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    {songName: "Ishq Hai", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    {songName: "Hossana", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    {songName: " Paro", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    {songName: "Tera Aashiq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    {songName: "Saibo", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    {songName: "Raadha Gori Gori", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    
];//audioElement.play();

songitems.forEach((element,i) => {
  console.log(element,i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  
});


//Handle play/pause click
// masterPlay.addEventListener('click',()=>{
//   const icon = masterPlay.querySelector('i'); 
//   if(audioElement.paused || audioElement.currentTime<=0){
//     // audioElement.play();
//     masterPlay.classList.remove('fa-play-circle');
//     masterPlay.classList.add('fa-pause-circle');
//     gif.style.opacity = 1;    //opacity means appear 

//   }
//   else {
//     audioElement.pause();
//     masterPlay.classList.remove('fa-pause-circle');
//     masterPlay.classList.add('fa-play-circle');
//     gif.style.opacity = 0;    //opacity means appear 
//   }
//   });

masterPlay.addEventListener('click', () => {
  const icon = masterPlay.querySelector('i');
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    // Update the icon of current playing song
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;

    // Update the icon of current playing song
    document.getElementById(songIndex).classList.remove('fa-pause-circle');
    document.getElementById(songIndex).classList.add('fa-play-circle');
  }
});


//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
  // console.log('timeupadate');
  //upadate seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
  rangeSlider.value = progress;
});

rangeSlider.addEventListener('change',()=>{
  audioElement.currentTime = rangeSlider.value*audioElement.duration/100;

});

const makeAllPlays =() => {
  Array.from(document.getElementsByClassName('imogi')).forEach((element)=>{
     element.classList.remove('fa-pause-circle');
     element.classList.add('fa-play-circle');
  })
}



// Array.from(document.getElementsByClassName('imogi')).forEach((element)=>{
//   element.addEventListener('click',(e)=>{
//     makeAllPlays();
//     songIndex = parseInt(e.target.id);
//     e.target.classList.remove('fa-play-circle');
//     e.target.classList.add('fa-pause-circle');
//     audioElement.src = `songs/${songIndex + 1}.mp3`;
//     masterSongName.innerText = songs[songIndex].songName;
//     audioElement.currentTime = 0;
//     audioElement.play();
//     gif.style.opacity = 1
//     e.target.classList.remove('fa-play-circle');
//     e.target.classList.add('fa-pause-circle');
//   })
// }) 

// Array.from(document.getElementsByClassName('imogi')).forEach((element) => {
//     element.addEventListener('click', (e) => {
//         const clickedIndex = parseInt(e.target.id);

//         if (songIndex === clickedIndex && !audioElement.paused) {
//             //if both condition are true ho, Kya user ne wahi song dobara click kiya hai (songIndex === clickedIndex),
//             //  Aur kya song already play ho raha hai (!audioElement.paused)
//             // Pause if the same song is playing
//             audioElement.pause();
//             e.target.classList.remove('fa-pause-circle');
//             e.target.classList.add('fa-play-circle');
//             gif.style.opacity = 0;
//             masterPlay.classList.remove('fa-pause-circle');
//             masterPlay.classList.add('fa-play-circle');
//         } else {
//             // Play new song or resume same song
//             makeAllPlays();
//             songIndex = clickedIndex;
//             audioElement.src = `songs/${songIndex + 1}.mp3`;
//             masterSongName.innerText = songs[songIndex].songName;
//             audioElement.currentTime = 0;
//             audioElement.play();
//             gif.style.opacity = 1;
//             e.target.classList.remove('fa-play-circle');
//             e.target.classList.add('fa-pause-circle');
//             masterPlay.classList.remove('fa-play-circle');
//             masterPlay.classList.add('fa-pause-circle');
//         }
//     });
// });


Array.from(document.getElementsByClassName('imogi')).forEach((element) => {
  element.addEventListener('click', (e) => {
    let clickedIndex = parseInt(e.target.id);

    if (songIndex === clickedIndex && !audioElement.paused) {
      // Same song is playing → Pause it
      audioElement.pause();
      e.target.classList.remove('fa-pause-circle');
      e.target.classList.add('fa-play-circle');
      gif.style.opacity = 0;
    } else {
      // Check if different song clicked
      if (songIndex !== clickedIndex) {
        songIndex = clickedIndex;
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
      }
      makeAllPlays();
      audioElement.play(); // Resume or play new
      gif.style.opacity = 1;
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
    }
  });
});




document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});



document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
