<script>
  import { progressStore } from "../stores/progressStore.js";
  import Journey1Svg from "./svg/Journey1Svg.svelte";
  import Journey2Svg from "./svg/Journey2Svg.svelte";
  import Journey3Svg from "./svg/Journey3Svg.svelte";
  import Journey4Svg from "./svg/Journey4Svg.svelte";
  import Journey5Svg from "./svg/Journey5Svg.svelte";
  import Journey6Svg from "./svg/Journey6Svg.svelte";

  let cardHeight = $state(0);
  const progress = $derived($progressStore);
</script>

<div
  bind:clientHeight={cardHeight}
  style="margin-top: -{cardHeight}px"
  class="sticky lg:w-1/3 z-30 bottom-0 p-2.5 lg:p-5"
>
  <div class="bg-white border border-black p-2.5">
    <div class="grid grid-cols-6 gap-px">
      <div class="relative aspect-square p-1 outline outline-black">
        <span class="absolute top-0 left-0 bg-black text-white">I</span>
        {#if progress.stakes}
          <Journey1Svg />
        {/if}
      </div>
      <div class="relative aspect-square p-1 outline outline-black">
        <span class="absolute top-0 left-0 bg-black text-white">II</span>
        {#if progress.code}
          <Journey2Svg />
        {/if}
      </div>
      <div class="relative aspect-square p-1 outline outline-black">
        <span class="absolute top-0 left-0 bg-black text-white">III</span>
        {#if progress.tools}
          <Journey3Svg />
        {/if}
      </div>
      <div class="relative aspect-square p-1 outline outline-black">
        <span class="absolute top-0 left-0 bg-black text-white">IV</span>
        {#if progress.rebels}
          <Journey4Svg />
        {/if}
      </div>
      <div class="relative aspect-square p-1 outline outline-black">
        <span class="absolute top-0 left-0 bg-black text-white">V</span>
        {#if progress.ledger}
          <Journey5Svg />
        {/if}
      </div>
      <div class="relative aspect-square p-1 outline outline-black">
        <span class="absolute top-0 left-0 bg-black text-white">F</span>
        {#if progress.pledge}
          <Journey6Svg />
        {/if}
      </div>
    </div>
    <button onclick={() => progressStore.reset()} class="mt-2.5 btn invert">
      Reset progress
    </button>
  </div>
</div>
