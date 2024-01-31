<script>
  export let submissions
  export let openModal
</script>


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Country</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    {#each submissions as sub}
        <tr>
          <th on:click={openModal}>{sub.name}</th>
          <th>{sub.country}</th>
          <th>{sub.printer}</th>
        </tr>
        {/each}
  </tbody>
</table>

