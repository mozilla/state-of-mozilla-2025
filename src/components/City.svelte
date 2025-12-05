<script>
  import Svg from "./Svg.svelte";

  let open = $state(null);

  function toggle(i) {
    open = i;
  }

  function close() {
    open = null;
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
            <div class="aspect-square w-full border">
              <img src="/img/rebel1.jpg" alt="Rebel 1" />
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
