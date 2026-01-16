<script>
  import Svg from "./Svg.svelte";
  import Rebel from "./Rebel.svelte";
  import { rebels } from "../data/rebels.js";
  import { onMount } from "svelte";

  let { rebelImages = {} } = $props();

  let open = $state(null);
  let rebelsFound = $state([]);

  onMount(() => {
    const stored = localStorage.getItem("rebelsFound");
    if (stored) {
      rebelsFound = JSON.parse(stored);
    }
  });

  function openRebel(id) {
    open = id;
    if (!rebelsFound.includes(id)) {
      rebelsFound = [...rebelsFound, id];
      localStorage.setItem("rebelsFound", JSON.stringify(rebelsFound));
    }
  }
</script>

<section class="px-2.5 lg:px-5 bg-black">
  <div class="grid lg:grid-cols-4 gap-2.5 lg:gap-5">
    <div class="lg:col-span-2 lg:col-start-2">
      <h2 class="lg:text-3xl text-center uppercase text-yellow py-2.5">
        SPOT THE REBELS in the city
      </h2>
    </div>
  </div>
</section>

<section class="relative bg-yellow pt-5">
  <div class="relative">
    <Svg src="/svg/city.svg" class="w-full h-full" />
    <button
      onclick={() => openRebel(1)}
      class="absolute top-[18%] left-[25%] bg-red text-white flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
    >
      1
    </button>
    <button
      onclick={() => openRebel(2)}
      class="absolute top-[24%] left-[87%] bg-red text-white flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
    >
      2
    </button>
    <button
      onclick={() => openRebel(3)}
      class="absolute top-[40%] left-[72%] bg-red text-white flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
    >
      3
    </button>
    <button
      onclick={() => openRebel(4)}
      class="absolute top-[51%] left-[37%] bg-red text-white flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
    >
      4
    </button>
    <button
      onclick={() => openRebel(5)}
      class="absolute top-[75%] left-[4%] bg-red text-white flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
    >
      5
    </button>
    <button
      onclick={() => openRebel(6)}
      class="absolute top-[74%] left-[44%] bg-red text-white flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
    >
      6
    </button>
  </div>
</section>

<section class="p-2.5 lg:p-5 my-10 lg:my-20">
  <div class="grid lg:grid-cols-4 gap-2.5 lg:gap-5">
    <div class="lg:col-span-2 lg:col-start-2">
      <div class="lg:columns-2 space-y-2.5 lg:space-y-5">
        {#each rebels as rebel}
          <div class="flex">
            <div class="w-10">
              <div class="border w-5 h-5 flex justify-center items-center">
                {#if rebelsFound.includes(rebel.id)}
                  <span class="font-ocr-pbi text-xl">👁</span>
                {/if}
              </div>
            </div>
            <div>
              <p class="uppercase">
                {rebel.id}.
                {#if rebelsFound.includes(rebel.id)}
                  <button
                    onclick={() => openRebel(rebel.id)}
                    class="underline cursor-pointer"
                  >
                    {rebel.name}
                  </button>
                {:else}
                  <span>{rebel.name}</span>
                {/if}
              </p>
              <p>{rebel.title}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

{#if open !== null}
  {@const rebel = rebels[open - 1]}
  {@const optimizedImage = rebelImages[rebel.image] || rebel.image}
  <Rebel
    rebel={{ ...rebel, image: optimizedImage }}
    onClose={() => (open = null)}
  />
{/if}
