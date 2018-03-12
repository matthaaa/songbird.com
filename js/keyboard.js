function keyboard(keysByNoteName, selectedKeys, nextKeys) {
  document.getElementById("c").onclick = function() {playKey(0)};
  document.getElementById("d").onclick = function() {playKey(1)};
  document.getElementById("e").onclick = function() {playKey(2)};
  document.getElementById("f").onclick = function() {playKey(3)};
  document.getElementById("g").onclick = function() {playKey(4)};
  document.getElementById("a").onclick = function() {playKey(5)};
  document.getElementById("b").onclick = function() {playKey(6)};
  document.getElementById("c2").onclick = function() {playKey(7)};
  document.getElementById("d2").onclick = function() {playKey(8)};
  document.getElementById("e2").onclick = function() {playKey(9)};
  document.getElementById("f2").onclick = function() {playKey(10)};
  document.getElementById("g2").onclick = function() {playKey(11)};
  document.getElementById("a2").onclick = function() {playKey(12)};
  document.getElementById("b2").onclick = function() {playKey(13)};
  document.getElementById("c3").onclick = function() {playKey(14)};

  document.getElementById("clear").onclick = function() {clearKeys()};

  const allKeys = document.querySelectorAll(".white-key");

  function highlightNextKeys(nextKeys) {
    allKeys.forEach((key) => {
      if (nextKeys.includes(Number(key.dataset.index))) {
        key.classList = "white-key valid-key";
      } else {
        key.classList = "white-key invalid-key";
      }
    });
  }

  function addKeysToNextKeys(keys) {
    keys.forEach(key => {
      if (key >= 0) {
        nextKeys.push(key);
      }
    });

    highlightNextKeys(nextKeys);
  }

  function updateNextKeys(keyId=7) {
    nextKeys = [];
    lastKey = selectedKeys[selectedKeys.length - 1];
    secondLastKey = selectedKeys[selectedKeys.length - 2];

    if (lastKey === keyId) {
      addKeysToNextKeys([
        (keyId),
        (keyId + 1),
        (keyId - 1),
        (keyId + 2),
        (keyId - 2),
        (keyId + 4),
        (keyId - 4),
      ]);
    }

    if (lastKey === keyId + 2) {
      addKeysToNextKeys([
        (keyId),
        (lastKey + 1),
        (lastKey - 1),
      ]);
    }

    if (lastKey === keyId - 1) {
      addKeysToNextKeys([
        (lastKey + 2),
        (lastKey - 2),
      ]);
    }

    if (lastKey === keyId + 1) {
      addKeysToNextKeys([
        (lastKey + 3),
        (lastKey - 2),
      ]);
    }

    if (lastKey === keyId + 4) {
      addKeysToNextKeys([
        (lastKey - 1),
        (lastKey - 2),
      ]);
    }

    if (lastKey === keyId + 3) {
      addKeysToNextKeys([
        (lastKey - 2),
        // (lastKey - 2),
      ]);
    }

    if (lastKey === keyId - 3) {
      addKeysToNextKeys([
        (keyId),
      ]);
    }

    if (
      lastKey === keyId - 1 && secondLastKey === keyId + 1 ||
      lastKey === keyId + 1 && secondLastKey === keyId - 1
    ) {
      addKeysToNextKeys([
        (keyId),
      ]);
    }
  }

  // allKeys.forEach((key) => (
  //   key.addEventListener("mouseup", handleKeyPress)
  // ));

  // const timelineCanvas = document.getElementById("timelineCanvas");
  // const context = timelineCanvas.getContext("2d")

  function playKey(key) {
    var audio = new Audio(keysByNoteName[key].soundSrc);
    selectedKeys.push(key);
    audio.play();
    new timeline(keysByNoteName, selectedKeys)
    updateNextKeys();
  }

  function clearKeys() {
    selectedKeys = [];
    allKeys.forEach((key) => {
      key.classList = "white-key";
    });
    new timeline(keysByNoteName, selectedKeys)
    context.clearRect(0, 0, timelineCanvas.width, timelineCanvas.height);
  }

  function removeLastKey(keys) {
    // keys.pop
    // updateNextKeys();
  }
}
