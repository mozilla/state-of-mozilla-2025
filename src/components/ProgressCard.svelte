<script>
  import { progressStore } from "../stores/progressStore.js";
  import Journey1Svg from "./svg/Journey1Svg.svelte";
  import Journey2Svg from "./svg/Journey2Svg.svelte";
  import Journey3Svg from "./svg/Journey3Svg.svelte";
  import Journey4Svg from "./svg/Journey4Svg.svelte";
  import Journey5Svg from "./svg/Journey5Svg.svelte";
  import Journey6Svg from "./svg/Journey6Svg.svelte";

  const { full } = $props();

  let cardHeight = $state(0);
  const progress = $derived($progressStore);
</script>

<div
  bind:clientHeight={cardHeight}
  style={full ? "" : `margin-top: -${cardHeight}px`}
  class={full
    ? "relative"
    : "pointer-events-none sticky z-30 bottom-0 p-2.5 lg:p-5"}
>
  <div
    class="grid gap-2.5 lg:gap-5 {full ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}"
  >
    <div class="pointer-events-auto">
      <div class="bg-white border border-black p-2.5">
        <div class="grid grid-cols-6 gap-px">
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">I</span>
            {#if progress.stakes}
              <div class="animate-blink-1 w-full h-full">
                <Journey1Svg />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">II</span>
            {#if progress.code}
              <div class="animate-blink-2 w-full h-full">
                <Journey2Svg />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">III</span>
            {#if progress.tools}
              <div class="animate-blink-3 w-full h-full">
                <Journey3Svg />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">IV</span>
            {#if progress.rebels}
              <div class="animate-blink-4 w-full h-full">
                <Journey4Svg />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">V</span>
            {#if progress.ledger}
              <div class="animate-blink-5 w-full h-full">
                <Journey5Svg />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">F</span>
            {#if progress.pledge}
              <div class="animate-blink-6 w-full h-full">
                <Journey6Svg />
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    {#if full}
      <div class="pointer-events-auto">
        <button onclick={() => progressStore.reset()} class="mt-2.5 btn invert">
          Reset progress
        </button>
      </div>
    {/if}
  </div>
</div>
