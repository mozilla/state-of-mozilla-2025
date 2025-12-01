<script>
  import { onMount } from "svelte";

  const { children } = $props();

  let showContent = $state(false);

  const lines = [
    "INITIALIZING:// MOZILLA_2025",
    ":: JOIN_THE_MOVEMENT ::",
    "{ SIGNAL: OPEN }",
    "# MOZILLA//AI.MOVEMENT.ACTIVE",
    ">>> JOIN_THE_MOVEMENT_2025 >>>",
    "[DATA_STREAM: HUMAN-FIRST]",
    "// MOZILLA_2025 [AUTH_OK]",
    "< REBOOT_NETWORK >",
    ": JOIN_THE_MOVEMENT :",
    "[ ] TRANSMIT: MOZILLA",
    "> END_OF_LINE // CHOOSE_YOUR_FUTURE",
    ">>> JOIN_THE_MOVEMENT_2025 >>>",
    "{ SYSTEM: OPEN }",
    "// MOZILLA::2025::MOVEMENT",
    ">_ JOIN_THE_MOVEMENT();",
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
        class="btn inline-flex! items-center space-x-5 w-full lg:w-1/2"
        bind:this={buttonRef}
        onclick={closeIntro}
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
      >
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 18H2.39598V0H0V18Z" fill="white" />
          <path
            d="M4.34975 9.18147H13.8372V8.66409L7.65427 6.50965V4.68726L13.8372 2.53282V2.00772H6.51256V4.08494H4.34975V2.00772H6.51256V0H16V3.66795L10.9668 5.33591V5.85328L16 7.52123V11.1892H4.34975V9.18147Z"
            fill="white"
          />
        </svg>
        <span>Enter the website</span>
      </button>
    {/if}
  </section>
{:else}
  {@render children()}
{/if}
