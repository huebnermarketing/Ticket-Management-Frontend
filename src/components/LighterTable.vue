<template>
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :default-sort="{ prop: 'name', order: 'descending' }"
                  :data="data"
                  sortable="custom"
                  @sort-change="onSort"
                  empty-text="No datafound"
                  v-loading="loading"
                >             
            <el-table-column sortable :key="ci" v-for="(column, ci) in columns" :prop="column.key" :label="column.text">
                <slot name="a1" v-if="column.key==='a1'"></slot>

            </el-table-column>
        </el-table>
</template>
<script>
  import projects from '../views/Tables/projects'
  import { Table, TableColumn} from 'element-ui'
  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        projects,
      };
    },
    props:{
        currentPage: {
            type:Number,
            default:1
        },
        data: {
            type:Array,
            default: () => []
        },
        columns: {
            type:Array, default: ()=>[], required:true
        },
        perPage: {
            type:Number,
            default:5
        },
        total: {
            type:Number,
            default:50
        },
        pageCount: {
            type:Number,
            default:3 
        },
        loading: {
            type: Boolean,
            default:false
        }
    },
    mounted() {
        console.log("mmmm",projects)
    },
   methods: {
    onSort() {
        console.log(arguments)
      },
   },
  }
</script>
<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
body {
  margin: 0;
}
</style>