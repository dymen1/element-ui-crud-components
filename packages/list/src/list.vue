<template>
  <div class="list">
    <el-row type="flex" justify="center" :gutter="0">
      <el-card :style="{ 'width': listWidthPercentage + '%' }">
        <div slot="header">
          <h2>{{ title }}</h2>
          <div class="buttons" >
            <nuxt-link :to="addLink ? addLink : '/' + baseRoute + '/add'" v-if="hasAddButton">
              <el-button type="primary" :title="$t('crud.buttonTitle.add')" icon="el-icon-plus" circle
                         size="small"></el-button>
            </nuxt-link>

            <template v-for="button in extraTitleButtons" >
              <el-button
                      v-if="button.shouldRenderFn ? button.shouldRenderFn(button) : true"
                      @click="button.handler ? button.handler(button) : ''"
                      :type="button.type ? button.type : 'default'"
                      :size="buttonSize" :circle="useRoundButtons"
                      :icon="button.icon ? button.icon : 'el-icon-check'"/>
            </template>
          </div>
        </div>
        <el-row type="flex" class="el-table-pagination">
          <el-col :md="16" :lg="18" :xl="20">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                    :current-page="pageOffset"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    :layout="paginationLayout"
                    :total="filteredListDataCount"
                    :hide-on-single-page="hasPagination">
            </el-pagination>
          </el-col>
          <el-col :md="8" :lg="6" :xl="4">
            <el-input v-if="hasSearch" v-model="searchInput" size="mini"
                      ref="search" autofocus
                      :placeholder="$t( 'crud.search' )"/>
          </el-col>
        </el-row>
        <el-table :data="pagedListData"
                  :default-sort="defaultSort"
                  :row-class-name="rowClassNameGenerator"
                  border tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                  @sort-change="handleSortChange"
        >
          <el-table-column v-if="showExpandColumn()" type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item v-for="(value, key) in scope.row.expand"
                              :key="scope.row.id + value + key"
                              :label="$t( plural + '.' + key )+':'">
                  <span>{{ value }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column v-for="value in tableColumnsNames" v-if="showColumns()"
                           :key="'columns.id' + value + 'columns.' + value"
                           :prop="'columns.'+value" :label="$t( plural + '.' + value )"
                           :class-name="getCellClassName(value)"
                           :sortable="isSortableColumn(value)"
                           :filters="getColumnFilters(value)"
                           :filter-method="getFilterMethod(value)"
                           :filtered-value="getDefaultFiltered(value)"
                           :width="getColumnWidth(value)"
                           :min-width="getColumnMinWidth(value)"
                           :formatter="getColumnFormatter(value)">
          </el-table-column>

          <el-table-column v-if="hasActionColumn" fixed="right" :width="actionColumnWidth" :label="$t( 'crud.actions' )">
            <template #default="scope">
              <el-button-group>
                <el-button @click="toChildPage($event, scope.row.id, 'detail')" v-if="hasDetailButton"
                           type="primary" :size="buttonSize" :circle="useRoundButtons"
                           :title="$t('crud.buttonTitle.detail')" icon="el-icon-search"/>
                <el-button @click="toChildPage($event, scope.row.id, 'edit')" v-if="hasEditButton"
                           type="primary" :size="buttonSize" :circle="useRoundButtons"
                           :title="$t('crud.buttonTitle.edit')" icon="el-icon-edit"/>
                <template v-for="button in extraButtons">
                  <el-button
                          v-if="button.shouldRenderFn ? button.shouldRenderFn(scope.row) : true"
                          @click="button.handler ? button.handler($event, scope.row.id) : ''"
                          :type="button.type ? button.type : 'default'"
                          :size="buttonSize" :circle="useRoundButtons"
                          :icon="button.icon ? button.icon : 'el-icon-check'"/>
                </template>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="el-table-pagination">
          <el-col :md="16" :lg="18" :xl="20">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                    :current-page="pageOffset"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    :layout="paginationLayout"
                    :total="filteredListDataCount"
                    :hide-on-single-page="hasPagination">
            </el-pagination>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'class-component';
  import moment from 'moment';
  import {orderBy} from 'element-ui/packages/table/src/util.js';

  @Component({
    props: {
      title: String,
      storeName: String,
      baseRoute: String,
      tableColumns: Array,
      expandTableColumns: Array,
      sortableColumns: {
        type: Array,
        default: () => {
          return []
        }
      },
      defaultSorting: {
        type: Object,
        default: () => {
          return {}
        }
      },
      filterableColumns: {
        type: Object,
        default: () => {
          return {}
        }
      },
      rowClassNameGenerator: {
        type: Function,
        default: undefined,
      },
      list: Array,
      hasSearch: {
        type: Boolean,
        default: true,
      },
      hasPagination: {
        type: Boolean,
        default: true,
      },
      hasActionColumn: {
        type: Boolean,
        default: true,
      },
      actionColumnWidth: {
        type: Number,
        default: 152,
      },
      listWidthPercentage: {
        type: Number,
        default: 90,
      },
      useRoundButtons: {
        type: Boolean,
        default: true,
      },
      buttonSize: {
        type: String,
        default: 'small',
      },
      hasEditButton: {
        type: Boolean,
        default: true,
      },
      hasDetailButton: {
        type: Boolean,
        default: true,
      },
      extraTitleButtons: {
        type: Array,
        default: () => {
          return []
        }
      },
      extraButtons: {
        type: Array,
        default: () => {
          return []
        }
      },
      hasAddButton: {
        type: Boolean,
        default: false,
      },
      addLink: {
        type: String,
        default: undefined,
      },
    },
  })
  export default class List extends Vue {
    selections = [];
    tableSort = {};
    tableFilters = {};
    defaultTableFilters = {};
    pageOffset = 1;
    pageSize = 15;
    pageSizes = [10, 15, 20, 50, 100];
    paginationLayout = 'total, sizes, prev, pager, next, jumper';
    searchInput = '';

    /**
     * Gets the resource's plural, from it's store.
     * @returns String
     */
    get plural() {
      // return this.$store.getters[this.title.toLowerCase() + '/plural'];
      return this.$store.getters[this.storeName + '/plural'];
    }

    get defaultSort() {
      let defaultSort = this.defaultSorting;
      defaultSort.prop = 'columns.' + defaultSort.prop;
      this.tableSort = defaultSort;
      return defaultSort;
    }

    get tableColumnsNames() {
      return this.tableColumns.map(function (column) {
        return typeof column === typeof 'string' ? column : column.name;
      });
    }

    /**
     * Parses the passed list to the expected format.
     * @returns {Array}
     */
    get listData() {
      let data = [];
      if (!this.list) return [];
      this.list.forEach((entry, index) => {
        let row = {
          columns: undefined,
          expand: undefined,
        };
        Object.entries(entry).forEach(([key, value]) => {
          // Add id if it's present
          if (key === 'id') {
            row.id = value;
            return;
          }

          // CHeck if the data should be auto formatted
          if (!this.getColumnFormatter(key)) {

            // auto format dates
            let date = moment(value, moment.ISO_8601, true);
            if (date.isValid()) value = this.$d(date, 'long');
          }

          // Add value to filter
          if (this.isFilterableColumn(key)) {
            if (!(this.tableFilters[key] instanceof Array)) {
              this.tableFilters[key] = [];
              this.defaultTableFilters[key] = [];
            }

            let valueFilter = this.filterableColumns[key];
            let currentFilters = this.tableFilters[key];

            if (valueFilter instanceof Function) {
              valueFilter(currentFilters, value);
            } else if ((valueFilter instanceof Object) && valueFilter.hasOwnProperty("valueFilter")) {
              let valueFilterObject = valueFilter;
              valueFilter = valueFilterObject.valueFilter;
              valueFilter(currentFilters, value);

              // Set default filter
              if (valueFilterObject.hasOwnProperty("defaultFiltered")) {
                let defaultFiltered = valueFilterObject.defaultFiltered;
                if (defaultFiltered instanceof Function) {
                  // Check for each value if it is a defaultFilter
                  defaultFiltered(this.defaultTableFilters[key], value)
                } else if (this.defaultTableFilters[key].length !== defaultFiltered.length) {
                  // set default only once if this isn't a callback
                  this.defaultTableFilters[key] = defaultFiltered;
                }
              }
            } else {
              console.error("The values in the filter must be filtered of duplicates!");
            }
          }

          // Add to columns
          if (this.tableColumnsNames.includes(key)) {
            if (row.columns === undefined) row.columns = {};
            row.columns[key] = value;
            return;
          }

          // Add to expand columns
          if (this.expandTableColumns.includes(key)) {
            if (row.expand === undefined) row.expand = {};
            row.expand[key] = value;
            return;
          }
        });
        data[index] = row;
      });
      return data;
    }

    /**
     * filters the list to the expected size.
     * @returns {Array}
     */
    get sortedListData() {
      return Object.keys(this.tableSort).length === 0 ? this.listData : orderBy(
              this.listData,
              this.tableSort.prop,
              this.tableSort.order,
              this.tableSort.sortMethod,
              this.tableSort.sortBy
      );
    }

    /**
     * TODO: apply table filter before search
     * filters the list to according to the search query
     * @returns {Array}
     */
    get filteredListData() {
      let data = this.sortedListData;
      if (this.searchInput === '') return data;
      this.pageOffset = 1;
      return this.applySearchInput(data);
    }

    /**
     * Filters the list to the expected size.
     * @returns {Array}
     */
    get pagedListData() {
      let offset = this.pageSize * (this.pageOffset - 1);
      let set = this.pageSize * this.pageOffset;
      return this.filteredListData.slice(offset, set);
    }

    /**
     * Returns the number of rows in the filteredListData.
     * @returns {Number}
     */
    get filteredListDataCount() {
      return this.filteredListData.length;
    }

    /**
     * Check if the 'columns' property is set on the list's first row
     * @returns {boolean}
     */
    showColumns() {
      if (!this.listData[0]) return false;
      return this.listData[0].columns;
    }

    /**
     * Check if the 'expand' property is set on the list's first row
     * @returns {boolean}
     */
    showExpandColumn() {
      if (!this.listData[0]) return false;
      return this.listData[0].expand;
    }

    /**
     * Check if the given property is a sortable column
     * @returns {boolean}
     */
    isSortableColumn(property) {
      return this.sortableColumns.indexOf(property) !== -1;
    }

    /**
     * Check if the given property is a filterable column
     * @returns {boolean}
     */
    isFilterableColumn(property) {
      return this.filterableColumns[property] !== undefined;
    }

    /**
     * Enable filtering for the given property or return undefined
     * @returns {Array}
     */
    getColumnFilters(property) {
      if (!this.isFilterableColumn(property)) return undefined;
      return this.tableFilters[property];
    }

    /**
     * Get the filter method for the given property or return undefined
     * @returns {Function}
     */
    getFilterMethod(property) {
      if (!this.isFilterableColumn(property)) return undefined;

      let valueFilterObject = this.filterableColumns[property];
      if (!(valueFilterObject instanceof Object) || !valueFilterObject.hasOwnProperty("filterMethod")) return undefined;

      return valueFilterObject.filterMethod;
    }

    /**
     * Sets the default filter for the given property or return undefined
     * @returns {Array}
     */
    getDefaultFiltered(property) {
      if (!this.isFilterableColumn(property)) return undefined;
      return this.defaultTableFilters[property];
    }

    /**
     * TODO: implement
     * Handles the selection of a list's row
     * @param val {Object}
     */
    handleSelectionChange(val) {
      this.selections = val;
    }

    handleSortChange({column, prop, order}) {
      this.tableSort = {
        prop: prop,
        order: order,
        sortMethod: column.sortMethod,
        sortBy: column.sortBy
      };
    }

    handleSizeChange(newSize) {
      if (this.pageSize === newSize) return;
      this.pageSize = newSize;
    }

    handlePageChange(newOffset) {
      if (this.pageOffset === newOffset) return;
      this.pageOffset = newOffset;
    }

    /**
     * Filters the given data using the searchInput.
     * @param data {Array}
     * @returns {Array}
     */
    applySearchInput(data) {
      let matched = [];

      data.forEach(record => {
        let pushed = false;
        if (record.columns instanceof Object) {
          Object.values(record.columns).forEach(prop => {
            if (pushed) return;
            if (typeof prop !== typeof 'string') {
              if (prop === this.searchInput) {
                pushed = true;
                matched.push(record);
              }
              return;
            }
            if (prop.toLowerCase().indexOf(this.searchInput.toLowerCase()) === -1) return;
            pushed = true;
            matched.push(record);
          });
        }
        if (pushed) return;
        if (record.expand instanceof Object) {
          Object.values(record.expand).keys().forEach(prop => {
            if (prop.indexOf(this.searchInput) !== -1)
              matched.push(record);
          });
        }
      });

      return matched;
    }

    /**
     * Navigates to the given child page
     * @param event {Object}
     * @param id {Number}
     * @param childPage {string}
     */
    toChildPage(event, id, childPage = 'detail') {
      this.$router.push({
        path: id + '/' + childPage,
        append: true,
      });
    }

    getColumnWidth(name) {
      let columnConfig = this.findObjectByName(name, this.tableColumns);
      if (!columnConfig instanceof Object || columnConfig === undefined) return;
      return columnConfig.width;
    }
    getColumnMinWidth(name) {
      let columnConfig = this.findObjectByName(name, this.tableColumns);
      if (!columnConfig instanceof Object || columnConfig === undefined) return;
      return columnConfig.minWidth;
    }

    getColumnFormatter(name) {
      let columnConfig = this.findObjectByName(name, this.tableColumns);
      if (!columnConfig instanceof Object || columnConfig === undefined) return;
      return columnConfig.formatter;
    }

    getCellClassName(name) {
      let columnConfig = this.findObjectByName(name, this.tableColumns);
      if (!columnConfig instanceof Object || columnConfig === undefined) return;
      return columnConfig.noWrap ? 'column-no-wrap' : '';
    }

    /**
     * find object by name
     * @param name {string}
     * @param array {Array}
     * @returns {Object}
     */
    findObjectByName(name, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name !== name) continue;
        return array[i];
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    margin-bottom: 35px;

    .el-row {
      margin-top: 35px;

      .el-card {

        .el-card__header {

          div {
            display: flex;
            justify-content: flex-start;

            h2 {
              align-self: flex-end;
              margin: 0;
            }

            .buttons {
              flex-grow: 1;
              justify-content: flex-end;
            }
          }
        }

        .el-card__body {

          .el-table-pagination {
            padding-bottom: 5px;
            padding-top: 8px;
          }
        }

        .el-row.el-table-pagination {
          margin-top: 5px;
        }

        .el-row:first-child {
          margin-top: 0px;
        }
      }
    }

    .table-expand {
      font-size: 0;

      label {
        width: 90px;
        color: #99a9bf;
      }

      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
  }
</style>

<style lang="css">
  .el-table .column-no-wrap .cell {
    white-space: nowrap;
  }
  .rowActionColumn {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
</style>
