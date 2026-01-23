<script>
  const { src, class: className = "", muted: initialMuted = true } = $props();
  let muted = $derived(initialMuted);
  let videoElement = $state(null);

  $effect(() => {
    if (videoElement) {
      videoElement.muted = muted;
    }
  });

  function togglePlayPause() {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }
</script>

<div class="relative outline">
  <video
    class={className}
    autoplay
    muted
    bind:this={videoElement}
    loop
    playsinline
    onclick={togglePlayPause}
  >
    <source {src} type="video/mp4" />
  </video>
  <button
    class="absolute bottom-5 right-5 bg-yellow border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-black"
    onclick={() => (muted = !muted)}
    aria-label={muted ? "Unmute" : "Mute"}
  >
    {#if muted}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
        ></path>
      </svg>
    {/if}
  </button>
</div>
