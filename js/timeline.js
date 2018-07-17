function timeline(keysByNoteName, selectedKeys) {
  var enablePlayBack = true;
  var currentlyPlaying = false;
  var playbackInterval = 300;

  document.getElementById("loop").onclick = function() {
    console.log("loop");
    console.log("enablePlayBack", enablePlayBack);
    console.log("currentlyPlaying", currentlyPlaying);
    if (currentlyPlaying) {
      stopPlayback();
    } else if (enablePlayBack) {
      playLoop(playback());
    } else {
      return null;
    }
  };

  document.getElementById("playButton").onclick = function() {
    enablePlayBack ? playback() : null;
  };

  selectedKeys.map((key) => {
    const note = keysByNoteName[key];
  })

  function removeHighlightColor(keys) {
    keys.map((key) => {
      var keyName = keysByNoteName[key].name;
      document.getElementById(keyName).style.backgroundColor = null;
    });

    for (let i = 0; i < selectedKeys.length; i++) {
      document.getElementById(`timeline-key ${i}`).style.backgroundColor = null;
    }
  }

  function playback() {
    keys = Array.from(selectedKeys);

    if (keys.length === 0) return null;
    enablePlayBack = false;
    let timelineKeyIndex = 0;

    const timer = setInterval(() => {

      currentKey = keys.shift();
      const note = keysByNoteName[currentKey];

      removeHighlightColor(selectedKeys);

      document.getElementById(note.name).style.backgroundColor = "#38EEFF";
      document.getElementById(`timeline-key ${timelineKeyIndex}`).style.backgroundColor = "#38EEFF";

      timelineKeyIndex++

      const audio = new Audio(note.soundSrc);
      audio.play();

      if (keys.length === 0) {
        enablePlayBack = true;
        setTimeout(() => {removeHighlightColor(selectedKeys)}, playbackInterval);
        clearInterval(timer, 0);
      }
    }, playbackInterval);

  }

  function playLoop(playFunction) {
    console.log(playFunction);
    console.log("loop!");
    currentlyPlaying = false;
    const loopInterval = playbackInterval * selectedKeys.length;
    console.log(loopInterval);

    // var context = this;
    const timer = setInterval(() => {
      playFunction();
    }, loopInterval);
  }

  function stopPlayback() {
    console.log("stop");
  }

}
