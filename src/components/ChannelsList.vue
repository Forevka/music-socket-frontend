<template>
    <div>
    <div id="page-description">
      <span>Choose Channel</span>
    </div>
    <section id="channel-list" ref="channelsList">
        <b-table
            :data="data"
            :loading="loading"

            paginated
            backend-pagination
            striped
            hoverable
            :total="total"
            :per-page="perPage"
            @page-change="onPageChange"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"

            backend-sorting
            :default-sort-direction="defaultSortOrder"
            :default-sort="[sortField, sortOrder]"
            @sort="onSort"
            icon-pack="fas">

            <template slot-scope="props">
                <b-table-column field="id" label="ID" numeric sortable>
{{ props.row.id }}
                </b-table-column>

                <b-table-column field="name" label="Name" sortable>
    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="channel_description" label="Description">
 {{ props.row.description }}
                </b-table-column>

                <b-table-column field="channel_link" label="Enter">
 <b-button @click="linkToChannel(props.row.id)" type="is-link">Enter</b-button>
                </b-table-column>
            </template>
        </b-table>
    </section>
    </div>
</template>

<script>
// import Vue from 'vue'
import HTTP from './HTTPApi'

export default {
  name: 'ChannelsList',
  data () {
    return {
      data: [],
      total: 0,
      loading: false,
      sortField: 'id',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
      page: 1,
      perPage: 10
    }
  },
  computed: {
    //
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.loading = true
      HTTP.Instance().getChannels(this.page, this.perPage, this.sortField, this.sortOrder === 'desc').then(r => {
        console.log(r)
        this.data = r.channels
        this.total = r.total_channels
        this.loading = false
      })
    },
    onPageChange (page) {
      this.page = page
      this.loadData()
    },
    linkToChannel (id) {
      this.$router.push({ name: 'Channel', params: {id} })// return '#/channel/' + id
    },
    onSort (field, order) {
      this.sortField = field
      this.sortOrder = order
      this.loadData()
    }
  },
  filters: {
    truncate (value, length) {
      return value.length > length
        ? value.substr(0, length) + '...'
        : value
    }
  }
}
</script>

<style lang="scss" scoped>
#channel-list {
  padding-top: 5em;
  padding-left: 5%;
  padding-right: 5%;
}

#page-description {
  padding-top: 4em;
  text-align: center;
  span {
    font-weight:bold;
    font-size: 200%;
  }
}

.pagination-list {
  .pagination-link {
    color: white;
  }
}
</style>

<style lang="scss">
.pagination-link {
  color: white;
}

.pagination-previous[disabled], .pagination-next[disabled], .pagination-link[disabled] {
  border-color: #950740;
  background-color: #4e4e50;
  opacity: 0.5;
}

.pagination-previous, .pagination-next, .pagination-link {
  background-color: #240090;
}
</style>
