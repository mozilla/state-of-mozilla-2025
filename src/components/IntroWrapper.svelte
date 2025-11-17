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
  let buttonRef = $state(null);
  let autoCloseTimer;

  onMount(() => {
    if (sessionStorage.getItem("introShown")) {
      showContent = true;
      return;
    }

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
          setTimeout(() => {
            buttonRef?.classList.add("auto-hover");
            autoCloseTimer = setTimeout(closeIntro, 4500);
          }, 500);
        }, randomDelay);
      }
    }

    addLine();
  });

  function closeIntro() {
    showContent = true;
    sessionStorage.setItem("introShown", "true");
  }

  function handleMouseEnter() {
    clearTimeout(autoCloseTimer);

    if (!buttonRef?.classList.contains("auto-hover")) return;

    const currentWidth = getComputedStyle(buttonRef, "::before").width;
    buttonRef.style.setProperty("--current-width", currentWidth);
    buttonRef.classList.replace("auto-hover", "manual-hover");
    void buttonRef.offsetWidth;

    requestAnimationFrame(() => buttonRef.classList.add("manual-hover-active"));
  }

  function handleMouseLeave() {
    buttonRef?.classList.remove("manual-hover", "manual-hover-active");
  }
</script>

{#if !showContent}
  <section id="intro" class="flex-1 p-2.5 lg:p-5 bg-black text-white z-40">
    <code class="block">
      {#each displayedLines as line}
        <p>{line}</p>
      {/each}
    </code>
    <p class="mb-2.5 lg:mb-5">
      <span class="blinking-cursor inline-block w-2.5 h-5 bg-white"></span>
    </p>
    {#if showButton}
      <button
        class="btn"
        bind:this={buttonRef}
        onclick={closeIntro}
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
      >
        Enter the website
      </button>
    {/if}
  </section>
{:else}
  {@render children()}
{/if}

<style>
  :global(html.intro-seen) #intro {
    display: none;
  }
</style>
