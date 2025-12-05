<script>
  import Svg from "./Svg.svelte";
  import { onMount } from "svelte";

  let open = $state(null);
  let ditherStep = $state(0); // 0 = heavy, 1 = medium, 2 = light, 3 = none
  let processedImages = $state([]); // Array to hold all 4 processed versions

  function toggle(i) {
    open = i;
  }

  function close() {
    open = null;
  }

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
    img.src = "/img/rebel1.jpg";

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
  });

  let animationInterval = null;

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

<section class="px-2.5 lg:px-5 bg-yellow">
  <div class="grid lg:grid-cols-4 gap-2.5 lg:gap-5">
    <div class="lg:col-span-2 lg:col-start-2">
      <div class="relative">
        <p
          class="uppercase absolute top-2.5 lg:top-5 left-2.5 lg:left-5 pr-5 lg:w-3/4 max-lg:text-sm"
        >
          This is not our fight alone. The movement for a human-first internet
          is a coalition of the willing.
        </p>
        <Svg src="/svg/city.svg" class="w-full h-full" />
        <button
          onclick={() => toggle(1)}
          class="absolute top-[18%] left-[25%] bg-red flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          1
        </button>
        <button
          onclick={() => toggle(2)}
          class="absolute top-[24%] left-[87%] bg-red flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          2
        </button>
        <button
          onclick={() => toggle(3)}
          class="absolute top-[40%] left-[72%] bg-red flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          3
        </button>
        <button
          onclick={() => toggle(4)}
          class="absolute top-[51%] left-[37%] bg-red flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          4
        </button>
        <button
          onclick={() => toggle(5)}
          class="absolute top-[75%] left-[4%] bg-red flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          5
        </button>
        <button
          onclick={() => toggle(6)}
          class="absolute top-[74%] left-[44%] bg-red flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          6
        </button>
      </div>
    </div>
  </div>
</section>

<section class="px-2.5 lg:px-5 bg-black">
  <div class="grid lg:grid-cols-4 gap-2.5 lg:gap-5">
    <div class="lg:col-span-2 lg:col-start-2">
      <p class="uppercase text-yellow py-2.5">SPOT THE REBELS in the city:</p>
    </div>
  </div>
</section>

<section class="p-2.5 lg:p-5 my-10 lg:my-20">
  <div class="grid lg:grid-cols-4 gap-2.5 lg:gap-5">
    <div class="lg:col-span-2 lg:col-start-2 space-y-2.5 lg:space-y-5">
      <div class="flex">
        <div class="w-10">
          <div class="border w-5 h-5 flex justify-center items-center"></div>
        </div>
        <div>
          <p class="uppercase">1. <span class="underline">Mark Surman</span></p>
          <p>President, Mozilla</p>
        </div>
      </div>
      <div class="flex">
        <div class="w-10">
          <div class="border w-5 h-5 flex justify-center items-center"></div>
        </div>
        <div>
          <p class="uppercase">
            2. <span class="underline">Laura Chambers</span>
          </p>
          <p>Interim CEO, Mozilla Corporation</p>
        </div>
      </div>
      <div class="flex">
        <div class="w-10">
          <div class="border w-5 h-5 flex justify-center items-center"></div>
        </div>
        <div>
          <p class="uppercase">
            3. <span class="underline">Mohamed Nanabhay</span>
          </p>
          <p>Managing Partner, Mozilla Ventures</p>
        </div>
      </div>
      <div class="flex">
        <div class="w-10">
          <div class="border w-5 h-5 flex justify-center items-center"></div>
        </div>
        <div>
          <p class="uppercase">
            4. <span class="underline">John Dickerson</span>
          </p>
          <p>CEO, Mozilla.ai</p>
        </div>
      </div>
      <div class="flex">
        <div class="w-10">
          <div class="border w-5 h-5 flex justify-center items-center"></div>
        </div>
        <div>
          <p class="uppercase">5. <span class="underline">Ryan Sipes</span></p>
          <p>Managing Director, Product Mozilla</p>
        </div>
      </div>
      <div class="flex">
        <div class="w-10">
          <div class="border w-5 h-5 flex justify-center items-center"></div>
        </div>
        <div>
          <p class="uppercase">6. <span class="underline">Nabiha Syed</span></p>
          <p>Executive Director, Mozilla Foundation</p>
        </div>
      </div>
    </div>
  </div>
</section>

{#if open == 1}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    onclick={close}
    class="fixed z-40 w-full h-full inset-0 flex justify-center items-center overscroll-contain bg-white/90 backdrop-blur p-2.5"
  >
    <div
      onclick={(e) => {
        e.stopPropagation();
      }}
      class="w-full lg:w-2/3 rounded-4xl bg-white overflow-x-hidden overflow-y-auto overscroll-none h-[calc(100svh-(var(--header-height)*2)-84px)]"
      style="box-shadow: 8.3871px 8.3871px 0px rgba(0, 0, 0, 0.25);"
    >
      <div
        class="bg-red py-2.5 px-5 flex justify-between items-center space-x-2.5"
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
              fill="black"
            />
          </svg>
          <span>1.</span>
        </div>
        <p class="uppercase">Mark Surman</p>
        <button
          onclick={close}
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
              stroke="black"
            />
            <line
              x1="0.724647"
              y1="0.516198"
              x2="18.4023"
              y2="18.1939"
              stroke="black"
            />
          </svg>
        </button>
      </div>
      <div class="bg-white p-5 space-y-5">
        <div class="grid lg:grid-cols-2 gap-2.5 lg:gap-5">
          <div>
            <div
              class="aspect-square w-full border"
              onmouseenter={handleMouseEnter}
              onmouseleave={handleMouseLeave}
            >
              {#if processedImages.length > 0}
                <img
                  src={processedImages[ditherStep]}
                  alt="Rebel 1"
                  class="w-full h-full object-cover"
                />
              {:else}
                <img
                  src="/img/rebel1.jpg"
                  alt="Rebel 1"
                  class="w-full h-full object-cover"
                />
              {/if}
            </div>
          </div>
          <div>
            <p class="uppercase">Mark Surman</p>
            <p>President, Mozilla</p>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-2.5 lg:gap-5">
          <div class="lg:col-start-2 space-y-2.5 lg:space-y-5">
            <p>
              Before Mozilla Ventures, Mohamed was the Deputy CEO of the Media
              Development Investment Fund (MDIF), which invests in independent
              media around the world providing the news, information and debate
              that people need to build free, thriving societies. He continues
              to serve on the Investment Committee of MDIF.
            </p>
            <p>
              Mohamed spent nearly a decade at Al Jazeera, where he started the
              New Media department which focused on innovation and product
              development across internet, mobile, and social technologies. He
              then served as the Head of Online at Al Jazeera English where he
              led the team that produced the award-winning coverage of the Arab
              revolutions in 2011.
            </p>
            <p>
              In 2005 Mohamed founded QatarLiving.com (acquired in 2012), a
              listings and community website that quickly grew to be the largest
              site in Qatar. He also co-founded Signalnoi.se, a social analytics
              platform for newsrooms that won the Knight News Challenge.
            </p>
            <p>
              Mohamed previously served as a board member of the Mozilla
              Foundation, Media Development Investment, as the Board Chair of
              Global Voices Online, the Advisory Board of Creative Commons, and
              was a member of the World Economic Forum’s Global Agenda Council
              on Social Media.
            </p>
            <p>
              He received his undergraduate degree in Computer Science at the
              University of the Witwatersrand and a master’s degree in
              International Relations from the University of Cambridge.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
