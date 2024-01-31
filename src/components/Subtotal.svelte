<script>
    import {Money} from '../components'
    import {
    cart
  } from "../stores/cart";
</script>


{#if $cart && $cart.lines?.nodes.length > 0}
      <Money
        price={$cart.cost.subtotalAmount}
        showCurrency={true}
      />
{/if}