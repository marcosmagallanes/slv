<script>
  export let postList;
  import Fuse from "fuse.js";

  const fuse = new Fuse(postList, {
    shouldSort: true,
    keys: ["data.title", "data.description", "data.tags"],
  });

  $: query = "";
  $: results = fuse.search(query);
  
  import { slide } from "svelte/transition";
  let searchOpen = false;
  let inputRef;
  let isAnimating = false;

  $: if (searchOpen && inputRef) {
    inputRef.focus();
  }

  function toggleSearch() {
    if (!isAnimating) {
      isAnimating = true;
      searchOpen = !searchOpen;
      setTimeout(() => {
        isAnimating = false;
      }, 300); // Adjust the timeout to match the transition duration
    }
  }
</script>

<div class="relative">
  <div class="flex items-center">
    <button on:click={toggleSearch} class="focus:outline-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-gray-600 hover:text-gray-800"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </button>
    {#if searchOpen}
      <div class="absolute right-10 w-40" transition:slide={{ axis: 'x' }}>
        <div class="relative">
          <input
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Search"
            bind:this={inputRef}
            bind:value={query}
            on:blur={() => {
              isAnimating = true;
              searchOpen = false;
              setTimeout(() => {
                isAnimating = false;
              }, 300);
            }}
          />
          <ul class="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 border-gray-300" class:border={results.length > 0}>
            {#each results as result (result.item.id)}
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">{result.item.data.title}</li>
            {/each}
          </ul>
        </div>
      </div>
    {/if}
  </div>
</div>