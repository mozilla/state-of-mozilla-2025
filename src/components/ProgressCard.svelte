<script>
  import { progressStore } from "../stores/progressStore.js";
  import StakesSvg from "../components/svg/StakesSvg.svelte";
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
        <button
          onclick={() => progressStore.reset()}
          class="btn inline-flex! px-2.5! items-center space-x-2.5 w-full invert"
        >
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.25156 17C6.18242 16.4164 6.13056 16.0881 6.11327 15.7599C6.09598 15.4681 6.0787 15.1763 6.06141 14.7933C3.48583 14.538 1.51523 13.2614 0.512653 10.7994C-0.230637 8.93921 -0.230637 6.95137 0.944799 5C1.35966 5.38298 1.70539 5.71124 2.01654 6.00303C0.771958 9.68693 2.60426 12.9331 5.99228 12.8784C6.04414 12.2766 6.09598 11.6565 6.16513 11.0365C7.09856 11.6201 8.32585 12.8967 9 14.0091C8.274 15.0851 7.306 15.9058 6.25156 17Z"
              fill="white"
            />
            <path
              d="M11.9137 12C11.562 11.5448 11.2806 11.1442 10.9816 10.7435C11.7554 8.99545 11.7203 7.30197 10.5772 5.8088C9.69788 4.66161 8.62512 3.76934 6.97204 3.95144C6.91928 4.60697 6.86653 5.24431 6.81377 5.95448C5.86413 4.95296 4.96723 4.00607 4 2.98634C4.7562 1.9302 5.74102 1.01973 6.83135 0C6.86652 0.728376 6.90169 1.31107 6.93686 1.93019C7.95685 2.31259 9.012 2.62215 9.97923 3.11381C13.1799 4.75265 13.8482 9.4871 11.9313 12"
              fill="white"
            />
          </svg>
          <span>Restart</span>
        </button>
        <div class="flex justify-center">
          <StakesSvg />
        </div>
      </div>
    {/if}
  </div>
</div>
