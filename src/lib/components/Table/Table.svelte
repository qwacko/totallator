<script lang="ts">
	import TableHeader from "./TableHeader.svelte";

</script>
<div class="flex flex-col items-stretch w-full gap-1">
    <TableHeader>
        <slot name="header" />
    </TableHeader>
    <slot />

    <slot name="footer" />


</div>