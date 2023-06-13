<script setup>
import { ref, reactive, computed } from 'vue';
const props = defineProps({
    columns: {
        type: Array,
        required: true,
        default(rawProps) {
            return [];
        },
        validator(value) {
            return Array.isArray(value) && value.length && value.every((e) => e.hasOwnProperty('key'));
        }
    },
    rows: {
        type: Array,
        default(rawProps) {
            return [];
        }
    },
    selection: {
        type: Boolean
    },
    density: {
        type: String,
        default: 'default' // default | comfortable | compact
    }
});
const selectedRows = ref([]);
function onHeaderChecked() {
  selectedRows.value = selectedRows.value.length === props.rows.length ? [] : props.rows.map((e) => e.id);
}
function onRowChecked(rowItem, value) {
  if (selectedRows.value.includes(rowItem.id)) selectedRows.value = selectedRows.value.filter((e) => e !== rowItem.id);
    else selectedRows.value.push(rowItem.id);
}
</script>
<template>
    <v-card class="border" elevation="0">
        <v-table class="month-table" :density="density">
            <thead>
                <tr>
                    <th class="datatable-checkbox-column" v-if="selection">
                        <v-checkbox hide-details :model-value="selectedRows.length === rows.length" @click.capture.stop="onHeaderChecked()"></v-checkbox>
                    </th>
                    <th
                        :class="{
                            'text-h6': true,
                            ...(column.classes || []).filter(Boolean).join(' ')
                        }"
                        v-for="column in columns"
                        :key="column.key"
                    >
                        <slot :name="`column_${column.key}`" v-bind="{ column }">{{ column.text }}</slot>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.id" class="">
                    <!-- <td>
                        <div class="d-flex align-center">
                            <v-avatar size="40">
                                <img :src="item.avatar" alt="avatar" height="40" />
                            </v-avatar>
                            <div class="ml-4">
                                <h6 class="text-h6">{{ item.name }}</h6>
                                <div class="text-subtitle-1 text-medium-emphasis">{{ item.post }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <h6 class="text-h6 font-weight-medium text-medium-emphasis">{{ item.pname }}</h6>
                    </td>
                    <td>
                        <div class="d-flex align-center">
                            <div class="ml-2 d-flex flex-row-reverse">
                                <v-avatar
                                    v-for="team in item.teams"
                                    :key="team.id"
                                    size="35"
                                    :class="'ml-n2 avtar-border bg-' + team.color"
                                >
                                    {{ team.text }}
                                </v-avatar>
                            </div>
                        </div>
                    </td>
                    <td>
                        <v-chip rounded="md" class="font-weight-bold" :color="item.statuscolor" size="small" label>{{
                            item.status
                        }}</v-chip>
                    </td> -->
                    <td v-if="selection">
                        <v-checkbox
                            hide-details
                            :model-value="selectedRows.includes(row.id)"
                            @click="
                                (e) => {
                                    onRowChecked(row, e.target.checked);
                                }
                            "
                        ></v-checkbox>
                    </td>
                    <td v-for="column in columns" :key="column.key">
                        <slot :name="`row_${row.id}_col_${column.key}`" v-bind="{ item: row[column.key], column, row }">
                            <h6 class="text-h6">{{ row[column.key] }}</h6>
                        </slot>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>
<style scoped>
.datatable-checkbox-column,
.datatable-checkbox-row {
    width: 56px;
}
</style>
