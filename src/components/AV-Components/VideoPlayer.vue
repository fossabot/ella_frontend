<template>
  <div class="m-2">
    <video
        id="video"
        class="video-js vjs-fluid"
        controls
        preload="auto"
    >
      <p class="vjs-no-js">
        Bitte aktivieren Sie JavaScript in Ihrem Browser und/oder verwenden Sie einen Browser der
        <a href="https://videojs.com/html5-video-support/" target="_blank"
        >HTML5 Videos unterstützt</a
        >
      </p>
    </video>
    <div v-if="videos.length>1">
      <p style="font-size: large" class="mt-3 mb-1"><strong>Playlist</strong></p>
      <b-button-group vertical class="w-100">
        <b-button :pressed="currentIndex === index" class="p-0 text-left" variant="outline-primary"
                  v-for="(video, index) in videos" @click="player.playlist.currentItem(index)" :key="'video'+index">
          <b-row>
            <b-col cols="auto" class="pr-0">
              <img v-if="video.imageurl" :src="video.imageurl" style="width: 100px; height: 100%;object-fit: cover;" :alt="video.imagecaption"/>
            </b-col>
            <b-col>
              <strong>{{ video.title }}</strong>
              <p class="">{{ video.description }}</p>
            </b-col>
          </b-row>
        </b-button>
      </b-button-group>
    </div>
  </div>

</template>

<script>

import videojs from 'video.js';
import playlist from 'videojs-playlist';
import videoPlayerTranslation from "/src/utilities/videoPlayerTranslation.js";
import 'video.js/src/css/video-js.scss';

export default {
  name: "VideoPlayer",
  props: {
    videos: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      player: null,
      currentIndex: 0
    }
  },
  mounted() {
    videojs.registerPlugin('playlist', playlist);
    videojs.addLanguage('de', videoPlayerTranslation);
    this.player = videojs('video', {language: 'de', "playbackRates": [1, 1.5, 2]});
    this.player.responsive(true);
    this.player.playlist(this.videos.map(video => {
      const retObj = {
        sources: [{src: video.url}],
        poster: video.imageurl,
      }
      if (video.transcript) {
        retObj.textTracks = [{
          src: URL.createObjectURL(new Blob([video.transcript], {type: "text/plain;charset=utf-8"})),
          kind: 'subtitles',
          srclang: 'de',
          label: 'Deutsch'
        }]
      }
      return retObj;
    }));
    this.player.on('playlistitem', () => {
      this.currentIndex = this.player.playlist.currentItem();
    });
    this.player.playlist.autoadvance(2);
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>

<style lang="scss">
#video {
  width: 100%;
}

.vjs-big-play-button {
  position: absolute;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
</style>
