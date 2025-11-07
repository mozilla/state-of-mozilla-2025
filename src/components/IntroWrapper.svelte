<script>
  import { onMount } from "svelte";

  const { children } = $props();

  let showContent = $state(false);

  const lines = [
    "INITIALIZING:// MOZFEST_2025",
    ":: JOIN_THE_RESISTANCE ::",
    "{ SIGNAL: OPEN }",
    "# MOZFEST//AI.REBELLION.ACTIVE",
    ">>> JOIN_THE_RESISTANCE_2025 >>>",
    "[DATA_STREAM: HUMAN-FIRST]",
    "// MOZFEST_2025 [AUTH_OK]",
    "< REBOOT_NETWORK >",
    ": JOIN_THE_RESISTANCE :",
    "[ ] TRANSMIT: MOZFEST",
    "> END_OF_LINE // CHOOSE_YOUR_FUTURE",
    ">>> JOIN_THE_RESISTANCE_2025 >>>",
    "{ SYSTEM: OPEN }",
    "// MOZFEST::2025::REBELLION",
    ">_ JOIN_THE_RESISTANCE();",
  ];

  let displayedLines = $state([]);
  let showButton = $state(false);

  // Start the animation when component mounts
  onMount(() => {
    let currentIndex = 0;

    function addLine() {
      const randomDelay = Math.random() * 150 + 50;
      if (currentIndex < lines.length) {
        displayedLines = [...displayedLines, lines[currentIndex]];
        currentIndex++;
        setTimeout(addLine, randomDelay);
      } else {
        setTimeout(() => {
          showButton = true;
        }, randomDelay);
      }
    }

    addLine();
  });

  function handleEnter() {
    showContent = true;
  }
</script>

{#if !showContent}
  <section id="intro" class="fixed inset-0 p-3 lg:p-6 bg-black text-white z-50">
    <code class="block">
      {#each displayedLines as line}
        <p>{line}</p>
      {/each}
    </code>
    <p class="mb-3 lg:mb-6">
      <span class="blinking-cursor inline-block w-3 h-6 bg-white"></span>
    </p>
    {#if showButton}
      <button onclick={handleEnter}>Enter the website</button>
    {/if}
  </section>
{:else}
  <div>
    {@render children()}
  </div>
{/if}
