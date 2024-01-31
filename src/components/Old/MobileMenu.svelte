<script lang="ts">
    import { fade, fly } from "svelte/transition";
    // import {isMobileMenuOpen} from "../../stores/menu";
    import { clickOutside } from "../../utils/click-outside";
    import {data as navLinks} from '../../constants/primary-menu'
    import {SocialLinks} from '..'
  
  
    // Add focus to cart drawer when it opens
    $: {
      if ($isMobileMenuOpen) {
        document.querySelector("body")?.classList.add("overflow-hidden");
        // cartDrawerEl?.focus();
      }
    }
  
    function closeMobileMenu() {
      document.querySelector("body")?.classList.remove("overflow-hidden");
      isMobileMenuOpen.set(false);
    }
  
  </script>

{#if $isMobileMenuOpen}
<div
  class="relative z-50"
  aria-labelledby="slide-over-title"
  role="dialog"
  aria-modal="true"
>
  <div
    in:fade={{ duration: 500 }}
    out:fade={{ duration: 500 }}
    class="fixed inset-0 bg-slate-400/50 backdrop-blur-sm transition-opacity"
  />

  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pl-6 focus:outline-none"
        tabindex="-1"
        use:clickOutside={() => closeMobileMenu()}
       
      >
        <div
          in:fly={{ duration: 500, x: -window.innerWidth, opacity: 100 }}
          out:fly={{ duration: 500, x: -window.innerWidth, opacity: 100 }}
          class="pointer-events-auto w-screen max-w-lg max-h-screen bg-white fixed top-0 left-0 bottom-0"
        >
          <button class="absolute right-3 top-3" on:click={() => isMobileMenuOpen.set(!$isMobileMenuOpen)}>CLOSE</button>
        <div class="grid place-items-center h-screen">

          <div class="flex flex-col text-center">
            {#each navLinks as link}
            <a class="text-5xl capitalize leading-normal hover:text-primary-100" href={link.path}>{link.label}</a>
            {/each}
          </div>
        </div>
            <!-- <SocialLinks /> -->
        </div>
      </div>
    </div>
  </div>
</div>
{/if}