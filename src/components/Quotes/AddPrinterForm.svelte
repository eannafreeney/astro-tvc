<script>
  
    let responseMessage;
  
    async function submit(e) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/addPrinter", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      responseMessage = data.message;
    }
   
  </script>
  
  
       <form on:submit={submit} class="flex flex-col gap-4 w-1/4">
            <input
              type="text"
              placeholder="Name"
              name="name"
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
            />
            <button type="submit" class="bg-primary-100 rounded h-12 color-textColor uppercase tracking-wider">
              Submit
            </button>
            {#if responseMessage}
      <p>{responseMessage}</p>
    {/if}
          </form>
  
    