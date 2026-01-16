<script>
  import { onMount } from "svelte";

  let { rebel, onClose } = $props();

  let ditherStep = $state(0); // 0 = heavy, 1 = medium, 2 = light, 3 = none
  let processedImages = $state([]); // Array to hold all 4 processed versions
  let animationInterval = null;

  function applyDithering(img, pixelSize, threshold) {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");

    // Draw the image
    ctx.drawImage(img, 0, 0);

    // Get image data
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var width = canvas.width;
    var height = canvas.height;

    // Step 1: Floyd-Steinberg dithering
    for (var y = 0; y < height - 1; y++) {
      for (var x = 1; x < width - 1; x++) {
        var idx = (y * width + x) * 4;

        // Convert to grayscale
        var gray =
          data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;

        // Quantize to pure black or white
        var newPixel = gray < 128 ? 0 : 255;
        data[idx] = newPixel;
        data[idx + 1] = newPixel;
        data[idx + 2] = newPixel;

        // Calculate error
        var error = gray - newPixel;

        // Distribute error to neighboring pixels
        var rightIdx = (y * width + (x + 1)) * 4;
        data[rightIdx] += (error * 7) / 16;
        data[rightIdx + 1] += (error * 7) / 16;
        data[rightIdx + 2] += (error * 7) / 16;

        var bottomLeftIdx = ((y + 1) * width + (x - 1)) * 4;
        data[bottomLeftIdx] += (error * 3) / 16;
        data[bottomLeftIdx + 1] += (error * 3) / 16;
        data[bottomLeftIdx + 2] += (error * 3) / 16;

        var bottomIdx = ((y + 1) * width + x) * 4;
        data[bottomIdx] += (error * 5) / 16;
        data[bottomIdx + 1] += (error * 5) / 16;
        data[bottomIdx + 2] += (error * 5) / 16;

        var bottomRightIdx = ((y + 1) * width + (x + 1)) * 4;
        data[bottomRightIdx] += (error * 1) / 16;
        data[bottomRightIdx + 1] += (error * 1) / 16;
        data[bottomRightIdx + 2] += (error * 1) / 16;
      }
    }

    // Step 2: Pixelation with threshold
    for (var y = 0; y < height; y += pixelSize) {
      for (var x = 0; x < width; x += pixelSize) {
        var blackCount = 0;
        var totalCount = 0;

        for (var dy = 0; dy < pixelSize && y + dy < height; dy++) {
          for (var dx = 0; dx < pixelSize && x + dx < width; dx++) {
            var idx = ((y + dy) * width + (x + dx)) * 4;
            if (data[idx] === 0) {
              blackCount++;
            }
            totalCount++;
          }
        }

        var blockColor = blackCount / totalCount > threshold ? 0 : 255;

        for (var dy = 0; dy < pixelSize && y + dy < height; dy++) {
          for (var dx = 0; dx < pixelSize && x + dx < width; dx++) {
            var idx = ((y + dy) * width + (x + dx)) * 4;
            data[idx] = blockColor;
            data[idx + 1] = blockColor;
            data[idx + 2] = blockColor;
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
  }

  function processRebelImage() {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = rebel.image;

    img.onload = () => {
      // Generate 4 versions with different dithering levels
      processedImages = [
        applyDithering(img, 14, 0.7), // Step 0: Heavy (large pixels)
        applyDithering(img, 8, 0.6), // Step 1: Medium
        applyDithering(img, 4, 0.5), // Step 2: Light
        img.src, // Step 3: Original (no effect)
      ];
    };
  }

  onMount(() => {
    if (typeof window !== "undefined") {
      processRebelImage();
    }

    function handleKeydown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  function handleMouseEnter() {
    // Clear any existing animation
    if (animationInterval) {
      clearInterval(animationInterval);
    }

    // Start animation through steps (forward)
    ditherStep = 1;
    animationInterval = setInterval(() => {
      ditherStep++;
      if (ditherStep >= 3) {
        clearInterval(animationInterval);
        animationInterval = null;
      }
    }, 150); // 150ms between steps
  }

  function handleMouseLeave() {
    // Clear any existing animation
    if (animationInterval) {
      clearInterval(animationInterval);
    }

    // Start animation backward through steps
    if (ditherStep > 0) {
      animationInterval = setInterval(() => {
        ditherStep--;
        if (ditherStep <= 0) {
          clearInterval(animationInterval);
          animationInterval = null;
        }
      }, 150); // 150ms between steps
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  onclick={onClose}
  class="fixed z-40 w-full h-full inset-0 flex justify-center items-center bg-white/90 backdrop-blur p-2.5"
>
  <div
    onclick={(e) => {
      e.stopPropagation();
    }}
    class="w-full lg:w-2/3 rounded-4xl bg-yellow overflow-x-hidden overflow-y-auto overscroll-none h-[calc(100svh-(var(--header-height)*2)-84px)]"
    style="box-shadow: 8.3871px 8.3871px 0px rgba(0, 0, 0, 0.25); scrollbar-width: none;"
  >
    <div
      class="sticky z-10 top-0 bg-red text-white py-2.5 px-5 flex justify-between items-center space-x-2.5"
    >
      <div class="flex items-center space-x-2.5">
        <svg
          width="25"
          height="22"
          viewBox="0 0 25 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.8295 2.6287H9.77431L8.52879 0.165706C8.47563 0.0602568 8.3693 0 8.25538 0H1.63285C1.51893 0 1.4126 0.0677889 1.35944 0.165706L0.311381 2.24456C0.106325 2.6513 0 3.10322 0 3.55515V20.0203C0 20.9091 0.729086 21.6397 1.63285 21.6397H22.8295C23.7333 21.6397 24.4624 20.9166 24.4624 20.0203V4.2481C24.4624 3.35178 23.7333 2.6287 22.8295 2.6287Z"
            fill="white"
          />
        </svg>
        <span>{rebel.id}.</span>
      </div>
      <p class="uppercase">{rebel.name}</p>
      <button
        onclick={onClose}
        class="cursor-pointer"
        aria-label="Close dialog"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.353478"
            y1="18.0312"
            x2="18.0311"
            y2="0.353543"
            stroke="white"
          />
          <line
            x1="0.724647"
            y1="0.516198"
            x2="18.4023"
            y2="18.1939"
            stroke="white"
          />
        </svg>
      </button>
    </div>
    <div class="p-5 space-y-5">
      <div class="grid grid-cols-2 gap-2.5 lg:gap-5">
        <div>
          <div
            class="aspect-square w-full border"
            onmouseenter={handleMouseEnter}
            onmouseleave={handleMouseLeave}
          >
            {#if processedImages.length > 0}
              <img
                loading="lazy"
                src={processedImages[ditherStep]}
                alt={rebel.name}
                class="w-full h-full object-cover"
              />
            {/if}
          </div>
        </div>
        <div class="relative py-5">
          <div
            class="absolute top-2.5 right-0 w-[calc(100%+2.5rem)] h-px bg-black before:absolute before:-translate-y-[calc(50%-0.5px)] before:left-0 before:w-2.5 before:h-2.5 before:rounded-full before:bg-black before:content-['']"
          ></div>
          <div class="overflow-y-auto overscroll-none lg:h-[calc(66vw/2-50px)]">
            <p class="lg:text-3xl xl:text-4xl 2xl:text-5xl uppercase">
              {rebel.name}
            </p>
            <p class="lg:text-3xl xl:text-4xl 2xl:text-5xl mb-10 lg:mb-20">
              {rebel.title}
            </p>
            {#each rebel.bio as paragraph}
              <p class="max-lg:hidden">{paragraph}</p>
            {/each}
          </div>
        </div>
      </div>
      <div>
        {#each rebel.bio as paragraph}
          <p class="lg:hidden">{paragraph}</p>
        {/each}
      </div>
    </div>
  </div>
</div>
