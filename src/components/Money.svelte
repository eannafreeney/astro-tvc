<script>

  export let price;
  export let showCurrency = false;
  export let compareAtPrice;
  let formatedCompareAtPrice;

  $: formatedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode,
    currencyDisplay: showCurrency ? "symbol" : "narrowSymbol",
  }).format(parseFloat(price.amount));

  $: if (compareAtPrice) {
  formatedCompareAtPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: compareAtPrice.currencyCode,
    currencyDisplay: showCurrency ? "symbol" : "narrowSymbol",
  }).format(parseFloat(compareAtPrice.amount));
}

</script>

<span>
  {#if !!formatedCompareAtPrice}
    {formatedPrice} / <span class="line-through">{`${formatedCompareAtPrice}`}</span>
  {:else}
  {formatedPrice}
  {/if}
</span>
