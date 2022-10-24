<template>
  <div>
    <div id="head" class="mb-3">
      <h2 class="mt-3">{{ service.title }}</h2>
      <!--      <b-checkbox>Untertitel anzeigen</b-checkbox>-->
      <p class="text-muted m-0">{{ service.description }}</p>
    </div>
    <span v-html="service.media.textbefore"/>
    <div v-if="service.media.type === 'audio'">
      <div v-for="(song, index) in service.media.mediafiles" :key="index+'_'+song.name">
        <single-file-audio-player :song="song"></single-file-audio-player>
      </div>
    </div>
    <video-player v-else-if="service.media.type === 'video'" :videos="service.media.mediafiles"/>
    <b-jumbotron bg-variant="danger" text-variant="light" lead="Unbekannter Medientyp" v-else>
    </b-jumbotron>
    <span v-html="service.media.textafter"/>

  </div>
</template>

<script>
import serviceMixin from "@/components/Services/serviceMixin";
import SingleFileAudioPlayer from "@/components/AV-Components/SingleFileAudioPlayer";
import VideoPlayer from "@/components/AV-Components/VideoPlayer";

export default {
  name: "Media",
  components: {VideoPlayer, SingleFileAudioPlayer},
  mixins: [serviceMixin]
}
</script>

<style lang="scss" scoped>


</style>
