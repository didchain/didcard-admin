<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        small
        v-bind="attrs"
        v-on="on"
        @click="toggleFullscreenHandle"
      >
        <v-icon>
          {{ fullScreenState ? icons.fullScreen : icons.fullScreenExit }}
        </v-icon>
      </v-btn>
    </template>
    <span class="qk-icon-tip">
      {{ fullScreenState ? exitTips : fullTips }}
    </span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from 'vuex';

const toggleFullscreen = () => {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  const cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
    return true;
  }

  cancelFullScreen.call(doc);
  return false;
};

export default {
  name: 'FullScreenIcon',
  props: {
    fullTips: {
      type: String,
      default: '全屏',
      require: false,
    },
    exitTips: {
      type: String,
      default: '退出全屏',
      require: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('ui', ['icons', 'fullScreenState']),
  },
  methods: {
    toggleFullscreenHandle() {
      this.$store.dispatch('ui/toggleFullscreen', {
        state: toggleFullscreen(),
      });
    },
  },
};
</script>
