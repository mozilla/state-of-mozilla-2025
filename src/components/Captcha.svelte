<script>
  import { onMount } from "svelte";
  import CaptchaWordSvg from "./svg/CaptchaWordSvg.svelte";

  let showCaptcha = $state(true);
  let input = $state(null);
  let inputValue = $state("");
  let attemptCount = $state(0);
  let showBypass = $state(false);
  let bypassLines = $state([]);

  const terminalLines = [
    "// EXECUTING BYPASS PROTOCOL",
    "> sudo access --override",
    "[ OK ] Authentication override enabled",
    "> decrypt captcha_hash",
    "[ OK ] Hash decrypted: f-u-t-u-r-e",
    "> grant access --force",
    "[ ACCESS GRANTED ]",
  ];

  onMount(() => {
    if (sessionStorage.getItem("captchaVerified")) {
      showCaptcha = false;
    }
    input.focus();
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (inputValue.toLowerCase() === "future") {
      showCaptcha = false;
      sessionStorage.setItem("captchaVerified", "true");
    } else {
      attemptCount++;
      inputValue = "";

      if (attemptCount >= 2) {
        setTimeout(() => {
          executeBypass();
        }, 1000);
      }
    }
  }

  function executeBypass() {
    showBypass = true;
    let currentIndex = 0;

    function addLine() {
      const randomDelay = Math.random() * 200 + 100;

      if (currentIndex < terminalLines.length) {
        bypassLines = [...bypassLines, terminalLines[currentIndex]];
        currentIndex++;
        setTimeout(addLine, randomDelay);
      } else {
        setTimeout(() => {
          showCaptcha = false;
          sessionStorage.setItem("captchaVerified", "true");
        }, 1000);
      }
    }

    addLine();
  }

  const buttonText = $derived(
    attemptCount === 0
      ? "Verify"
      : attemptCount === 1
        ? "Try again"
        : "Don't worry, we'll help",
  );
</script>

{#if showCaptcha}
  <div
    id="captcha"
    class="fixed z-40 w-full h-full inset-0 flex justify-center items-center overscroll-contain bg-white/60 p-2.5"
  >
    <div class="p-2.5 lg:p-5 border-2 border-black bg-yellow">
      {#if !showBypass}
        <CaptchaWordSvg />

        <form onsubmit={handleSubmit}>
          <label for="word">Type the word above:</label>
          <div class="grid lg:grid-cols-2 gap-2.5">
            <div class="flex space-x-2.5">
              <input
                type="text"
                bind:this={input}
                bind:value={inputValue}
                class="border border-black bg-white px-2.5 px-[1.5rem] py-[1rem]"
              />
              <div class="flex flex-col justify-around">
                <svg
                  width="17"
                  height="23"
                  viewBox="0 0 17 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.63105 22.6481C8.53559 21.8844 8.46399 21.4548 8.44013 21.0253C8.41626 20.6434 8.3924 20.2616 8.36853 19.7604C4.81262 19.4263 2.09196 17.7557 0.707781 14.5339C-0.318424 12.0997 -0.318424 9.49837 1.30441 6.94479C1.87718 7.44596 2.35451 7.87553 2.78408 8.25737C1.06578 13.0781 3.5955 17.3262 8.27309 17.2546C8.34468 16.467 8.41626 15.6556 8.51172 14.8442C9.80044 15.6079 11.4949 17.2784 12.4256 18.7342C11.4233 20.1423 10.0868 21.2162 8.63105 22.6481Z"
                    fill="#1D1D1B"
                  />
                  <path
                    d="M15.2647 15.7272C14.7874 15.1306 14.4056 14.6055 13.9999 14.0805C15.05 11.7894 15.0022 9.56996 13.451 7.61301C12.2577 6.1095 10.802 4.9401 8.55862 5.17875C8.48702 6.0379 8.41544 6.8732 8.34384 7.80394C7.05512 6.49135 5.83798 5.25035 4.52539 3.9139C5.5516 2.52971 6.88805 1.33645 8.36769 0C8.41542 0.954609 8.46315 1.71829 8.51088 2.52971C9.89506 3.03088 11.327 3.43659 12.6396 4.08095C16.983 6.22882 17.8899 12.4338 15.2886 15.7272"
                    fill="#1D1D1B"
                  />
                </svg>
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.75823 0.548986V17.9706C7.80128 16.0136 6.03527 14.2476 4.22152 12.4339H0.283732C-0.169707 11.3599 0.068944 10.3099 0.0212135 9.28365C-0.0265169 8.30517 0.0212135 7.35057 0.0212135 6.25277C1.38153 5.8948 2.69412 6.20504 4.26922 5.99025C5.91592 4.34355 7.75355 2.52979 9.75823 0.525116"
                    fill="#1D1D1B"
                  />
                  <path
                    d="M12.0234 18.6865C11.9518 17.9467 11.8802 17.35 11.8086 16.7057C15.5554 15.2021 17.5124 12.6008 17.2499 8.68694C17.0351 5.46514 15.3168 3.24567 12.3336 2.124C11.9041 1.38418 11.4984 0.692092 12.262 0C15.9134 0.357978 19.3977 4.62986 19.6364 8.63922C19.9228 13.4361 16.3668 17.9705 12.0234 18.6865Z"
                    fill="#1D1D1B"
                  />
                  <path
                    d="M12.2366 5.05945C15.5061 7.61303 15.5299 10.7394 12.4036 13.4123C11.807 12.6486 11.7831 12.6486 11.8308 9.23586C11.8308 7.85168 11.449 6.41977 12.2366 5.05945Z"
                    fill="#1D1D1B"
                  />
                </svg>
              </div>
            </div>
            <div>
              <button type="submit" class="btn w-full invert">
                {buttonText}
              </button>
            </div>
          </div>
        </form>
      {:else}
        <div class="bg-black text-white p-4 font-mono text-sm">
          <code class="block">
            {#each bypassLines as line}
              <p>{line}</p>
            {/each}
            <p>
              <span class="blinking-cursor inline-block w-2 h-4 bg-white"
              ></span>
            </p>
          </code>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  :global(html.captcha-seen) #captcha {
    display: none;
  }
</style>
