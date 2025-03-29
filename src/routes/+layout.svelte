<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/modules">Modules</a>
</nav>

{@render children()}
