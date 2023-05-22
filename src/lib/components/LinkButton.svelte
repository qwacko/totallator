<script lang="ts">
	export let style: 'primary' | 'secondary' = 'primary';
	export let href: string = '#';
</script>

<a
	class="btn"
	class:variant-filled-primary={style === 'primary'}
	class:variant-filled-secondary={style === 'secondary'}
	{href}
	{...$$restProps}
>
	<slot />
</a>

