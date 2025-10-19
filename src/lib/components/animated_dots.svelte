<script>
  /**
   * @typedef {Object} Props
   * @property {string} [color]
   * @property {number} [size]
   * @property {number} [strokeWidth]
   * @property {string} [class]
   */

  /** @type {Props} */
  let {
    color = 'currentColor',
    size = 24,
    strokeWidth = 2,
    class: className = ''
  } = $props();
</script>

<div class={className} aria-label="animated-dots" role="img">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    class="animated-dots"
    class:animate={true}
  >
    <path class="dot dot1" d="M  7 12 h.01" />
    <path class="dot dot2" d="M 12 12 h.01" />
    <path class="dot dot3" d="M 17 12 h.01" />
  </svg>
</div>

<style>
  div {
    display: inline-block;
  }
  .animated-dots {
    overflow: visible;
  }

  .dot {
    opacity: 1;
    transition: opacity 0.1s ease;
  }

  .animated-dots.animate .dot {
    animation: dotAnimation 1.5s infinite;
  }

  .animated-dots.animate .dot1 {
    animation-delay: 0s;
  }

  .animated-dots.animate .dot2 {
    animation-delay: 0.1s;
  }

  .animated-dots.animate .dot3 {
    animation-delay: 0.2s;
  }

  @keyframes dotAnimation {
    0%,
    100% {
      opacity: 1;
    }
    10%,
    20% {
      opacity: 0;
    }
    30%,
    50% {
      opacity: 1;
    }
    60%,
    70% {
      opacity: 0;
    }
    80%,
    90% {
      opacity: 1;
    }
  }
</style>
