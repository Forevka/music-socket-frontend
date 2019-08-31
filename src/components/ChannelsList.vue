<template>
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
            aria-current-label="Current page">

            <template slot-scope="props">
                <b-table-column field="channel_id" label="ID" numeric sortable>
{{ props.row.id }}
                </b-table-column>

                <b-table-column field="channel_name" label="Name" sortable>
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
      sortField: 'vote_count',
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
      HTTP.Instance().getChannels(this.page, this.perPage).then(r => {
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
      this.$router.replace({ name: 'Channel', params: {id} })// return '#/channel/' + id
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
  padding-top: 4em;
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
