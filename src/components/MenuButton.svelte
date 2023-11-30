<script>
    import {isMobileMenuOpen} from "../stores/menu";
  </script>
  
  <!--use "$" to read the store value-->
  <button class="sm:hidden" on:click={() => isMobileMenuOpen.set(!$isMobileMenuOpen)}>&times;</button>