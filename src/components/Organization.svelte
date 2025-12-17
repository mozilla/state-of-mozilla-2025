<script>
  import Svg from "./Svg.svelte";

  let { organization } = $props();

  let open = $state(false);
</script>

<div class="space-y-2.5 lg:space-y-5 mb-20">
  <div class="grid grid-cols-2 gap-2.5 lg:gap-5">
    <div class="aspect-square border p-5">
      <Svg src={organization.icon} class="w-full h-full" />
    </div>
    <div class="py-5 space-y-5">
      <p>{organization.name}</p>
      <a target="_blank" href={organization.url} class="underline">Website</a>
    </div>
  </div>

  {#if organization.paragraph1}
    <p class="[&>*>a]:underline">{@html organization.paragraph1}</p>
  {/if}

  <button
    onclick={() => (open = !open)}
    class="btn invert py-1! w-full flex items-center space-x-2.5"
  >
    <span class="font-ocr-pbi text-xl">👁</span>
    <span class:hidden={!open} class:visible={!open}
      >HIDE 2025 ACHIEVEMENTS</span
    >
    <span class:hidden={open} class:visible={open}>SHOW 2025 ACHIEVEMENTS</span>
  </button>

  {#if open}
    {#if organization.list1}
      <ul class="list-disc ml-5">
        {#each organization.list1 as item}
          <li class="[&>*>a]:underline">{@html item}</li>
        {/each}
      </ul>
    {/if}

    {#if organization.paragraph2}
      <p class="[&>*>a]:underline">{@html organization.paragraph2}</p>
    {/if}

    {#if organization.list2}
      <ul class="list-disc ml-5">
        {#each organization.list2 as item}
          <li class="[&>*>a]:underline">{@html item}</li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>
