<script>
  import { onMount } from "svelte";
  import { progressStore } from "../stores/progressStore.js";
  import Svg from "./Svg.svelte";
  import html2canvas from "html2canvas";

  const { full } = $props();

  let card = $state(null);
  let cardHeight = $state(0);
  let name = $state("");
  let loaded = $state(false);
  let webcamButton = $state(null);
  let hasWebcamImage = $state(false);
  let shareWrapper = $state(null);
  let isSharing = $state(false);
  let isStickyDismissed = $state(true);
  const progress = $derived($progressStore);

  $effect(() => {
    document.documentElement.style.setProperty(
      "--card-height",
      `${cardHeight}px`,
    );
  });

  onMount(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      name = savedName;
    }

    // Check if there's a saved webcam image
    const savedImage = localStorage.getItem("webcamImage");
    if (savedImage) {
      hasWebcamImage = true;

      const canvas = document.createElement("canvas");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.objectFit = "cover";
        canvas.style.cursor = "pointer";
        canvas.onclick = removeWebcamImage;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        if (webcamButton) {
          webcamButton.parentNode.replaceChild(canvas, webcamButton);
        }
      };

      img.src = savedImage;
    }

    // Check if sticky was dismissed
    const stickyDismissed = sessionStorage.getItem("stickyDismissed");
    if (stickyDismissed === "true") {
      isStickyDismissed = true;
    }
    if (stickyDismissed === "false") {
      isStickyDismissed = false;
    }

    loaded = true;
  });

  // Save name to localStorage whenever it changes (only after loaded)
  $effect(() => {
    if (loaded && name !== null) {
      const trimmedName = name.slice(0, 24);
      localStorage.setItem("userName", trimmedName);
      // Update name if it was trimmed
      if (name !== trimmedName) {
        name = trimmedName;
      }
    }
  });

  function removeWebcamImage(event) {
    localStorage.removeItem("webcamImage");
    hasWebcamImage = false;

    // Remove the canvas element that was clicked
    const canvas = event.currentTarget;
    canvas.remove();
  }

  async function share() {
    if (!card || !shareWrapper || isSharing) return;

    isSharing = true;

    try {
      // Generate anonymous name if no name is provided
      const displayName =
        name.trim() || `anon-${Math.floor(1000 + Math.random() * 9000)}`;

      // Clone the card and prepend to shareWrapper
      const clonedCard = card.cloneNode(true);

      // Update the name input field in the cloned card
      const nameInput = clonedCard.querySelector('input[type="text"]');
      if (nameInput) {
        nameInput.value = displayName;
      }

      // Copy canvas elements (webcam image) manually, or add fallback SVG if no image
      const originalCanvases = card.querySelectorAll("canvas");
      const clonedCanvases = clonedCard.querySelectorAll("canvas");

      if (originalCanvases.length > 0) {
        // Copy webcam image canvas
        originalCanvases.forEach((originalCanvas, index) => {
          if (clonedCanvases[index]) {
            const clonedCanvas = clonedCanvases[index];
            const ctx = clonedCanvas.getContext("2d");
            clonedCanvas.width = originalCanvas.width;
            clonedCanvas.height = originalCanvas.height;
            ctx.drawImage(originalCanvas, 0, 0);
          }
        });
      } else if (!hasWebcamImage) {
        // No webcam image - swap the button SVGs: hide camera icon, show intro1.svg
        const webcamButton = clonedCard.querySelector(
          ".grid.grid-cols-3 .aspect-square button",
        );
        if (webcamButton) {
          // Get references to both SVGs before modifying classes
          const cameraSvg = webcamButton.querySelector("svg:not(.hidden)");
          const intro1Svg = webcamButton.querySelector("svg.hidden");

          // Hide the default camera SVG
          if (cameraSvg) {
            cameraSvg.classList.add("hidden");
          }

          // Show the intro1.svg
          if (intro1Svg) {
            intro1Svg.classList.remove("hidden");
          }
        }
      }

      // Remove animate-blink-* classes from cloned card
      const animatedElements = clonedCard.querySelectorAll(
        '[class*="animate-blink-"]',
      );
      animatedElements.forEach((element) => {
        element.className = element.className
          .replace(/animate-blink-\d+/g, "")
          .trim();
      });

      shareWrapper.insertBefore(clonedCard, shareWrapper.firstChild);

      // Ensure fonts are loaded before capturing
      await document.fonts.ready;

      // Wait a brief moment for the DOM to settle and SVGs to render
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Generate canvas from the shareWrapper element
      const canvas = await html2canvas(shareWrapper, {
        backgroundColor: "#ffffff",
        scale: window.devicePixelRatio || 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        imageTimeout: 0,
        removeContainer: true,
        onclone: (clonedDoc) => {
          // Ensure journey SVGs are visible in cloned document
          const journeySvgs = clonedDoc.querySelectorAll(
            '[class*="animate-blink-"] svg, .grid.grid-cols-6 svg',
          );
          journeySvgs.forEach((svg) => {
            svg.style.display = "block";
          });

          // Fix text vertical shift by adjusting position
          const textElements = clonedDoc.querySelectorAll("span");
          textElements.forEach((el) => {
            // Force specific properties to fix baseline
            el.style.position = "relative";
            el.style.top = "-0.45em"; // Shift text up slightly
            el.style.display = "block";
          });
        },
      });

      // Remove cloned card
      shareWrapper.removeChild(clonedCard);

      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        const file = new File([blob], "mozilla-report-2025.png", {
          type: "image/png",
        });

        // Try to use native Web Share API
        if (
          navigator.share &&
          navigator.canShare &&
          navigator.canShare({ files: [file] })
        ) {
          try {
            await navigator.share({
              files: [file],
              title: "Mozilla Report 2025",
              text: "Check out my progress on Mozilla Report 2025",
              url: "https://stateof.mozilla.org/",
            });
          } catch (err) {
            // User cancelled share or share failed
            if (err.name !== "AbortError") {
              console.error("Share failed:", err);
              downloadImage(canvas);
            }
          }
        } else {
          // Fallback to download
          downloadImage(canvas);
        }

        isSharing = false;
      }, "image/png");
    } catch (error) {
      console.error("Error generating card image:", error);
      // Cleanup in case of error
      if (shareWrapper) {
        const clonedCard = shareWrapper.firstChild;
        if (
          clonedCard &&
          clonedCard !== shareWrapper.querySelector("div:last-child")
        ) {
          shareWrapper.removeChild(clonedCard);
        }
      }
      isSharing = false;
    }
  }

  function downloadImage(canvas) {
    const link = document.createElement("a");
    link.download = "mozilla-report-2025.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function activateWebcam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
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
      canvas.style.cursor = "pointer";
      canvas.onclick = removeWebcamImage;

      // Draw full video frame to canvas
      ctx.drawImage(video, 0, 0);

      // Apply effects: dithering + pixelation
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      var width = canvas.width;
      var height = canvas.height;

      // Step 1: Floyd-Steinberg dithering to convert to pure black and white
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

          // Distribute error to neighboring pixels (all 3 color channels)
          // Right pixel (x+1, y)
          var rightIdx = (y * width + (x + 1)) * 4;
          data[rightIdx] += (error * 7) / 16;
          data[rightIdx + 1] += (error * 7) / 16;
          data[rightIdx + 2] += (error * 7) / 16;

          // Bottom-left pixel (x-1, y+1)
          var bottomLeftIdx = ((y + 1) * width + (x - 1)) * 4;
          data[bottomLeftIdx] += (error * 3) / 16;
          data[bottomLeftIdx + 1] += (error * 3) / 16;
          data[bottomLeftIdx + 2] += (error * 3) / 16;

          // Bottom pixel (x, y+1)
          var bottomIdx = ((y + 1) * width + x) * 4;
          data[bottomIdx] += (error * 5) / 16;
          data[bottomIdx + 1] += (error * 5) / 16;
          data[bottomIdx + 2] += (error * 5) / 16;

          // Bottom-right pixel (x+1, y+1)
          var bottomRightIdx = ((y + 1) * width + (x + 1)) * 4;
          data[bottomRightIdx] += (error * 1) / 16;
          data[bottomRightIdx + 1] += (error * 1) / 16;
          data[bottomRightIdx + 2] += (error * 1) / 16;
        }
      }

      // Step 2: Pixelation with threshold logic
      var pixelSize = 14;
      var threshold = 0.7; // 50% threshold - adjust between 0 and 1

      for (var y = 0; y < height; y += pixelSize) {
        for (var x = 0; x < width; x += pixelSize) {
          // Count black and white pixels in this block
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

          // Decide block color based on threshold
          var blockColor = blackCount / totalCount > threshold ? 0 : 255;

          // Fill entire block with decided color
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

      // Save canvas image to localStorage as base64
      const imageDataUrl = canvas.toDataURL("image/png");
      localStorage.setItem("webcamImage", imageDataUrl);
      hasWebcamImage = true;

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
    ? "relative"
    : `pointer-events-none ${!isStickyDismissed ? "sticky" : ""} z-30 bottom-0 p-2.5 lg:p-5`}
>
  <div
    class="grid gap-2.5 lg:gap-5 {full ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}"
  >
    <div class="pointer-events-auto {full ? 'lg:pb-5' : ''}">
      <div
        bind:this={card}
        class="relative bg-white border border-black p-2.5"
        style="clip-path: polygon(calc(100% - 1.25rem) 0%, 100% 1.25rem, 100% calc(100% - 1.25rem), calc(100% - 1.25rem) 100%, 1.25rem 100%, 0% calc(100% - 1.25rem), 0 0);"
      >
        <div
          class="absolute top-0 right-0"
          style="border-top: calc(1.25rem - 1px) solid black; border-left: calc(1.25rem - 1px) solid transparent;"
        ></div>
        <div
          class="absolute bottom-0 right-0"
          style="border-bottom: calc(1.25rem - 1px) solid black; border-left: calc(1.25rem - 1px) solid transparent;"
        ></div>
        <div
          class="absolute bottom-0 left-0"
          style="border-bottom: calc(1.25rem - 1px) solid black; border-right: calc(1.25rem - 1px) solid transparent;"
        ></div>
        {#if !full}
          <button
            onclick={() => {
              isStickyDismissed = !isStickyDismissed;
              sessionStorage.setItem(
                "stickyDismissed",
                isStickyDismissed.toString(),
              );
            }}
            class="absolute top-4 right-4 flex justify-center items-center aspect-square w-5 cursor-pointer"
            aria-label={isStickyDismissed ? "Expand" : "Close"}
          >
            {#if isStickyDismissed}
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.353553"
                  y1="11.6464"
                  x2="10.3536"
                  y2="1.64645"
                  stroke="black"
                />
                <line
                  x1="9.64645"
                  y1="1.64645"
                  x2="19.6464"
                  y2="11.6464"
                  stroke="black"
                />
              </svg>
            {:else}
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1.0684"
                  y1="0.3536"
                  x2="19.0684"
                  y2="18.3536"
                  stroke="black"
                />
                <line
                  x1="0.353478"
                  y1="18.3536"
                  x2="18.3535"
                  y2="0.3536"
                  stroke="black"
                />
              </svg>
            {/if}
          </button>
        {/if}
        <div class="grid grid-cols-3 gap-2.5">
          <div class="aspect-square w-full border-t border-x flex">
            {#if loaded && !hasWebcamImage}
              <button
                bind:this={webcamButton}
                onclick={() => activateWebcam()}
                aria-label="Activate Webcam"
                class="flex-1 bg-black flex justify-center items-center cursor-pointer"
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
                <Svg
                  src="/svg/intro1.svg"
                  class="hidden invert w-full h-full"
                />
              </button>
            {:else}
              <div bind:this={webcamButton} class="flex-1"></div>
            {/if}
          </div>
          <div class="col-span-2 space-y-5">
            <input
              bind:value={name}
              type="text"
              maxlength="24"
              placeholder={loaded ? "Your nickname" : ""}
              class="w-3/4 border-b border-dashed leading-loose placeholder:text-gray focus:outline-0 focus:border-solid {full
                ? 'lg:text-2xl lg:leading-none'
                : ''}"
            />
            <p class={full ? "lg:text-2xl" : ""}>MOZILLA REPORT 2025</p>
          </div>
        </div>
        <div class="grid grid-cols-6 gap-px border divide-x">
          <div class="relative aspect-square p-1">
            <div class="absolute top-0 left-0 bg-black text-white">
              <span>I</span>
            </div>
            {#if progress.stakes}
              <div class="animate-blink-1 w-full h-full">
                <Svg
                  src="/svg/journey1.svg"
                  class="max-w-full max-h-full text-blue"
                />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1">
            <div class="absolute top-0 left-0 bg-black text-white">
              <span>II</span>
            </div>
            {#if progress.manifesto}
              <div class="animate-blink-2 w-full h-full">
                <Svg
                  src="/svg/journey2.svg"
                  class="max-w-full max-h-full text-blue"
                />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1">
            <div class="absolute top-0 left-0 bg-black text-white">
              <span>III</span>
            </div>
            {#if progress.tools}
              <div class="animate-blink-3 w-full h-full">
                <Svg
                  src="/svg/journey3.svg"
                  class="max-w-full max-h-full text-blue"
                />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1">
            <div class="absolute top-0 left-0 bg-black text-white">
              <span>IV</span>
            </div>
            {#if progress.ledger}
              <div class="animate-blink-4 w-full h-full">
                <Svg
                  src="/svg/journey4.svg"
                  class="max-w-full max-h-full text-blue"
                />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1">
            <div class="absolute top-0 left-0 bg-black text-white">
              <span>V</span>
            </div>
            {#if progress.rebels}
              <div class="animate-blink-5 w-full h-full">
                <Svg
                  src="/svg/journey5.svg"
                  class="max-w-full max-h-full text-blue"
                />
              </div>
            {/if}
          </div>
          <div class="relative aspect-square p-1">
            <div class="absolute top-0 left-0 bg-black text-white">
              <span>F</span>
            </div>
            {#if progress.roadmap}
              <div class="animate-blink-6 w-full h-full">
                <Svg
                  src="/svg/journey6.svg"
                  class="max-w-full max-h-full text-blue"
                />
              </div>
            {/if}
          </div>
        </div>
        <div class="flex justify-between mt-2.5">
          <p class={full ? "text-2xl lg:text-4xl" : "text-lg lg:text-2xl"}>
            MZLFEST-REBEL
          </p>
          <p class={full ? "text-2xl lg:text-4xl" : "text-lg lg:text-2xl"}>
            LOREM IPSUM
          </p>
        </div>
      </div>
    </div>
    {#if full}
      <div class="pointer-events-auto flex flex-col space-y-2.5 lg:space-y-5">
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
        <button
          onclick={share}
          class="btn inline-flex! px-2.5! items-center space-x-2.5 w-full invert"
        >
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.98133 -4.12683e-05C6.98424 1.46358 7.93485 2.8505 8.95898 4.34399L7.48001 4.34399L7.48001 8.66663L4.52018 8.66663L4.52018 4.35542L3.00065 4.35542C4.02744 2.85566 4.97084 1.47685 5.98133 -4.12683e-05Z"
              fill="white"
            />
            <path
              d="M3 6.99988H1V12.9999H11V6.99988H8.5"
              stroke="white"
              stroke-width="2"
            />
          </svg>
          <span>{isSharing ? "Sharing..." : "Share your results"}</span>
        </button>
      </div>
    {/if}
  </div>
</div>

<div
  bind:this={shareWrapper}
  class="fixed -left-[9999px] top-0 w-[600px] aspect-[4/5] flex flex-col p-5 bg-black"
>
  <div class="mt-auto">
    <Svg src="/svg/footer2.svg" class="w-full" />
    <p class="text-white">
      CHECK OUT THE 2025 REPORT AND BECOME AN INTERNET REBEL
    </p>
    <p class="text-white">Find the report at stateof.mozilla.org</p>
  </div>
</div>
