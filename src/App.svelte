<script>

let fetchDataResult
	
fetch("http://localhost:8081/seed")
		.then(response => { 
		   console.log(' response', response)
		   console.log(' r.json() >', response.clone().json()) //
		   response.json()
			   .then(json => {
						console.log('json', json)
				    fetchDataResult = json				   
		     })
		     .catch(error => console.log(error))
	})




</script>

<main>
	
	{#if fetchDataResult}
		
	<h2>Seed hash : {fetchDataResult.seed}</h2>	
	{:else}
	<p>loading</p>
	{/if}

	



	<h1>Heads or tails?</h1>
	<h2>If the seed is even, its heads, and vise versa</h2>
	<div>
		<form action="http://localhost:8081/heads" method="post">
			<button >Heads</button>
		</form>

		<form action="http://localhost:8081/tails" method="post">
			<button >Tails</button>
		</form>

	</div>
</main>

<style>

</style>