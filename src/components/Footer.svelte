<script>
  import Footer1Svg from "./svg/Footer1Svg.svelte";
  import Footer2Svg from "./svg/Footer2Svg.svelte";
</script>

<footer>
  <section class="bg-yellow px-3 lg:px-6 pt-3 pb-6 lg:pt-6 lg:pb-12">
    <div class="grid lg:grid-cols-2 gap-3 lg:gap-6">
      <div class="space-y-3">
        <p class="uppercase">Join us in creating a better internet</p>
        <p>
          We know the internet has the potential to be even better. But we can
          only get there if we work together.
        </p>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.mozilla.org/en-US/about/manifesto/"
            >
              MOZILLA MANIFESTO →
            </a>
          </li>
          <li>
            <a target="_blank" href="https://blog.mozilla.org/en/"> BLOG → </a>
          </li>
          <li>
            <a target="_blank" href="https://www.firefox.com/en-US/">
              DOWNLOAD FIREFOX →
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.mozilla.org/en-US/careers/">
              CARREERS →
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.mozillafoundation.org/en/donate/"
            >
              DONATE →
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section class="bg-black text-white px-3 lg:px-6 py-3 lg:py-6">
    <div class="grid lg:grid-cols-2 gap-3 lg:gap-6 mb-6 lg:mb-12">
      <div>
        <p>Get Mozilla updates. Private and secure - no sharing, no selling.</p>
      </div>
      <div>
        <form
          action="https://mozilla.formstack.com/forms/index.php"
          method="POST"
          class="flex flex-col space-y-1.5 lg:space-y-3 mb-0"
        >
          <input type="hidden" name="form" value="6352547" />
          <input type="hidden" name="viewkey" value="oMYX3UGOFV" />
          <input type="hidden" name="_submit" value="1" />
          <input
            type="email"
            name="field189514574"
            id="email"
            placeholder="Enter your e-mail"
            required
            aria-required="true"
            class="placeholder:text-white w-full lg:w-3/4 border-b border-white border-dashed focus:outline-0 py-1.5 uppercase"
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
          <button class="btn text-left lg:w-3/4"> Sign up now </button>
        </form>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-3 lg:gap-6 mb-6 lg:mb-12">
      <div class="space-y-6 lg:space-y-12">
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
        <Footer1Svg />
        <ul class="uppercase">
          <li>
            <a target="_blank" href="https://www.mozilla.org/privacy/websites/">
              Website Privacy Notice →
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.mozilla.org/privacy/websites/cookie-settings/"
            >
              Cookies →
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.mozilla.org/about/legal/">
              Legal →
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.mozilla.org/about/governance/policies/participation/"
            >
              Community Participation Guidelines →
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.mozilla.org/about/this-site/">
              About this site →
            </a>
          </li>
        </ul>
      </div>
    </div>
    <Footer2Svg />
  </section>
</footer>
