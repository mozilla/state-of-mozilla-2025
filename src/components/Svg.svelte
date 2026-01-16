<script>
  const { src, class: className = "" } = $props();

  let svgContent = $state("");

  async function loadSvg(svgSrc) {
    try {
      const response = await fetch(svgSrc);
      if (!response.ok) {
        throw new Error(`Failed to load SVG: ${response.statusText}`);
      }
      const text = await response.text();
      svgContent = text;
    } catch (err) {
      console.error(`Error loading ${svgSrc}:`, err);
    }
  }

  $effect(() => {
    loadSvg(src);
  });

  // Apply custom classes to the SVG element
  $effect(() => {
    if (svgContent && className) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgContent, "image/svg+xml");
      const svgElement = doc.querySelector("svg");

      if (svgElement) {
        svgElement.setAttribute("class", className);

        // Update svgContent with modified SVG
        svgContent = new XMLSerializer().serializeToString(svgElement);
      }
    }
  });
</script>

{#if svgContent}
  {@html svgContent}
{/if}
