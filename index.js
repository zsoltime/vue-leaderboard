const dataset = 'https://fcctop00.herokuapp.com/api/fccusers/top/recent';

function fetchData(url) {
  return fetch(url)
  .then(res => {
    if (!res.ok) {
      throw Error(`${res.status} ${res.statusText}`);
    }
    return res;
  })
  .then(res => res.json());
}

Vue.component('sort-button', {
  props: {
    size: {
      type: String,
      default: '24px',
    },
    color: {
      type: String,
      default: '#ccc',
    },
  },
  template: '\
    <svg \
      xmlns="http://www.w3.org/2000/svg" \
      xmlns:xlink="http://www.w3.org/1999/xlink" \
      version="1.1" \
      :width="size" \
      :height="size" \
      viewBox="0 0 16 16">\
        <path :fill="color" d="M11 7h-6l3-4z" />\
        <path :fill="color" d="M5 9h6l-3 4z" />\
    </svg>',
});

new Vue({
  el: '#app',
  data: {
    campers: [],
    error: null,
    isFetching: true,
    order: -1,
    sortBy: 'alltime',
  },
  created: function() {
    fetchData(dataset)
      .then(this.updateRanks)
      .then(res => {
        this.campers = res;
        this.isFetching = false;
        return res;
      })
      .catch((err) => {
        this.error = err.message;
        console.error(err.message);
      });
  },
  methods: {
    sort: function(col) {
      if (col === this.sortBy) {
        this.order *= -1;
      } else {
        this.sortBy = col;
      }
    },
    showUserCard: function(i) {
      console.log(this.campers[i].username, 'alltime rank:', this.campers[i].rank.alltime, 'recent rank:', this.campers[i].rank.recent)
    },
    updateRanks: function(campers) {
      const sortedByAlltime = campers.slice()
        .sort((a, b) => b.alltime - a.alltime);
      const ranks = campers.slice()
        .map(camper => (sortedByAlltime
          .findIndex(x => x.alltime === camper.alltime) + 1)
        );

      return campers.map((camper, index) => (
        Object.assign({}, camper, {
          rank: {
            alltime: ranks[index],
            recent: index + 1,
          },
        })
      ));
    },
  },
  computed: {
    sortedList: function() {
      return this.campers.sort((a, b) => {
        if (this.order === 1) {
          return a[this.sortBy] - b[this.sortBy];
        } else {
          return b[this.sortBy] - a[this.sortBy];
        }
      });
    },
    recentClass: function() {
      return {
        'table__cell': true,
        'table__cell--points': true,
        'table__cell--small': true,
        'sort': true,
        'sort--desc': this.order === -1,
        'sort--asc': this.order === 1,
        'sort--active': this.sortBy === 'recent'
      };
    },
    alltimeClass: function() {
      return {
        'table__cell': true,
        'table__cell--points': true,
        'table__cell--small': true,
        'sort': true,
        'sort--desc': this.order === -1,
        'sort--asc': this.order === 1,
        'sort--active': this.sortBy === 'alltime'
      };
    },
  },
  filters: {
    number: function(num) {
      return new Intl.NumberFormat().format(num);
    },
    ordinal: function(num) {
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const v = num % 100;
      return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }
  },
});
