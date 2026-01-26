<script>
  import { onMount } from "svelte";

  const { children } = $props();

  let showContent = $state(false);

  const linesDesktop = [
    "INITIALIZING:// MOZILLA_2025",
    ":: CHOOSE_YOUR_FUTURE :: { SIGNAL: OPEN } # MOZILLA//FUTURE.ACTIVE",
    "{ SIGNAL: OPEN } # MOZILLA//FUTURE.ACTIVE [DATA_STREAM: HUMAN-FIRST]",
    "# MOZILLA//FUTURE.ACTIVE [DATA_STREAM: HUMAN-FIRST] // MOZILLA_2025 [AUTH_OK] < REBOOT_NETWORK >",
    "[DATA_STREAM: HUMAN-FIRST] // MOZILLA_2025 [AUTH_OK]",
    "// MOZILLA_2025 [AUTH_OK] < REBOOT_NETWORK > : CHOOSE_YOUR_FUTURE :",
    "< REBOOT_NETWORK > : CHOOSE_YOUR_FUTURE : [ ] TRANSMIT: MOZILLA > END_OF_LINE",
    ": CHOOSE_YOUR_FUTURE : [ ] TRANSMIT: MOZILLA",
    "[ ] TRANSMIT: MOZILLA > END_OF_LINE // { SYSTEM: OPEN } // MOZILLA::2025::",
    "> END_OF_LINE // { SYSTEM: OPEN } // MOZILLA::2025::",
    "&nbsp;",
    "/* ----------------------------------------- */",
    "&nbsp;",
    "MOZILLA::2025:: BOOT_SEQUENCE [COMPLETE]",
    "MOZILLA::2025:: NETWORK_STATUS [STABLE]",
    "MOZILLA::2025:: TRUST_LAYER [OVERDRIVE]",
    "&nbsp;",
    "> VERIFY_ETHICS();",
    "> VERIFY_PEOPLE();",
    "> VERIFY_FUTURE();",
    "&nbsp;",
    "/* ----------------------------------------- */",
    "&nbsp;",
    "[DATA_STREAM: HUMAN-FIRST] :: LOCKED_IN",
    "[VALUES: OPENNESS | PRIVACY | AGENCY] :: ENABLED",
    "[CONTROL: CENTRALIZED] :: DISABLED",
    "&nbsp;",
    "# MOZILLA//FUTURE.ACTIVE",
    "# MOZILLA//FUTURE.HUMAN",
    "# MOZILLA//FUTURE.PANDA",
    "&nbsp;",
    "/* ----------------------------------------- */",
    "&nbsp;",
    "SYSTEM_PROMPT:",
    "THE FUTURE IS NOT AUTO-GENERATED.",
    "THE FUTURE IS NOT PRE-APPROVED.",
    "THE FUTURE REQUIRES CONSENT.",
    "THE FUTURE IS YOURS TO BUILD.",
    "THE FUTURE IS EXPERIMENTAL SYNTH-MUSHROOM POP.",
    "&nbsp;",
    "/* ----------------------------------------- */",
    "&nbsp;",
    "> CHOOSE_YOUR_FUTURE();",
    "> BUILD_IT_TOGETHER();",
    "> KEEP_IT_OPEN();",
    "&nbsp;",
    "[AUTH_OK] [SIGNAL: OPEN]",
    "TRANSMISSION_CONTINUES…",
  ];

  const linesMobile = [
    "INITIALIZING:// MOZILLA_2025",
    ":: CHOOSE_YOUR_FUTURE ::",
    "{ SIGNAL: OPEN }",
    "# MOZILLA//FUTURE.ACTIVE",
    "[DATA_STREAM: HUMAN-FIRST]",
    "// MOZILLA_2025 [AUTH_OK]",
    "< REBOOT_NETWORK >",
    ": CHOOSE_YOUR_FUTURE :",
    "[ ] TRANSMIT: MOZILLA",
    "> END_OF_LINE // { SYSTEM: OPEN }",
    "// MOZILLA::2025::",
    "CHOOSE YOUR FUTURE();",
  ];

  let displayedLinesDesktop = $state([]);
  let displayedLinesMobile = $state([]);
  let showButton = $state(false);
  let buttonRef = $state(null);
  let codeContainerRef = $state(null);
  let autoCloseTimer;
  let isMobile = $state(false);

  onMount(() => {
    if (sessionStorage.getItem("introShown")) {
      showContent = true;
      return;
    }

    // Check if mobile (matches lg breakpoint at 1024px)
    isMobile = window.innerWidth < 1024;

    let currentIndexDesktop = 0;
    let currentIndexMobile = 0;

    function addLine() {
      const randomDelay = isMobile
        ? Math.random() * 75 + 75
        : Math.random() * 15 + 15;

      const desktopDone = currentIndexDesktop >= linesDesktop.length;
      const mobileDone = currentIndexMobile >= linesMobile.length;

      // Each platform only waits for its own lines
      const animationDone = isMobile ? mobileDone : desktopDone;

      if (!animationDone) {
        if (!desktopDone) {
          displayedLinesDesktop = [
            ...displayedLinesDesktop,
            linesDesktop[currentIndexDesktop],
          ];
          currentIndexDesktop++;
        }
        if (!mobileDone) {
          displayedLinesMobile = [
            ...displayedLinesMobile,
            linesMobile[currentIndexMobile],
          ];
          currentIndexMobile++;
        }
        // Auto-scroll to bottom (only on desktop)
        if (!isMobile) {
          requestAnimationFrame(() => {
            if (codeContainerRef) {
              codeContainerRef.scrollTop = codeContainerRef.scrollHeight;
            }
          });
        }
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
  <section
    id="intro"
    class="h-svh lg:h-[calc(100svh-2.5rem)] flex flex-col p-2.5 lg:p-5 bg-black outline outline-white text-white z-40"
  >
    <div
      bind:this={codeContainerRef}
      class="flex-1 overflow-y-auto overflow-x-hidden overscroll-none"
    >
      <!-- Desktop lines -->
      <code class="hidden lg:block font-ocr-pbi">
        {#each displayedLinesDesktop as line}
          <p>{@html line}</p>
        {/each}
      </code>
      <!-- Mobile lines -->
      <code class="block lg:hidden font-ocr-pbi">
        {#each displayedLinesMobile as line}
          <p>{@html line}</p>
        {/each}
      </code>
      <p class="mb-[110px]">
        <span class="blinking-cursor inline-block w-2.5 h-5 bg-white"></span>
      </p>
    </div>
    {#if showButton}
      <button
        class="btn inline-flex! items-center space-x-5 w-full lg:w-1/2 shrink-0"
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
{/if}
<div class:hidden={!showContent}>
  {@render children()}
</div>
