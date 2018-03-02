<!--https://codepen.io/domenicosolazzo/pen/msJvi?page=1&

Credits to that guy. I'm just a copy-paster.
-->
<template>
  <div id="stamp" title="watwatwatwatwat" :style="{visibility: show ? 'visible' : 'hidden'}" :class="className">WAT</div>
</template>

<script>

  import { dispatch, sounds } from '../store';
  import {ACTION_PLAY_SOUND} from '../actions';
  export default {
    name: "stamp",
    // passing show as a props so we can use that to just toggle the animation.
    // If the element is not already 'ready' it looks laggish. I tried `mounted`: there's some delay, makes it look bad.
    props: ["show"],
    data() {
      return {}
    },
    computed: {
      className() {
        // side effect: this is bad, we should be using a `watch`.
        // But at least here I know that I'll run this at the same time that I change the class.
        // time matches transition duration. Not sure this is really in sync, does not feel like it...
        if (this.show) {
          setTimeout(() => {dispatch({type: ACTION_PLAY_SOUND, payload: {sound: sounds.stamp}}, 200)})
        }
        return this.show ? "rubber_stamp" : "rubber_stamp_2"
      }
    },
    // debug/development
    // methods: {
    //   changeClass() {
    //     if (this.className === "rubber_stamp") {
    //       this.className = "rubber_stamp_2";
    //       // setTimeout(this.changeClass, 1000)
    //     } else {
    //       this.className = "rubber_stamp"
    //     }
    //   }
    // }

  }
</script>


<style scoped>

  #stamp {
    z-index: 10;
  }


  .rubber_stamp_2 {
    font-family: 'Vollkorn', serif;
    font-size: 312px;
    line-height: 360px;
    text-transform: uppercase;
    font-weight: bold;
    color: red;
    border: 7px solid red;
    float: left;
    padding: 10px 7px;
    border-radius: 10px;

    opacity: 0.8;
    -webkit-transform: rotate(+45deg);
    -o-transform: rotate(-10deg);
    -moz-transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
    position: absolute;
    top: 14%;
    left: 69%;

  }

  .rubber_stamp_2::after {
    position: absolute;
    content: " ";
    width: 100%;
    height: auto;
    min-height: 100%;
    top: -10px;
    left: -10px;
    padding: 10px;
    background: url(../assets/noise.png) repeat round;
  }

  .rubber_stamp {
    font-family: 'Vollkorn', serif;
    font-size: 39px;
    line-height: 45px;
    text-transform: uppercase;
    font-weight: bold;
    color: red;
    border: 7px solid red;
    float: left;
    padding: 10px 7px;
    border-radius: 10px;

    opacity: 0.8;
    -webkit-transform: rotate(+45deg);
    -o-transform: rotate(-10deg);
    -moz-transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
    position: absolute;
    top: 14%;
    left: 69%;

    transition-property: font-size, line-height;
    transition-timing-function: ease-in-out;
    transition-duration: 0.2s;
  }

  .rubber_stamp::after {
    position: absolute;
    content: " ";
    width: 100%;
    height: auto;
    min-height: 100%;
    top: -10px;
    left: -10px;
    padding: 10px;
    background: url(../assets/noise.png) repeat round;
  }

</style>
