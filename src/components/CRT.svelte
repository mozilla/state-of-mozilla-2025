<script>
  // CRT/Glitch effect component
</script>

<!-- SVG filter definition -->
<svg class="absolute w-0 h-0">
  <defs>
    <filter id="pixelate">
      <feFlood x="4" y="4" height="2" width="2" />
      <feComposite width="10" height="10" />
      <feTile result="a" />
      <feComposite in="SourceGraphic" in2="a" operator="in" />
      <feMorphology operator="dilate" radius="5" />
    </filter>

    <filter id="phosphor">
      <!-- RGB phosphor glow effect -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1.2 0 0 0 0  0 1.2 0 0 0  0 0 1.2 0 0  0 0 0 1 0"
        result="brightBlur"
      />
      <feBlend in="SourceGraphic" in2="brightBlur" mode="screen" />
    </filter>

    <filter id="glitch">
      <!-- Turbulence for noise/distortion -->
      <feTurbulence
        baseFrequency="0.03 0.05"
        numOctaves="4"
        seed="2"
        result="turbulence"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="turbulence"
        scale="20"
        xChannelSelector="R"
        yChannelSelector="G"
        result="displace"
      />

      <!-- RGB channel separation for glitch effect -->
      <feOffset in="SourceGraphic" dx="6" dy="0" result="r" />
      <feOffset in="SourceGraphic" dx="-6" dy="0" result="b" />
      <feOffset in="SourceGraphic" dx="0" dy="0" result="g" />

      <feColorMatrix
        in="r"
        type="matrix"
        values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0"
        result="r"
      />
      <feColorMatrix
        in="g"
        type="matrix"
        values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0.5 0"
        result="g"
      />
      <feColorMatrix
        in="b"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 0.5 0"
        result="b"
      />

      <feBlend in="r" in2="g" mode="screen" result="rg" />
      <feBlend in="rg" in2="b" mode="screen" result="rgb" />

      <!-- Mix displacement and RGB separation -->
      <feBlend in="displace" in2="rgb" mode="normal" result="final" />

      <!-- Add heavy noise -->
      <feTurbulence
        type="fractalNoise"
        baseFrequency="1.5"
        numOctaves="5"
        result="noise"
      />
      <feColorMatrix
        in="noise"
        type="saturate"
        values="0"
        result="desaturatedNoise"
      />
      <feComponentTransfer in="desaturatedNoise" result="brightNoise">
        <feFuncA type="discrete" tableValues="0 0 0 1 1" />
      </feComponentTransfer>
      <feBlend in="final" in2="brightNoise" mode="overlay" result="noisy" />

      <!-- Reduce overall opacity -->
      <feComponentTransfer in="noisy">
        <feFuncA type="linear" slope="0.3" />
      </feComponentTransfer>
    </filter>
  </defs>
</svg>

<div class="crt-screen">
  <div class="crt-overlay"></div>
  <div class="scanlines"></div>
  <div class="vignette"></div>
</div>

<style>
  .crt-screen {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }

  .crt-overlay {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: url(#phosphor) url(#glitch) url(#pixelate) blur(8px)
      contrast(0.4) brightness(1.5) saturate(0.3);
    -webkit-backdrop-filter: url(#phosphor) url(#glitch) url(#pixelate)
      blur(8px) contrast(0.4) brightness(1.5) saturate(0.3);
    background-image:
      repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.25) 0px,
        transparent 1px,
        transparent 3px,
        rgba(0, 0, 0, 0.25) 4px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.25) 0px,
        transparent 1px,
        transparent 3px,
        rgba(0, 0, 0, 0.25) 4px
      ),
      repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.03) 0px,
        transparent 2px,
        transparent 4px
      );
    background-size: 5px 5px;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    animation: glitch-shift 0.3s infinite;
  }

  /* CRT Scanlines */
  .scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    background-size: 100% 2px;
    animation: scanline-move 8s linear infinite;
  }

  /* Screen vignette and edge darkening */
  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
    box-shadow:
      inset 0 0 100px rgba(0, 0, 0, 0.5),
      inset 0 0 200px rgba(0, 0, 0, 0.3);
  }

  @keyframes glitch-shift {
    0%,
    100% {
      transform: translate(0, 0);
    }
    33% {
      transform: translate(-2px, 2px);
    }
    66% {
      transform: translate(2px, -1px);
    }
  }

  @keyframes scanline-move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(10px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .crt-overlay {
      animation: none;
    }
    .scanlines {
      animation: none;
    }
  }
</style>
