<script>
  import { onMount } from "svelte";
  import { progressStore } from "../stores/progressStore.js";

  const { current } = $props();

  let progressWatcher = $state(null);

  onMount(() => {
    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Mark current page as viewed
            progressStore.markAsViewed(current);

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
