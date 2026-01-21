<script>
  import Svg from "./Svg.svelte";

  let { organization } = $props();

  let open = $state(false);

  const isSvg = $derived(organization.icon?.endsWith(".svg"));
</script>

<div
  class="space-y-2.5 lg:space-y-5 mb-20 scroll-mt-[calc(1rem+42px)] lg:scroll-mt-[calc(1rem+99px)]"
>
  <div class="grid grid-cols-2 gap-2.5 lg:gap-5">
    <div class="aspect-square border p-5 flex justify-center items-center">
      <Svg src={organization.icon} class="w-full h-full lg:w-1/2 lg:h-1/2" />
    </div>
    <div class="relative py-5 space-y-5">
      <p>
        <strong>{organization.title}</strong>
        <br />
        {organization.name}
      </p>
      <a target="_blank" href={organization.url} class="underline">Website</a>
    </div>
  </div>

  {#if organization.paragraph1}
    <p class="[&>a]:underline [&>*>a]:underline">
      {@html organization.paragraph1}
    </p>
  {/if}

  <button
    onclick={() => (open = !open)}
    class="btn invert py-1! w-full flex items-center space-x-2.5"
  >
    <span class="font-ocr-pbi text-xl">👁</span>
    <span class:hidden={!open} class:visible={!open}>SHOW LESS</span>
    <span class:hidden={open} class:visible={open}>SHOW MORE</span>
  </button>

  {#if open}
    {#if organization.list1Intro}
      <p>{@html organization.list1Intro}</p>
    {/if}
    {#if organization.list1}
      <ol class="list-none space-y-2.5">
        {#each organization.list1 as item, i}
          <li class="flex gap-2.5 [&>a]:underline [&>*>a]:underline">
            <span
              class="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center"
              >{i + 1}</span
            >
            <p class="[&>img]:mt-2.5">{@html item}</p>
          </li>
        {/each}
      </ol>
    {/if}

    {#if organization.list2Intro}
      <p>{@html organization.list2Intro}</p>
    {/if}
    {#if organization.list2}
      <ol class="list-none space-y-2.5">
        {#each organization.list2 as item, i}
          <li class="flex gap-2.5 [&>a]:underline [&>*>a]:underline">
            <span
              class="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center"
              >{i + 1}</span
            >
            <p class="[&>img]:mt-2.5">{@html item}</p>
          </li>
        {/each}
      </ol>
    {/if}

    {#if organization.paragraph2}
      <p class="[&>a]:underline [&>*>a]:underline">
        {@html organization.paragraph2}
      </p>
    {/if}
  {/if}
</div>
