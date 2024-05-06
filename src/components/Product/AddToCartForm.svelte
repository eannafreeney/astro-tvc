<script>
  import { addCartItem, isCartUpdating, cart } from "../../stores/cart";
  import {Money} from '../index'

  export let variants;
  export let isFunding;
  export let percentageFunded;

  let selectedVariant = variants?.[0]
  let hasVariants = variants?.length > 1;
  let quantity = 1
  
  $: isFirstVariant = selectedVariant === variants?.[0]
  $: variantInCart =
    $cart &&
    $cart.lines?.nodes.filter((item) => item.merchandise.id === selectedVariant.id)[0];
  $: noQuantityLeft =
    variantInCart && selectedVariant.quantityAvailable <= variantInCart?.quantity;

  function handleVariantChange(event) {
    const selectedIndex = event.target.selectedIndex;
    selectedVariant = variants[selectedIndex];
  }

  function increment() {
    return quantity ++
  }

  function decrement() {
   if(quantity === 1) {
    return 
   }
   return quantity--
  }

  function addToCart(e) {
    const form = e.target;
    const formData = new FormData(form);
    const { id, quantity } = Object.fromEntries(formData);
    const item = {
      id: id,
      quantity: parseInt(quantity),
    };
    addCartItem(item);
  }

</script>

<div class="container text-md">
  <Money 
    price={selectedVariant?.price}
    compareAtPrice={selectedVariant?.compareAtPrice}
    isFirstVariant={isFirstVariant}
  />
  {#if isFunding}<span>{`/ ${percentageFunded}% Funded`}</span>{/if}
</div>
<form on:submit|preventDefault={(e) => addToCart(e)} class="container flex flex-col gap-3">

  {#if hasVariants}
  <div class="border border-gray-400 cursor-pointer px-2 py-1 relative w-full">
    <select on:change={handleVariantChange} class="bg-transparent border-none text-black cursor-pointer h-10 m-0 w-full ">
      {#each variants as variant (variant.id)}
      <option value={variant.title}>{variant.title}</option>
      {/each}
    </select>
  </div>  
  {/if}

  <!-- Hidden fields to store selected variant's id and quantity -->
  <input type="hidden" bind:value={selectedVariant.id} name="id">
  <input type="hidden" name="quantity" bind:value={quantity}>
  
  <div class="flex items-center gap-2">
  <div class="border-2 rounded-lg px-2 py-[10px] flex items-center gap-3 text-xl">
    <div on:click={decrement} class="cursor-pointer">-</div>
    {quantity}
    <div on:click={increment} class="cursor-pointer">+</div>
  </div>
  <button
    type="submit"
    class="button"
    disabled={$isCartUpdating || noQuantityLeft || !selectedVariant.availableForSale}
  >
    {#if $isCartUpdating}
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    {/if}
    {#if selectedVariant.availableForSale}
      <span>Add to Cart</span>
    {:else}
      Sold Out
    {/if}
  </button>
</div>

  {#if noQuantityLeft}
    <div class="text-center text-red-600">
      <small>All units left are already in your cart</small>
    </div>
  {/if}
</form>
