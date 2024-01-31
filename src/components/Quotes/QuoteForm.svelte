<script>
      export let printers;
    let responseMessage;

    let countries = printers.map((p) => p.country)
    // import countries from db
  
    async function submit(e) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/getQuote", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      responseMessage = data.message;
    }
   
  </script>
  
  
       <form on:submit={submit} class="flex flex-col gap-4 w-1/4">
        <label for="name">Name</label>
            <input
              type="text"
              placeholder="Whats the name of the project?"
              name="name"
            />
            {#each countries as country}
            <formset>
<label for={country}>{country}</label>
                <input
                type="checkbox"
                name="country"
                value={country}
                />
            </formset>
            {/each}
            <button type="submit" class="bg-primary-100 rounded h-12 color-textColor uppercase tracking-wider">
              Submit
            </button>
            {#if responseMessage}
      <p>{responseMessage}</p>
    {/if}
          </form>
  
    