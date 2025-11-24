<script>
  import Svg from "./Svg.svelte";
</script>

<footer>
  <section
    class="bg-black text-white px-2.5 lg:px-5 py-2.5 lg:py-5 space-y-5 lg:space-y-10"
  >
    <p class="mb-5">Let’s Do for AI What We Did for the Web</p>
    <div class="grid lg:grid-cols-2 gap-2.5 lg:gap-5">
      <div class="space-y-2.5 lg:space-y-5">
        <p>Help us make the age of AI better, fairer, and more free.</p>
        <p class="text-gray mb-2.5">Learn more</p>
        <ul class="space-y-2.5">
          <li>
            <a
              class="underline"
              target="_blank"
              href="https://www.mozilla.org/en-US/about/manifesto/"
            >
              Mozilla Manifesto
            </a>
          </li>
          <li>
            <a
              class="underline"
              target="_blank"
              href="https://blog.mozilla.org/en/"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              class="underline"
              target="_blank"
              href="https://www.firefox.com/en-US/"
            >
              Download Firefox
            </a>
          </li>
          <li>
            <a
              class="underline"
              target="_blank"
              href="https://www.mozilla.org/en-US/careers/"
            >
              Careers
            </a>
          </li>
          <li>
            <a
              class="underline"
              target="_blank"
              href="https://www.mozillafoundation.org/en/donate/"
            >
              Donate
            </a>
          </li>
        </ul>
      </div>
      <div class="space-y-2.5 lg:space-y-5">
        <p>Get Mozilla updates. Private and secure - no sharing, no selling.</p>
        <form
          action="https://mozilla.formstack.com/forms/index.php"
          method="POST"
          class="flex flex-col space-y-1.5 lg:space-y-2.5 mb-0"
        >
          <input type="hidden" name="form" value="6352547" />
          <input type="hidden" name="viewkey" value="oMYX3UGOFV" />
          <input type="hidden" name="_submit" value="1" />
          <input
            type="email"
            name="field189514574"
            id="email"
            placeholder="your email address"
            required
            aria-required="true"
            class="placeholder:text-white w-full text-black lg:w-3/4 px-5 py-4 bg-white/20 focus:outline-0 focus:bg-white focus:placeholder:text-black"
          />
          <label
            for="privacy"
            class="flex items-start space-x-1 lg:w-3/4 text-sm"
          >
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              aria-required="true"
              class="mt-1"
            />
            <span>
              I’m okay with Mozilla handling my info as explained in
              <a
                class="underline"
                target="_blank"
                href="https://www.mozilla.org/privacy/websites/"
              >
                this Privacy Notice
              </a>
            </span>
          </label>
          <button class="btn text-left lg:w-3/4">Subscribe</button>
        </form>
      </div>
    </div>
    <hr class="border-gray" />
    <div class="grid lg:grid-cols-2 gap-2.5 lg:gap-5">
      <div class="space-y-5 lg:space-y-12">
        <p>
          Visit <a
            class="underline"
            target="_blank"
            href="https://www.mozilla.org/">Mozilla Corporation</a
          >'s not-for-profit parent,
          <a
            class="underline"
            target="_blank"
            href="https://www.mozillafoundation.org/en/">Mozilla Foundation</a
          >. Portions of this content are ©1998-2025 by individual mozilla.org
          contributors. Content available under a
          <a
            class="underline"
            target="_blank"
            href="https://www.mozilla.org/en-US/foundation/licensing/website-content/"
          >
            Creative Commons license
          </a>.
        </p>
        <Svg
          src="/svg/footer1.svg"
          class="w-[184.5px] h-[148.5px] lg:w-[369px] lg:h-[297px]"
        />
        <p class="text-gray mb-2.5">Company</p>
        <ul class="space-y-2.5">
          <li>
            <a
              class="underline"
              target="_blank"
              href="https://www.mozilla.org/privacy/websites/"
            >
              Website Privacy Notice
            </a>
          </li>
          <li>
            <a
              class="underline"
              target="_blank"
              href="https://www.mozilla.org/privacy/websites/cookie-settings/"
            >
              Cookies
            </a>
          </li>
          <li>
            <a
              class="underline"
              target="_blank"
              href="https://www.mozilla.org/about/legal/"
            >
              Legal
            </a>
          </li>
          <li>
            <a
              class="underline"
              target="_blank"
              href="https://www.mozilla.org/about/governance/policies/participation/"
            >
              Community Participation Guidelines
            </a>
          </li>
          <li>
            <a
              class="underline"
              target="_blank"
              href="https://www.mozilla.org/about/this-site/"
            >
              About this site
            </a>
          </li>
        </ul>
      </div>
    </div>
    <hr class="border-gray" />
    <Svg src="/svg/footer2.svg" class="w-full" />
  </section>
</footer>
