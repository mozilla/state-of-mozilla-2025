<script>
  import { onMount } from "svelte";

  const { current } = $props();

  let progressWatcher = $state(null);

  onMount(() => {
    // Initialize or get existing progress object from sessionStorage
    const PROGRESS_KEY = "progress";
    const INITIAL_PROGRESS = {
      stakes: false,
      code: false,
      tools: false,
      rebels: false,
      ledger: false,
      pledge: false,
    };

    let progress = sessionStorage.getItem(PROGRESS_KEY);

    if (!progress) {
      // Initialize if doesn't exist
      progress = INITIAL_PROGRESS;
      sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } else {
      // Parse existing progress
      progress = JSON.parse(progress);
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Mark current page as viewed
            progress[current] = true;
            sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

            // Disconnect observer since we only need this to happen once
            observer.disconnect();
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

<div bind:this={progressWatcher} class="h-px"></div>
