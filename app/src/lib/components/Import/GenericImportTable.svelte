<script lang="ts">
	import type { ImportChecksReturn } from '$lib/graphqlClient/generated';
	import type { Maybe } from 'graphql/jsutils/Maybe';
	import { getChangeInfo } from './getChangeInfo';

	type ImportType = {
		processingResult?: Maybe<ImportChecksReturn> | undefined;
		[key: string]: unknown;
	};
	export let data: ImportType[] | undefined | null;
	export let columnConfig: { title: string; key: keyof ImportType }[];
	export let noItemsText: string;
	export let selected: boolean;

	$: useData = data ? data.map((item) => item) : [];
</script>

{#if selected}
	{#if !data || data.length === 0}<div
			class="bg-blue-200 rounded-md border text-center font-bold m-4 p-4">
			{noItemsText}
		</div>{:else}
		<table class="mx-4 overflow-y-auto">
			<thead>
				<th class="text-center p-2">Import Info</th>
				{#each columnConfig as currentColumn}
					<th class="text-center p-2">{currentColumn.title}</th>
				{/each}
			</thead>
			{#each useData as currentData}
				{@const changeInfo = getChangeInfo(currentData.processingResult)}
				<tr>
					<td class:orange={changeInfo.colour.orange} class:green={changeInfo.colour.green}>
						{changeInfo.text}
					</td>
					{#each columnConfig as currentColumn}
						<td class:orange={changeInfo.colour.orange} class:green={changeInfo.colour.green}>
							{currentData[currentColumn.key] || ''}
						</td>
					{/each}
				</tr>
			{/each}
		</table>
	{/if}
{/if}

<style lang="postcss">
	td {
		@apply text-center px-2 whitespace-nowrap;
	}

	.orange {
		@apply bg-orange-100;
	}

	.green {
		@apply bg-green-100;
	}
</style>
