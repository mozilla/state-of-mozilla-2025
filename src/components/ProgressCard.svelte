<script>
  import { onMount } from "svelte";
  import { progressStore } from "../stores/progressStore.js";
  import Svg from "./Svg.svelte";

  const { full } = $props();

  let cardHeight = $state(0);
  let name = $state("");
  let loaded = $state(false);
  let webcamButton = $state(null);
  const progress = $derived($progressStore);

  onMount(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      name = savedName;
    }
    loaded = true;
  });

  // Save name to localStorage whenever it changes (only after loaded)
  $effect(() => {
    if (loaded && name !== null) {
      localStorage.setItem("userName", name);
    }
  });

  async function activateWebcam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      // Create temporary video element to capture frame
      const video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.style.position = "absolute";
      video.style.left = "-9999px";
      video.style.opacity = "0";

      // Temporarily add to DOM for Chrome compatibility
      document.body.appendChild(video);

      // Wait for loadedmetadata, then play explicitly
      await new Promise((resolve) => {
        video.addEventListener("loadedmetadata", resolve);
      });

      // Explicitly start playing
      await video.play();

      // Wait for camera to warm up and produce actual frames
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Create canvas to capture the frame
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      // Apply CSS styling for object-fit: cover behavior
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.objectFit = "cover";

      // Draw full video frame to canvas
      ctx.drawImage(video, 0, 0);

      // Apply cyberpunk glitch effect
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      var width = canvas.width;
      var height = canvas.height;

      // Step 1: Pixelate the image
      var pixelSize = 8; // Size of each "pixel" block
      for (var y = 0; y < height; y += pixelSize) {
        for (var x = 0; x < width; x += pixelSize) {
          // Sample center pixel of block
          var centerX = Math.min(x + Math.floor(pixelSize / 2), width - 1);
          var centerY = Math.min(y + Math.floor(pixelSize / 2), height - 1);
          var centerIdx = (centerY * width + centerX) * 4;

          var r = data[centerIdx];
          var g = data[centerIdx + 1];
          var b = data[centerIdx + 2];

          // Fill entire block with sampled color
          for (var dy = 0; dy < pixelSize && y + dy < height; dy++) {
            for (var dx = 0; dx < pixelSize && x + dx < width; dx++) {
              var idx = ((y + dy) * width + (x + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
            }
          }
        }
      }

      // Step 2: Convert to black and white with contrast boost and dithering
      // First pass: convert to grayscale
      for (var i = 0; i < data.length; i += 4) {
        var gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;

        // Boost contrast
        gray = (gray - 128) * 1.5 + 128;
        gray = Math.max(0, Math.min(255, gray));

        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }

      // Second pass: Floyd-Steinberg dithering
      for (var y = 0; y < height - 1; y++) {
        for (var x = 1; x < width - 1; x++) {
          var idx = (y * width + x) * 4;
          var oldPixel = data[idx];

          // Quantize to pure black or white
          var newPixel = oldPixel < 128 ? 0 : 255;
          data[idx] = newPixel;
          data[idx + 1] = newPixel;
          data[idx + 2] = newPixel;

          // Calculate error
          var error = oldPixel - newPixel;

          // Distribute error to neighboring pixels
          // Right pixel (x+1, y)
          var rightIdx = (y * width + (x + 1)) * 4;
          data[rightIdx] += (error * 7) / 16;

          // Bottom-left pixel (x-1, y+1)
          var bottomLeftIdx = ((y + 1) * width + (x - 1)) * 4;
          data[bottomLeftIdx] += (error * 3) / 16;

          // Bottom pixel (x, y+1)
          var bottomIdx = ((y + 1) * width + x) * 4;
          data[bottomIdx] += (error * 5) / 16;

          // Bottom-right pixel (x+1, y+1)
          var bottomRightIdx = ((y + 1) * width + (x + 1)) * 4;
          data[bottomRightIdx] += (error * 1) / 16;
        }
      }

      // Step 3: Add random glitch lines
      var glitchLines = 5 + Math.floor(Math.random() * 10);
      for (var i = 0; i < glitchLines; i++) {
        var glitchY = Math.floor(Math.random() * height);
        var glitchHeight = 2 + Math.floor(Math.random() * 8);
        var offset = Math.floor(Math.random() * 30) - 15; // Random horizontal shift

        for (
          var y = glitchY;
          y < Math.min(glitchY + glitchHeight, height);
          y++
        ) {
          for (var x = 0; x < width; x++) {
            var sourceX = Math.max(0, Math.min(width - 1, x - offset));
            var sourceIdx = (y * width + sourceX) * 4;
            var targetIdx = (y * width + x) * 4;

            // Shift with color channel separation
            data[targetIdx] = data[sourceIdx]; // R channel normal
            data[targetIdx + 1] = data[sourceIdx + 1]; // G channel normal
            data[targetIdx + 2] =
              data[Math.min(sourceIdx + 8, data.length - 2)]; // B channel shifted
          }
        }
      }

      // Step 4: Add random RGB channel separation in some blocks
      var glitchBlocks = 3;
      for (var i = 0; i < glitchBlocks; i++) {
        var blockX = Math.floor(Math.random() * (width - 50));
        var blockY = Math.floor(Math.random() * (height - 50));
        var blockW = 30 + Math.floor(Math.random() * 50);
        var blockH = 20 + Math.floor(Math.random() * 40);

        for (var y = blockY; y < Math.min(blockY + blockH, height); y++) {
          for (var x = blockX; x < Math.min(blockX + blockW, width); x++) {
            var idx = (y * width + x) * 4;
            // Swap or shift color channels randomly
            var temp = data[idx];
            data[idx] = data[idx + 2]; // Swap R and B
            data[idx + 2] = temp;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Stop all video tracks to disable camera
      stream.getTracks().forEach((track) => track.stop());

      // Remove temporary video from DOM
      document.body.removeChild(video);

      // Replace image with canvas
      webcamButton.parentNode.replaceChild(canvas, webcamButton);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  }
</script>

<div
  bind:clientHeight={cardHeight}
  style={full ? "" : `margin-top: -${cardHeight}px`}
  class={full
    ? "relative lg:pb-5"
    : "pointer-events-none sticky z-30 bottom-0 p-2.5 lg:p-5"}
>
  <div
    class="grid gap-2.5 lg:gap-5 {full ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}"
  >
    <div class="pointer-events-auto">
      <div class="bg-white border border-black p-2.5">
        <div class="grid grid-cols-3 gap-2.5">
          <div class="aspect-square w-full border-t border-x flex">
            <button
              bind:this={webcamButton}
              onclick={() => activateWebcam()}
              aria-label="Activate Webcam"
              class="flex-1 bg-black flex justify-center items-center"
            >
              <svg
                width="45"
                height="29"
                viewBox="0 0 45 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28.3592" height="28.3592" fill="white" />
                <path
                  d="M28.3594 14.1796L40.291 1.89975L40.291 26.4595L28.3594 14.1796Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div class="col-span-2 space-y-5">
            <input
              bind:value={name}
              type="text"
              placeholder={loaded ? "Your nickname" : ""}
              class="w-full border-b border-dashed py-2.5 uppercase placeholder:text-black focus:outline-0 focus:border-solid"
            />
            <p>MOZILLA REPORT 2025</p>
          </div>
        </div>
        <div class="grid grid-cols-6 gap-px">
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">I</span>
            {#if progress.stakes}
              <div class="animate-blink-1 w-full h-full">
                <Svg src="/svg/journey1.svg" class="max-w-full max-h-full" />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">II</span>
            {#if progress.code}
              <div class="animate-blink-2 w-full h-full">
                <Svg src="/svg/journey2.svg" class="max-w-full max-h-full" />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">III</span>
            {#if progress.ledger}
              <div class="animate-blink-3 w-full h-full">
                <Svg src="/svg/journey3.svg" class="max-w-full max-h-full" />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">IV</span>
            {#if progress.tools}
              <div class="animate-blink-4 w-full h-full">
                <Svg src="/svg/journey4.svg" class="max-w-full max-h-full" />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">V</span>
            {#if progress.rebels}
              <div class="animate-blink-5 w-full h-full">
                <Svg src="/svg/journey5.svg" class="max-w-full max-h-full" />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1 outline outline-black">
            <span class="absolute top-0 left-0 bg-black text-white">F</span>
            {#if progress.joinus}
              <div class="animate-blink-6 w-full h-full">
                <Svg src="/svg/journey6.svg" class="max-w-full max-h-full" />
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    {#if full}
      <div class="pointer-events-auto space-y-2.5 lg:space-y-5">
        <button
          onclick={() => progressStore.reset()}
          class="btn inline-flex! px-2.5! items-center space-x-2.5 w-full invert"
        >
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.25156 17C6.18242 16.4164 6.13056 16.0881 6.11327 15.7599C6.09598 15.4681 6.0787 15.1763 6.06141 14.7933C3.48583 14.538 1.51523 13.2614 0.512653 10.7994C-0.230637 8.93921 -0.230637 6.95137 0.944799 5C1.35966 5.38298 1.70539 5.71124 2.01654 6.00303C0.771958 9.68693 2.60426 12.9331 5.99228 12.8784C6.04414 12.2766 6.09598 11.6565 6.16513 11.0365C7.09856 11.6201 8.32585 12.8967 9 14.0091C8.274 15.0851 7.306 15.9058 6.25156 17Z"
              fill="white"
            />
            <path
              d="M11.9137 12C11.562 11.5448 11.2806 11.1442 10.9816 10.7435C11.7554 8.99545 11.7203 7.30197 10.5772 5.8088C9.69788 4.66161 8.62512 3.76934 6.97204 3.95144C6.91928 4.60697 6.86653 5.24431 6.81377 5.95448C5.86413 4.95296 4.96723 4.00607 4 2.98634C4.7562 1.9302 5.74102 1.01973 6.83135 0C6.86652 0.728376 6.90169 1.31107 6.93686 1.93019C7.95685 2.31259 9.012 2.62215 9.97923 3.11381C13.1799 4.75265 13.8482 9.4871 11.9313 12"
              fill="white"
            />
          </svg>
          <span>Restart</span>
        </button>
        <div class="flex justify-center">
          <Svg src="/svg/join-us.svg" />
        </div>
      </div>
    {/if}
  </div>
</div>
