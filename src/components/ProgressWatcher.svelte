<script>
  import { onMount } from "svelte";
  import { progressStore } from "../stores/progressStore.js";
  import Svg from "./Svg.svelte";

  const { current, number, position, next, font, text } = $props();

  let progressWatcher = $state(null);
  let displayedLines = $state([]);

  const lines = [
    ":: CONGRATS! ::",
    `${position} #STAMP#`,
    "REWARD AFFIRMATIVE",
  ];

  function startAnimation() {
    let currentIndex = 0;

    function addLine() {
      const randomDelay = Math.random() * 150 + 50;

      if (currentIndex < lines.length) {
        displayedLines = [...displayedLines, lines[currentIndex]];
        currentIndex++;
        setTimeout(addLine, randomDelay);
      }
    }

    addLine();
  }

  onMount(() => {
    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only mark as viewed if captcha has been verified
            const captchaVerified = sessionStorage.getItem("captchaVerified");

            if (captchaVerified === "true") {
              // Additional checks for specific pages
              let canMarkAsViewed = true;

              if (current === "stakes") {
                const stakesSelection = localStorage.getItem("stakesSelection");
                canMarkAsViewed = stakesSelection !== null;
              } else if (current === "rebels") {
                const rebelsFound = localStorage.getItem("rebelsFound");
                canMarkAsViewed = rebelsFound !== null;
              }

              if (canMarkAsViewed) {
                // Start the animation after a delay
                setTimeout(() => {
                  startAnimation();
                }, 500);

                // Mark current page as viewed
                progressStore.markAsViewed(current);

                // Disconnect observer since we only need this to happen once
                observer.disconnect();
              }
            }
          }
        });
      },
      {
        threshold: 0,
      },
    );

    // Start observing
    if (progressWatcher) {
      observer.observe(progressWatcher);
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  });
</script>

<section bind:this={progressWatcher} class="m-0">
  <div class="bg-black text-yellow uppercase py-2.5 px-2.5 lg:px-5">
    <p>END OF:// CHAPTER_{number}</p>
  </div>
  <div
    class="bg-yellow px-2.5 pt-2.5 lg:px-5 lg:pt-5 pb-20 lg:pb-40 space-y-2.5"
  >
    <div class="grid lg:grid-cols-2 gap-2.5">
      <div>
        <p>
          {@html text}
          {@html text ? "<br />" : ""}
          {#each displayedLines as line}
            {line}
            <br />
          {/each}
          <span class="blinking-cursor inline-block w-2.5 h-5 bg-black"></span>
        </p>
      </div>
      <div>
        <a
          class="group flex flex-col gap-px bg-black text-white hover:bg-white hover:text-black outline outline-dashed outline-black divide-y divide-dashed"
          href="/{next}"
        >
          <div class="">
            <div class="p-2.5 p-5 space-y-2.5">
              <p class="uppercase">
                Go to {next == "pledge" ? "last" : "next"} chapter
              </p>
              <h3
                class="{font} text-7xl {font != 'font-mozilla-headline'
                  ? 'uppercase'
                  : 'capitalize'}"
              >
                {next}
              </h3>
            </div>
            <div class="relative overflow-hidden h-20 lg:h-40 -mt-5 lg:-mt-10">
              <Svg
                src="/svg/dots.svg"
                class="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full object-cover"
              />
            </div>
          </div>
          <div class="p-2.5">PROCEED →</div>
        </a>
      </div>
    </div>
  </div>
</section>
