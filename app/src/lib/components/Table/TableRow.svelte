<script lang="ts">
	export let id: string = '';
</script>

<tr {id} class="focus-within:bg-blue-50 hover:bg-blue-100">
	<slot />
</tr>
