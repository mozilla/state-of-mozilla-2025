<script>
  let open = $state(false);

  function toggleMenu() {
    open = !open;
  }
</script>

<header
  class="sticky z-50 top-0 left-0 right-0 w-full border-y border-white bg-black text-white divide-y divide-white {open
    ? 'max-lg:h-svh max-lg:overflow-y-auto max-lg:overscroll-y-contain'
    : ''}"
>
  <div class="flex items-center">
    <a
      href="https://www.mozilla.org"
      class="size-10 p-2.5 border-r border-white flex justify-center items-center"
      title="State of Mozilla 2025"
    >
      <svg
        width="24"
        height="27"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 26.6957H3.47622V0H0V26.6957Z" fill="white"></path>
        <path
          d="M6.31085 13.617H20.0757V12.8497L11.1052 9.65442V6.95164L20.0757 3.75641V2.97764H9.44876V6.05835H6.31085V2.97764H9.44876V0H23.2136V5.43992L15.9113 7.91365V8.68096L23.2136 11.1547V16.5946H6.31085V13.617Z"
          fill="white"
        ></path>
      </svg>
    </a>
    <span class="font-mozilla-text flex-1 px-2.5 text-center">
      State of Mozilla 2025
    </span>
    <div
      class="size-10 p-2.5 border-l border-white flex justify-center items-center"
    >
      <button aria-label="Menu" class="cursor-pointer" onclick={toggleMenu}>
        {#if !open}
          <svg
            width="25"
            height="19"
            viewBox="0 0 25 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="0.5" x2="25" y2="0.5" stroke="white"></line>
            <line y1="9.5" x2="25" y2="9.5" stroke="white"></line>
            <line y1="18.5" x2="25" y2="18.5" stroke="white"></line>
          </svg>
        {:else}
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.835731"
              y1="20.9285"
              x2="21.3539"
              y2="0.410357"
              stroke="white"
              stroke-width="1.16068"
            />
            <line
              x1="0.410363"
              y1="0.811622"
              x2="20.9285"
              y2="21.3298"
              stroke="white"
              stroke-width="1.16068"
            />
          </svg>
        {/if}
      </button>
    </div>
  </div>
  {#if open}
    <div>
      <ul class="grid lg:grid-cols-7 max-lg:divide-y lg:divide-x divide-white">
        <li class="flex">
          <a
            class="flex-1 p-2.5 flex flex-col justify-center items-center text-center space-y-2.5"
            href="/"
          >
            <span class="text-5xl lg:text-2xl uppercase">Intro</span>
          </a>
        </li>
        <li class="flex">
          <a
            class="flex-1 p-2.5 flex flex-col justify-center items-center text-center space-y-2.5"
            href="/stakes"
          >
            <span class="lg:hidden">I</span>
            <span class="font-tuoi-tre text-7xl lg:text-4xl uppercase">
              Stakes
            </span>
          </a>
        </li>
        <li class="flex">
          <a
            class="flex-1 p-2.5 flex flex-col justify-center items-center text-center space-y-2.5"
            href="/code"
          >
            <span class="lg:hidden">II</span>
            <span class="font-workbench text-7xl lg:text-4xl uppercase"
              >Code</span
            >
          </a>
        </li>
        <li class="flex">
          <a
            class="flex-1 p-2.5 flex flex-col justify-center items-center text-center space-y-2.5"
            href="/tools"
          >
            <span class="lg:hidden">III</span>
            <span class="font-mainframe text-6xl lg:text-3xl uppercase"
              >Tools</span
            >
          </a>
        </li>
        <li class="flex">
          <a
            class="flex-1 p-2.5 flex flex-col justify-center items-center text-center space-y-2.5"
            href="/rebels"
          >
            <span class="lg:hidden">IV</span>
            <span class="font-computer text-7xl lg:text-4xl uppercase"
              >Rebels</span
            >
          </a>
        </li>
        <li class="flex">
          <a
            class="flex-1 p-2.5 flex flex-col justify-center items-center text-center space-y-2.5"
            href="/ledger"
          >
            <span class="lg:hidden">V</span>
            <span class="font-star text-7xl lg:text-4xl uppercase">Ledger</span>
          </a>
        </li>
        <li class="flex">
          <a
            class="flex-1 p-2.5 flex flex-col justify-center items-center text-center space-y-2.5"
            href="/pledge"
          >
            <span class="font-mozilla-headline text-6xl lg:text-3xl">
              Pledge
            </span>
          </a>
        </li>
      </ul>
    </div>
  {/if}
</header>
