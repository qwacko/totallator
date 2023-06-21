<script lang="ts">
	export let title: string | null;
	export let colSpan: number = 1;
    export let center: boolean = false;
</script>

<h5
	class="h5 font-bold"
    class:text-center={center}
	class:col-span-1={colSpan === 1}
	class:col-span-2={colSpan === 2}
	class:col-span-3={colSpan === 3}
	class:col-span-4={colSpan === 4}
	class:col-span-5={colSpan === 5}
	class:col-span-6={colSpan === 6}
	class:col-span-7={colSpan === 7}
	class:col-span-8={colSpan === 8}
	class:col-span-9={colSpan === 9}
	class:col-span-10={colSpan === 10}
>
	{title}
</h5>
