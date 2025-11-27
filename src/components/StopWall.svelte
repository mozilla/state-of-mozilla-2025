<script>
  import { onMount } from "svelte";
  import { progressStore } from "../stores/progressStore.js";

  let showStopWall = $state(true);
  let showBypass = $state(false);
  let bypassLines = $state([]);
  let progress = $state({});

  const terminalLines = [
    "// EXECUTING BYPASS PROTOCOL",
    "> sudo access --override",
    "[ OK ] Authentication override enabled",
    "> grant access --force",
    "[ ACCESS GRANTED ]",
  ];

  onMount(() => {
    // Subscribe to progress store
    const unsubscribe = progressStore.subscribe((value) => {
      progress = value;
    });

    // Check if all chapters except Join Us are complete
    const isProgressComplete =
      progress.stakes === true &&
      progress.code === true &&
      progress.tools === true &&
      progress.rebels === true &&
      progress.ledger === true;

    // Hide stopwall if progress is complete OR sessionStorage bypass is set
    if (isProgressComplete || sessionStorage.getItem("stopwallVerified")) {
      showStopWall = false;
      // Mark Join Us as viewed when accessing this page with complete progress
      progressStore.markAsViewed("joinus");
    }

    return () => {
      unsubscribe();
    };
  });

  function executeBypass() {
    showBypass = true;
    let currentIndex = 0;

    function addLine() {
      const randomDelay = Math.random() * 200 + 100;

      if (currentIndex < terminalLines.length) {
        bypassLines = [...bypassLines, terminalLines[currentIndex]];
        currentIndex++;
        setTimeout(addLine, randomDelay);
      } else {
        setTimeout(() => {
          showStopWall = false;
          sessionStorage.setItem("stopwallVerified", "true");
          // Mark Join Us as viewed when bypass is executed
          progressStore.markAsViewed("joinus");
        }, 1000);
      }
    }

    addLine();
  }
</script>

{#if showStopWall}
  <div
    id="stopwall"
    class="fixed z-40 w-full h-full inset-0 flex justify-center items-center overscroll-contain bg-white/90 backdrop-blur p-2.5"
  >
    <div
      class="p-2.5 lg:p-5 border-2 border-black bg-yellow lg:w-1/2 relative z-10"
      style="box-shadow: 8.3871px 8.3871px 0px rgba(0, 0, 0, 0.25);"
    >
      {#if !showBypass}
        <div class="space-y-2.5 lg:space-y-5">
          <p>
            You have to complete all the chapters in order to view this page.
          </p>
          <button onclick={executeBypass} class="btn"
            >Initiate bypass function</button
          >
        </div>
      {:else}
        <div class="bg-black text-white p-4 font-mono text-sm">
          <code class="block">
            {#each bypassLines as line}
              <p>{line}</p>
            {/each}
            <p>
              <span class="blinking-cursor inline-block w-2 h-4 bg-white"
              ></span>
            </p>
          </code>
        </div>
      {/if}
    </div>
  </div>
{/if}
