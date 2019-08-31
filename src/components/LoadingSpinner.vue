<template>
   <div class="fingerprint-spinner">
     <div class="spinner-ring"></div>
     <div class="spinner-ring"></div>
     <div class="spinner-ring"></div>
     <div class="spinner-ring"></div>
     <div class="spinner-ring"></div>
     <div class="spinner-ring"></div>
     <div class="spinner-ring"></div>
     <div class="spinner-ring"></div>
     <div class="spinner-ring"></div>
   </div>
</template>>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@mixin centerer {
  position: absolute;
  left: calc(50% - 64px);
  margin-top: calc(50% - 128px);
  // transform: translate(100%, 120%);
}

/* LOADING ANIMATION */
.fingerprint-spinner {
  position: absolute;
  margin-left: calc(50% - 64px);
  margin-top: 20%;
}
.fingerprint-spinner, .fingerprint-spinner * {
      // @include centerer;
      box-sizing: border-box;
    }

    .fingerprint-spinner {
      height: 128px;
      width: 128px;
      padding: 2px;
      overflow: hidden;
      position: relative;
    }

    .fingerprint-spinner .spinner-ring {
      position: absolute;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: #ff1d5e;
      animation: fingerprint-spinner-animation 1500ms cubic-bezier(0.680, -0.750, 0.265, 1.750) infinite forwards;
      margin: auto;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }

    .fingerprint-spinner .spinner-ring:nth-child(1) {
      height: calc(120px / 9 + 0 * 120px / 9);
      width: calc(120px / 9 + 0 * 120px / 9);
      animation-delay: calc(50ms * 1);
    }

    .fingerprint-spinner .spinner-ring:nth-child(2) {
      height: calc(120px / 9 + 1 * 120px / 9);
      width: calc(120px / 9 + 1 * 120px / 9);
      animation-delay: calc(50ms * 2);
    }

    .fingerprint-spinner .spinner-ring:nth-child(3) {
      height: calc(120px / 9 + 2 * 120px / 9);
      width: calc(120px / 9 + 2 * 120px / 9);
      animation-delay: calc(50ms * 3);
    }

    .fingerprint-spinner .spinner-ring:nth-child(4) {
      height: calc(120px / 9 + 3 * 120px / 9);
      width: calc(120px / 9 + 3 * 120px / 9);
      animation-delay: calc(50ms * 4);
    }

    .fingerprint-spinner .spinner-ring:nth-child(5) {
      height: calc(120px / 9 + 4 * 120px / 9);
      width: calc(120px / 9 + 4 * 120px / 9);
      animation-delay: calc(50ms * 5);
    }

    .fingerprint-spinner .spinner-ring:nth-child(6) {
      height: calc(120px / 9 + 5 * 120px / 9);
      width: calc(120px / 9 + 5 * 120px / 9);
      animation-delay: calc(50ms * 6);
    }

    .fingerprint-spinner .spinner-ring:nth-child(7) {
      height: calc(120px / 9 + 6 * 120px / 9);
      width: calc(120px / 9 + 6 * 120px / 9);
      animation-delay: calc(50ms * 7);
    }

    .fingerprint-spinner .spinner-ring:nth-child(8) {
      height: calc(120px / 9 + 7 * 120px / 9);
      width: calc(120px / 9 + 7 * 120px / 9);
      animation-delay: calc(50ms * 8);
    }

    .fingerprint-spinner .spinner-ring:nth-child(9) {
      height: calc(120px / 9 + 8 * 120px / 9);
      width: calc(120px / 9 + 8 * 120px / 9);
      animation-delay: calc(50ms * 9);
    }

    @keyframes fingerprint-spinner-animation {
      100% {
        transform: rotate( 360deg );
      }
    }
</style>
