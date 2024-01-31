<script>
    export let printers;
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
         {#each printers as p}
         <tr>
             <th>{p.name}</th>
             <th>{p.country}</th>
             <th>{p.email}</th>
         </tr>
         {/each}
     </tbody>
  </table>

   