"use strict";

function getNodeTextContent(node) {
  return Array.from(node.childNodes, (x) =>
    x.nodeType === 3 ? x.textContent : x.nodeName === "BR" ? "\n" : ""
  ).join("");
}

class PictureInPictureVideoWrapper {
  setMuted(video, shouldMute) {
    const muteButton = document.querySelector("button.bilibili-player-iconfont-volume");

    if (video.muted !== shouldMute && muteButton) {
      muteButton.click();
    } else {
      video.muted = shouldMute;
    }
  }
  setCaptionContainerObserver(video, updateCaptionsFunction) {
    let container = document.querySelector(".bilibili-player-video-subtitle .subtitle-wrap, .bpx-player-subtitle-wrap");

    if (container) {
      updateCaptionsFunction("");
      const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
          let textNodeList = container.querySelectorAll(".bili-subtitle-x-subtitle-panel-text");
          if (!textNodeList) {
            updateCaptionsFunction("");
            return;
          }

          updateCaptionsFunction(
            Array.from(textNodeList, getNodeTextContent).join("\n")
          );
        }
      };

      // immediately invoke the callback function to add subtitles to the PiP window
      callback([1], null);

      let captionsObserver = new MutationObserver(callback);

      captionsObserver.observe(container, {
        attributes: false,
        childList: true,
        subtree: true,
      });
    }
  }
}

this.PictureInPictureVideoWrapper = PictureInPictureVideoWrapper;
